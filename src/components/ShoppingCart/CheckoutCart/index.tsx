import {
  CheckoutCartContainer,
  CheckoutCartQuantity,
  CheckoutCartValue,
} from './styles'

import axios from 'axios'
import { formatNumberToReal } from '@/utils/formatNumberToReal'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { useState } from 'react'

export function CheckoutCart() {
  const { shoppingCart, retTotalPriceCart } = useShoppingCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProductsCart() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkoutList', {
        products: shoppingCart,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CheckoutCartContainer>
      <CheckoutCartQuantity>
        <p>Quantidade</p>
        <span>{shoppingCart.length} itens</span>
      </CheckoutCartQuantity>

      <CheckoutCartValue>
        <p>Valor total</p>
        <span>{formatNumberToReal(retTotalPriceCart())}</span>
      </CheckoutCartValue>

      <button
        disabled={!shoppingCart.length || isCreatingCheckoutSession}
        onClick={handleBuyProductsCart}
      >
        Finalizar compra
      </button>
    </CheckoutCartContainer>
  )
}
