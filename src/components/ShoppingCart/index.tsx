import * as Dialog from '@radix-ui/react-dialog'

import { Handbag, X } from 'phosphor-react'
import {
  ShoppingCartButton,
  ShoppingCartDescription,
  ShoppingCartModalClose,
  ShoppingCartModalContent,
  ShoppingCartModalOverlay,
  ShoppingCartTitle,
} from './styles'

import { CheckoutCart } from './CheckoutCart'
import { ListItemsCart } from './ListItemsCart'
import { useShoppingCart } from '@/hooks/useShoppingCart'

export function ShoppingCart() {
  const { shoppingCart } = useShoppingCart()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ShoppingCartButton>
          <Handbag size={24} weight="bold" />

          {shoppingCart.length ? <span>{shoppingCart.length}</span> : ''}
        </ShoppingCartButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <ShoppingCartModalOverlay />
        <ShoppingCartModalContent>
          <ShoppingCartTitle>Sacola de Compras</ShoppingCartTitle>
          <ShoppingCartDescription>
            {shoppingCart.length ? (
              <ListItemsCart />
            ) : (
              <p>Nenhum item adicionado à sacola...</p>
            )}
            <CheckoutCart />
          </ShoppingCartDescription>
          <ShoppingCartModalClose asChild>
            <X size={24} weight="bold" />
          </ShoppingCartModalClose>
        </ShoppingCartModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
