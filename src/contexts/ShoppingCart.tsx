import { ReactNode, createContext, useState } from 'react'

export interface ProductType {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string
  defaultPriceId: string
}

interface ShoppingCartContextProviderProps {
  children: ReactNode
}

interface ShoppingCartContextType {
  shoppingCart: ProductType[]
  addProductToCart: (product: ProductType) => boolean
  removeProductFromCart: (id: string) => void
  retTotalPriceCart: () => number
  productNotExistsInCart: (id: string) => boolean
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ProductType[]>([])

  function addProductToCart(product: ProductType) {
    const productExists = shoppingCart.find(
      (productCart) => productCart.id === product.id,
    )

    if (!productExists) {
      setShoppingCart((state) => [...state, product])
      return true
    }

    return false
  }

  function removeProductFromCart(id: string) {
    const newShoppingCart = shoppingCart.filter(
      (productCart) => productCart.id !== id,
    )
    setShoppingCart(newShoppingCart)
  }

  function retTotalPriceCart() {
    let totalPrice = 0

    shoppingCart.forEach((productCart) => {
      totalPrice += productCart.price
    })

    return totalPrice
  }

  function productNotExistsInCart(id: string) {
    return shoppingCart.some((product) => product.id === id)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        addProductToCart,
        removeProductFromCart,
        retTotalPriceCart,
        productNotExistsInCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
