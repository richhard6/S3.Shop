// Exercise 11
// Move this variable to a json file and load the data in this js
var products = [
  {
    name: 'cooking oil',
    price: 10.5,
    type: 'grocery',
  },
  {
    name: 'Pasta',
    price: 6.25,
    type: 'grocery',
  },
  {
    name: 'Instant cupcake mixture',
    price: 5,
    type: 'grocery',
  },
  {
    name: 'All-in-one',
    price: 260,
    type: 'beauty',
  },
  {
    name: 'Zero Make-up Kit',
    price: 20.5,
    type: 'beauty',
  },
  {
    name: 'Lip Tints',
    price: 12.75,
    type: 'beauty',
  },
  {
    name: 'Lawn Dress',
    price: 15,
    type: 'clothes',
  },
  {
    name: 'Lawn-Chiffon Combo',
    price: 19.99,
    type: 'clothes',
  },
  {
    name: 'Toddler Frock',
    price: 9.99,
    type: 'clothes',
  },
]
var cartList = []
var cart = []
var subtotal = {
  grocery: {
    value: 0,
    discount: 0,
  },
  beauty: {
    value: 0,
    discount: 0,
  },
  clothes: {
    value: 0,
    discount: 0,
  },
}
var total = 0

// Exercise 1
function addToCartList(item) {
  const desiredProduct = products.find((product) => product.name === item)

  if (desiredProduct === undefined) {
    console.warn('This item does not exists')
  } else {
    cartList.push(desiredProduct)
  }
  console.log(cartList)
}

// Exercise 2
function cleanCart() {
  cartList.length = 0
}

// Exercise 3

const previousAdd = {
  grocery: 0,
  beauty: 0,
  clothes: 0,
}
function calculateSubtotals() {
  const currentAdd = {
    grocery: 0,
    beauty: 0,
    clothes: 0,
  }
  for (let i = 0; i < cartList.length; i++) {
    switch (cartList[i].type) {
      case 'grocery':
        currentAdd.grocery += cartList[i].price
        break

      case 'beauty':
        currentAdd.beauty += cartList[i].price
        break
      case 'clothes':
        currentAdd.clothes += cartList[i].price
        break
    }
  }
  avoidRecalculation(currentAdd.grocery, currentAdd.beauty, currentAdd.clothes)
  console.log(subtotal)
}
const avoidRecalculation = (grocery, beauty, clothes) => {
  if (previousAdd.grocery !== grocery) {
    subtotal.grocery.value += grocery - previousAdd.grocery
    previousAdd.grocery = grocery
  } else if (previousAdd.beauty !== beauty) {
    subtotal.beauty.value += beauty - previousAdd.beauty
    previousAdd.beauty = beauty
  } else if (previousAdd.clothes !== clothes) {
    subtotal.clothes.value += clothes - previousAdd.clothes
    previousAdd.clothes = clothes
  } else {
    return
  }
}

// Exercise 4
function calculateTotal() {
  calculateSubtotals()

  let sum = 0
  for (const kind in subtotal) {
    sum += subtotal[kind].value - subtotal[kind].discount
  }
  console.log(sum)
}

// Exercise 5

let prevFourOilOcurrences = 0
let prevCupcakeDiscount = 0
function applyPromotionsSubtotals() {
  const itemsQuantity = {
    cookingOil: 0,
    cupcakeMix: 0,
  }

  cartList
    .filter(
      (item) =>
        item.name === 'cooking oil' || item.name === 'Instant cupcake mixture'
    )
    .map((item) =>
      item.name === 'cooking oil'
        ? itemsQuantity.cookingOil++
        : itemsQuantity.cupcakeMix++
    )

  console.log(itemsQuantity)

  getCupcakeDiscount(itemsQuantity.cupcakeMix)
  getOilDiscount(itemsQuantity.cookingOil)

  calculateTotal()
}

const getCupcakeDiscount = (cupcakeMix) => {
  let quantityToCupcakeDiscount = cupcakeMix * products[2].price

  const twoThirdsDisc = quantityToCupcakeDiscount * 0.66

  const totalDiscount = quantityToCupcakeDiscount - twoThirdsDisc

  if (cupcakeMix > 10 && prevCupcakeDiscount !== totalDiscount) {
    subtotal.grocery.discount += totalDiscount - prevCupcakeDiscount
    prevCupcakeDiscount = totalDiscount
    return totalDiscount
  }
}

const getOilDiscount = (cookingOil) => {
  const countFourOilOcurrences = cookingOil / 4
  let quantityToOilDiscount = prevFourOilOcurrences * 10

  if (
    countFourOilOcurrences !== prevFourOilOcurrences &&
    cookingOil % 4 === 0
  ) {
    quantityToOilDiscount = countFourOilOcurrences * 10 - quantityToOilDiscount
    prevFourOilOcurrences = countFourOilOcurrences

    subtotal.grocery.discount += quantityToOilDiscount

    console.log(quantityToOilDiscount)
    return quantityToOilDiscount
  }
}

// Exercise 6
function generateCart() {
  const reducer = (obj, val) => {
    if (obj[val] == null) {
      obj[val] = 1
    } else {
      ++obj[val]
    }
    return obj
  }

  const quantities = cartList.map((item) => item.name).reduce(reducer, {})
  const quantitiesKeys = Object.keys(quantities)

  quantitiesKeys.map((key) => {
    const occurence = cartList.find((item) => item.name === key)
    const itemFound = cart.some((item) => item.name === occurence.name)

    if (!itemFound) {
      cart.push(occurence)
    }

    occurence.quantity = quantities[key]
    occurence.subtotal = quantities[key] * occurence.price

    if (!occurence.subtotalWithDiscount) {
      occurence.subtotalWithDiscount = 0
    }

    if (!occurence.discount) {
      occurence.discount = 0
    }

    if (occurence.name === 'cooking oil') {
      let discount = getOilDiscount(occurence.quantity)
      if (discount !== undefined) {
        occurence.discount += discount
      }
    } else if (occurence.name === 'Instant cupcake mixture') {
      let discount = getCupcakeDiscount(occurence.quantity)
      if (discount !== undefined) {
        let finalDiscount = discount - occurence.discount

        console.log(finalDiscount)
        occurence.discount += finalDiscount
      }
    }
  })
  applyPromotionsCart()
  console.log(cart)
}

// Exercise 7
function applyPromotionsCart() {
  const finalSubtotal = (obj) => {
    obj.subtotalWithDiscount = obj.subtotal - obj.discount
  }

  cart.forEach((item) => finalSubtotal(item))
}

// Exercise 8
function addToCart(itemToAdd) {
  itemToAdd = products.find((item) => itemToAdd === item.name)

  const itemFound = cart.some((item) => item.name === itemToAdd.name)

  if (!itemFound) {
    const newProperties = {
      quantity: 1,

      discount: 0,
    }

    itemToAdd = { ...itemToAdd, ...newProperties }
    itemToAdd.subtotalWithDiscount = itemToAdd.price
    cart.push(itemToAdd)
  } else {
    addSinglePromotion(itemToAdd)
    applyPromotionsCart()
  }

  console.log(cart)
}

const addSinglePromotion = (itemToAdd) => {
  const occurence = cart.find((item) => item.name === itemToAdd.name)

  occurence.quantity++

  occurence.subtotal = occurence.quantity * occurence.price

  if (occurence.name === 'cooking oil') {
    let discount = getOilDiscount(occurence.quantity)
    console.log(discount)
    if (discount !== undefined) {
      occurence.discount += discount
    }
  } else if (occurence.name === 'Instant cupcake mixture') {
    let discount = getCupcakeDiscount(occurence.quantity)
    if (discount !== undefined) {
      let finalDiscount = discount - occurence.discount

      occurence.discount += finalDiscount
    }
  }
}

// Exercise 9
function removeFromCart(itemToRemove) {
  itemToRemove = products.find((item) => itemToRemove === item.name)

  const itemFound = cart.find((item) => item.name === itemToRemove.name)

  if (itemFound) {
    itemFound.quantity--

    if (
      itemFound.name !== 'cooking oil' &&
      itemFound.name !== 'Instant cupcake mixture'
    ) {
      itemFound.subtotal -= itemFound.price
      itemFound.subtotalWithDiscount -= itemFound.price
    }

    if (itemFound.name === 'cooking oil') {
      let discount = getOilDiscount(itemFound.quantity)

      prevFourOilOcurrences = 0

      let shouldDecrement = itemFound.quantity + 1

      itemFound.subtotal -= itemFound.price

      if (
        discount === undefined &&
        itemFound.discount !== 0 &&
        shouldDecrement % 4 === 0
      ) {
        itemFound.discount -= 10
        itemFound.subtotalWithDiscount = itemFound.subtotal - itemFound.discount
      } else {
        itemFound.subtotalWithDiscount = itemFound.subtotal - itemFound.discount
      }
    }

    if (itemFound.name === 'Instant cupcake mixture') {
      prevCupcakeDiscount = 0
      let discount = getCupcakeDiscount(itemFound.quantity)

      if (discount !== undefined && itemFound.discount !== 0) {
        itemFound.discount = discount
      } else {
        itemFound.discount = 0

        const quantityToCupcakeDiscount = 11 * products[2].price

        const twoThirdsDisc = quantityToCupcakeDiscount * 0.66

        let totalDiscount = quantityToCupcakeDiscount - twoThirdsDisc

        console.log(itemFound.quantity)

        totalDiscount = itemFound.quantity < 10 ? 0 : totalDiscount

        itemFound.subtotalWithDiscount += totalDiscount
      }
    }

    if (itemFound.quantity === 0) {
      const cartWithoutItem = cart.filter(
        (item) => item.name !== itemFound.name
      )

      cart = cartWithoutItem
    }
  } else {
    console.warn(`${itemToRemove.name} is not in your cart`)
  }
}

// Exercise 10
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
}
