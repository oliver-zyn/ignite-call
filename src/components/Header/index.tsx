import { HeaderContainer } from './styles'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from '@/components/ShoppingCart'
import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <ShoppingCart />
    </HeaderContainer>
  )
}
