/**
 * @jest-environment jsdom
 */

const { addToCartList, cleanCart, calculateSubtotals } = require('./grocery')

describe('Function addToCartList()', () => {
  it('should be declared', async () => {
    expect(typeof addToCartList).toBe('function')
  })

  it('should return an array', () => {
    expect(addToCartList('Pasta') instanceof Array).toBe(true)
  })

  it('should has this properties', () => {
    expect(addToCartList('Pasta')[0]).toEqual({
      name: 'Pasta',
      price: 6.25,
      type: 'grocery',
    })
  })

  it('s length has to be three', () => {
    expect(addToCartList('Pasta')).toHaveLength(3)
  })

  it('should return the three object array  if item is not found', () => {
    expect(addToCartList('asdasda')).toHaveLength(3)
  })
})

describe('Function cleanCart()', () => {
  it('should be declared', async () => {
    expect(typeof cleanCart).toBe('function')
  })

  it('should return an array', () => {
    expect(addToCartList('Pasta') instanceof Array).toBe(true)
  })
  it('should  clean the cart ', () => {
    addToCartList('Pasta')

    expect(cleanCart()).toHaveLength(0)
  })
})

describe('Function calculateSubTotals()', () => {
  it('should be declared', async () => {
    expect(typeof calculateSubtotals).toBe('function')
  })

  it('should return an object', () => {
    expect(calculateSubtotals() instanceof Object).toBe(true)
  })

  it('should calculate subtotals', () => {
    const itemsToAdd = ['Pasta', 'All-in-1', 'Toddler Frock']
    addToCartList(itemsToAdd[0])
    addToCartList(itemsToAdd[1])
    addToCartList(itemsToAdd[2])

    expect(calculateSubtotals()).toHaveLength(3)
  })
})
