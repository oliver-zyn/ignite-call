import { ShoppingCartContext } from '../contexts/ShoppingCart'
import { useContext } from 'react'

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
