import * as Dialog from '@radix-ui/react-dialog'

import { keyframes, styled } from '../../styles'

const fadeInAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const fadeOutAnimation = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

export const ShoppingCartButton = styled('button', {
  backgroundColor: '$gray800',
  color: '$gray300',
  border: 0,
  borderRadius: 6,
  padding: '0.75rem',
  cursor: 'pointer',
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&:hover': {
    filter: 'brightness(1.2)',
  },

  span: {
    position: 'absolute',
    width: '1.5rem',
    height: '1.5rem',
    top: '-0.35rem',
    right: '-0.35rem',
    backgroundColor: '$green500',
    border: '2px solid $gray900',
    borderRadius: 9999,
    fontSize: '$sm',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const ShoppingCartModalOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0 0 0 / 0.7)',
  backdropFilter: 'blur(4px)',

  "&[data-state='open']": {
    animation: `${fadeInAnimation} 0.1s ease-in`,
  },

  "&[data-state='closed']": {
    animation: `${fadeOutAnimation} 0.1s ease-out`,
  },
})

export const ShoppingCartModalContent = styled(Dialog.Content, {
  backgroundColor: '$gray800',
  width: '100%',
  maxWidth: '30rem',
  height: '100%',
  maxHeight: '100vh',
  position: 'absolute',
  padding: '3rem',
  zIndex: 9999,
  boxShadow: '-4px 0px 30px rgb(0 0 0 / 80%)',
  top: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',
})

export const ShoppingCartModalClose = styled(Dialog.Close, {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  cursor: 'pointer',
  color: '$gray300',

  '&:hover': {
    color: '$gray100',
  },
})

export const ShoppingCartTitle = styled(Dialog.Title, {
  marginTop: '1.5rem',
  lineHeight: 1.6,
})

export const ShoppingCartDescription = styled(Dialog.Description, {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '>p': {
    textAlign: 'center',
    marginTop: '30vh',
    opacity: '0.6',
  },
})
