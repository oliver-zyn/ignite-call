import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,98</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ratione, minus, nobis voluptas esse ex praesentium suscipit veniam sit veritatis voluptates quo sequi, in tempore laudantium non provident impedit assumenda.</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}