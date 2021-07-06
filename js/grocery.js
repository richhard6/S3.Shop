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
  /*   const totalCost = cartList
    .map((item) => item.price)
    .reduce((sum, val) => sum + val, 0)

    console.log(totalCost)
    */
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

  let quantityToCupcakeDiscount = itemsQuantity.cupcakeMix * products[2].price

  if (itemsQuantity.cupcakeMix > 10) {
    const twoThirdsDisc = quantityToCupcakeDiscount * 0.66

    console.log(twoThirdsDisc, 'quantity')
    console.log(subtotal.grocery.value, 'value') // no entra cuando llamamos directmente a applyPromotions(), hay que llamar primero a calculateTotal y despues a applyPromotions().
    const totalDiscount = quantityToCupcakeDiscount - twoThirdsDisc
    if (prevCupcakeDiscount !== totalDiscount) {
      subtotal.grocery.discount += totalDiscount
      prevCupcakeDiscount = totalDiscount
    }
    console.log(twoThirdsDisc)
  }
  //cuando usamos mezclamos 11 cupcake y 4 oils se lia completamente. hay que hacer la validacion de oil (prev )

  const countFourOilOcurrences = itemsQuantity.cookingOil / 4
  let quantityToOilDiscount = prevFourOilOcurrences * 10

  if (countFourOilOcurrences !== prevFourOilOcurrences) {
    quantityToOilDiscount = countFourOilOcurrences * 10
    prevFourOilOcurrences = countFourOilOcurrences
    subtotal.grocery.discount += quantityToOilDiscount
    console.log(quantityToOilDiscount)
  }

  calculateTotal()
}

// Exercise 6
function generateCart() {
  // Using the "cartlist" array that contains all the items in the shopping cart,
  // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
}

// Exercise 7
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
}

// Exercise 8
function addToCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
}

// Exercise 9
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
}

// Exercise 10
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
}
