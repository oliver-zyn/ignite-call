import { GetStaticPaths, GetStaticProps } from 'next'
import {
  ImageContainer,
  ProductAddCartButton,
  ProductBuyButton,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'

import Head from 'next/head'
import Image from 'next/image'
import { ProductType } from '@/contexts/ShoppingCart'
import Stripe from 'stripe'
import axios from 'axios'
import { formatNumberToReal } from '@/utils/formatNumberToReal'
import { stripe } from '@/lib/stripe'
import { toast } from 'react-toastify'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { useState } from 'react'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addProductToCart, productNotExistsInCart } = useShoppingCart()

  function handleAddProductToCart(product: ProductType) {
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

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatNumberToReal(product.price)}</span>
          <p>{product.description}</p>
          <ProductBuyButton
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </ProductBuyButton>
          {productNotExistsInCart(product.id) ? (
            <ProductAddCartButton disabled={true}>
              Produto já adicionado à sacola
            </ProductAddCartButton>
          ) : (
            <ProductAddCartButton
              onClick={() => handleAddProductToCart(product)}
            >
              Adicionar à sacola
            </ProductAddCartButton>
          )}
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_PBkQG5LlSJJTVs' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount ? price.unit_amount / 100 : 0,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
