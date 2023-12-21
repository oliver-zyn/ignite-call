import 'keen-slider/keen-slider.min.css'

import { HomeContainer, Product } from '@/styles/pages/home'

import { GetStaticProps } from 'next'
import { Handbag } from 'phosphor-react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { ProductType } from '@/contexts/ShoppingCart'
import Stripe from 'stripe'
import { formatNumberToReal } from '@/utils/formatNumberToReal'
import { stripe } from '@/lib/stripe'
import { toast } from 'react-toastify'
import { useKeenSlider } from 'keen-slider/react'
import { useShoppingCart } from '@/hooks/useShoppingCart'

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const { addProductToCart, productNotExistsInCart } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddProductToCart(
    event: MouseEvent<HTMLButtonElement>,
    product: ProductType,
  ) {
    event.preventDefault()

    if (!addProductToCart(product)) return

    toast.success('Adicionado à sacola!', {
      position: 'top-right',
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'dark',
    })
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{formatNumberToReal(product.price)}</span>
                  </div>

                  <button
                    onClick={(event) => handleAddProductToCart(event, product)}
                    disabled={productNotExistsInCart(product.id)}
                  >
                    <Handbag size={32} weight="bold" />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? price.unit_amount / 100 : 0,
      description: product.description,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
