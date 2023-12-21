import { CartImageContainer, CartProduct, ListItemsContainer } from './styles'

import Image from 'next/image'
import { formatNumberToReal } from '@/utils/formatNumberToReal'
import { useShoppingCart } from '@/hooks/useShoppingCart'

export function ListItemsCart() {
  const { shoppingCart, removeProductFromCart } = useShoppingCart()

  function handleRemoveProductFromCart(id: string) {
    removeProductFromCart(id)
  }

  return (
    <ListItemsContainer>
      {shoppingCart.map((product) => {
        return (
          <CartProduct key={product.id}>
            <CartImageContainer>
              <Image src={product.imageUrl} width={101} height={93} alt="" />
            </CartImageContainer>

            <div>
              <h2>{product.name}</h2>
              <span>{formatNumberToReal(product.price)}</span>
              <button onClick={() => handleRemoveProductFromCart(product.id)}>
                Remover
              </button>
            </div>
          </CartProduct>
        )
      })}
    </ListItemsContainer>
  )
}
