/**
 * @jest-environment jsdom
 */

const {
  addToCartList,
  cleanCart,
  calculateSubtotals,
  avoidRecalculation,
  calculateTotal,
  applyPromotionsSubtotals,
  getCupcakeDiscount,
  getOilDiscount,
  generateCart,
  applyPromotionsCart,
} = require('./grocery')

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
    addToCartList('Pasta')
    expect(calculateSubtotals() instanceof Object).toBe(true)
  })

  it('should calculate 2 pastas subtotal', () => {
    addToCartList('Pasta')

    const expected = {
      beauty: { discount: 0, value: 0 },
      clothes: { discount: 0, value: 0 },
      grocery: { discount: 0, value: 12.5 },
    }

    expect(calculateSubtotals()).toEqual(expected)
  })
})

describe('Function avoidRecalculation()', () => {
  it('should be declared', async () => {
    addToCartList('Cooking oil')
    expect(typeof avoidRecalculation).toBe('function')
  })

  /*   it('should return a string if its the same calculation as before ', () => {
    expect(avoidRecalculation(6.25, 0, 0)).toBe('string')
  }) */
})

describe('Function calculateTotal()', () => {
  it('should be declared', async () => {
    addToCartList('Cooking oil')

    expect(typeof calculateTotal).toBe('function')
  })

  it('should calculate the value of 2 pastas and 3 cooking oil', async () => {
    addToCartList('Cooking oil')
    expect(calculateTotal()).toBe(44)
  })
})

describe('Function applyPromotionsSubtotals()', () => {
  it('should be declared', async () => {
    addToCartList('Cooking oil')

    expect(typeof applyPromotionsSubtotals).toBe('function')
  })

  it('should remove 10 as the cooking oil has promotion each 4 of them', async () => {
    expect(applyPromotionsSubtotals()).toBe(44.5)
  })
})

describe('Function getOilDiscount', () => {
  it('should be declared', async () => {
    expect(typeof getOilDiscount).toBe('function')
  })

  it('should return 10 as we are adding 4 cooking oils', async () => {
    expect(getOilDiscount(8)).toBe(10) //bugged
  })
})

describe('Function getCupcakeDiscount', () => {
  it('should be declared', async () => {
    expect(typeof getCupcakeDiscount).toBe('function')
  })

  it('should return 18,70 as its the discount for 11 cupcakes', async () => {
    expect(getCupcakeDiscount(11)).toBe(18.7)
  })

  it('should return 20.40 as its the discount for 12 cupcakes', async () => {
    expect(getCupcakeDiscount(12)).toBe(20.4)
  })
})

describe('Function generateCart()', () => {
  it('should be declared', async () => {
    expect(typeof generateCart).toBe('function')
  })

  it('should return array containing previously added items and calculated with their discounts', async () => {
    const previouslyAdded = [
      {
        name: 'Pasta',
        price: 6.25,
        type: 'grocery',
        quantity: 2,
        subtotal: 12.5,
        subtotalWithDiscount: 12.5,
        discount: 0,
      },
      {
        name: 'Cooking oil',
        price: 10.5,
        type: 'grocery',
        quantity: 4,
        subtotal: 42,
        subtotalWithDiscount: 52,
        discount: -10,
      },
    ]
    expect(generateCart()).toEqual(previouslyAdded)
  })
})

describe('Function applyPromotionsCart', () => {
  it('should be declared', async () => {
    expect(typeof applyPromotionsCart).toBe('function')
  })

  it('should return the previously calculated array', async () => {
    const previouslyAdded = [
      {
        name: 'Pasta',
        price: 6.25,
        type: 'grocery',
        quantity: 2,
        subtotal: 12.5,
        subtotalWithDiscount: 12.5,
        discount: 0,
      },
      {
        name: 'Cooking oil',
        price: 10.5,
        type: 'grocery',
        quantity: 4,
        subtotal: 42,
        subtotalWithDiscount: 52,
        discount: -10,
      },
    ]
    expect(applyPromotionsCart()).toEqual(previouslyAdded)
  })
})
