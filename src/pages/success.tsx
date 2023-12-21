import {
  ImageContainer,
  ImageContent,
  SuccessContainer,
} from '@/styles/pages/success'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

interface SuccessProps {
  customerName: string
  productsImages: string[]
}

export default function Success({
  customerName,
  productsImages,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex"></meta>
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          {productsImages.map((productImageUrl, index) => {
            return (
              <ImageContent key={index}>
                <Image src={productImageUrl} width={120} height={110} alt="" />
              </ImageContent>
            )
          })}
        </ImageContainer>
        <p>
          Uhull <strong>{customerName}</strong>,{' '}
          {productsImages.length > 1
            ? `suas ${productsImages.length} camisetas já estão`
            : 'sua camiseta já está'}{' '}
          a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const productsImages = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product
    return product.images[0]
  })

  console.log(productsImages)

  return {
    props: {
      customerName,
      productsImages,
    },
  }
}
