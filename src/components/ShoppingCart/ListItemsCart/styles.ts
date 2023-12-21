import { styled } from '@stitches/react'

export const ListItemsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '2rem',
  height: '100%',
  maxHeight: '32rem',
})

export const CartProduct = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',

  h2: {
    fontWeight: 'normal',
    lineHeight: 1.6,
    fontSize: '$md',
    color: '$gray300',
  },

  span: {
    display: 'block',
    lineHeight: 1.6,
    fontSize: '$md',
    fontWeight: 'bold',
    margin: '0.125rem 0 0.5rem',
  },

  button: {
    fontSize: '1rem',
    lineHeight: 1.6,
    backgroundColor: 'transparent',
    border: 0,
    color: '$green500',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
})

export const CartImageContainer = styled('div', {
  width: '100%',
  maxWidth: 101,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})
