import { styled } from '@stitches/react'

export const CheckoutCartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: 1.6,
  },

  button: {
    backgroundColor: '$green500',
    border: 0,
    lineHeight: 1.6,
    borderRadius: 8,
    padding: '1.25rem',
    color: '$white',
    fontSize: '$md',
    marginTop: '3.5rem',
    cursor: 'pointer',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
})

export const CheckoutCartQuantity = styled('div', {
  color: '$gray300',

  span: {
    fontSize: '$md',
  },
})

export const CheckoutCartValue = styled('div', {
  color: '$gray100',

  p: {
    fontSize: '$md',
    fontWeight: 'bold',
  },

  span: {
    fontSize: '$xl',
    fontWeight: 'bold',
  },
})
