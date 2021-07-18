const list = document.querySelector('.list')
const addToCartButton = document.querySelectorAll('.card button')
const toast = document.querySelector('#liveToast')
const toastText = toast.querySelector('.toast-body')

const checkout = document.querySelector('.checkout')

let products

const cartIcon = document.querySelector('.nav-link i')

console.log(cartIcon)

function changeIcon() {
  console.log(cartIcon)
  //cartIcon.classList.add('fa-plus')
  cartIcon.classList.add('grow')
  setTimeout(() => {
    cartIcon.classList.remove('grow')
  }, 50)
}

addToCartButton.forEach((product) => {
  product.addEventListener('click', selectItem)

  product.setAttribute('id', 'liveToastBtn')
})

fetch('./js/products.json')
  .then((response) => response.json())
  .then((data) => (products = data))

let cartList = []
let cart = []
const subtotal = {
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

let total = 0

if (cart.length === 0) checkout.style.display = 'none'

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
  total = sum
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
        item.name === 'Cooking oil' || item.name === 'Instant cupcake mixture'
    )
    .map((item) =>
      item.name === 'Cooking oil'
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

  console.log(quantityToCupcakeDiscount, twoThirdsDisc)

  let totalDiscount = (quantityToCupcakeDiscount - twoThirdsDisc).toFixed(2)

  console.log(totalDiscount)

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

    if (occurence.name === 'Cooking oil') {
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

  toastText.innerText = `${itemToAdd.name} has been added to your cart`

  itemToAdd.subtotal = itemToAdd.price

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

  occurence.subtotal = (occurence.quantity * occurence.price).toFixed(2)

  if (occurence.name === 'Cooking oil') {
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
let lastToRemove
function removeFromCart(itemToRemove) {
  itemToRemove = products.find((item) => itemToRemove === item.name)

  const itemFound = cart.find((item) => item.name === itemToRemove.name)

  toastText.innerText = `${itemFound.name} has been removed from your cart`

  if (itemFound) {
    itemFound.quantity--

    if (
      itemFound.name !== 'Cooking oil' &&
      itemFound.name !== 'Instant cupcake mixture'
    ) {
      itemFound.subtotal -= itemFound.price
      itemFound.subtotal = itemFound.subtotal.toFixed(2)
      itemFound.subtotalWithDiscount -= itemFound.price
    }

    if (itemFound.name === 'Cooking oil') {
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

      itemFound.subtotal = itemFound.quantity * itemFound.price
      itemFound.subtotalWithDiscount = itemFound.subtotal - prevCupcakeDiscount

      if (discount !== undefined && itemFound.discount !== 0) {
        itemFound.discount = discount
      } else {
        itemFound.discount = 0
        itemFound.subtotalWithDiscount = itemFound.quantity * itemFound.price
      }
    }

    if (itemFound.quantity === 0) {
      const cartWithoutItem = cart.filter(
        (item) => item.name !== itemFound.name
      )
      lastToRemove = itemFound.name
      cart = cartWithoutItem
    }
    if (cart.length === 0) checkout.style.display = 'none'
  } else {
    console.warn(`${itemToRemove.name} is not in your cart`)
  }
}

const addSubtotalsWithDiscount = () => {
  const reducer = (sum, currentVal) => sum + currentVal

  const totalDOM = document.querySelector('.total')

  if (cart.length === 0) {
    totalDOM.innerText = 'Select something'
  } else {
    const total = cart.map((item) => item.subtotalWithDiscount).reduce(reducer)
    totalDOM.innerText = total.toFixed(2) + '$'
  }
}

function selectItem(e) {
  if (checkout.style.display === 'none') checkout.style.display = ''

  const button = e.target

  button.classList.add('click')

  setTimeout(() => {
    button.classList.remove('click')
  }, 300)

  const itemToAdd = e.target.parentElement.firstChild.nextSibling.textContent

  addToCart(itemToAdd)
  changeIcon()

  const itemToPrint = cart.find((item) => item.name === itemToAdd)

  printCart(itemToPrint)
}

let timer

function printCart(item) {
  const itemToRemove = document.querySelector(
    `li[data-itemtype="${lastToRemove}"]`
  )
  if (!item) return itemToRemove.remove()
  const textToRemove = document.querySelector('.bill')
  const buttonMinus = document.createElement('button')
  const buttonPlus = document.createElement('button')

  if (textToRemove) textToRemove.remove()

  const listItem = document.createElement('li')
  let classesToAdd = [
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center',
    'text-white',
  ]

  listItem.classList.add(...classesToAdd)

  for (let i = 0; i < 5; i++) {
    let quantityClasses = ['badge', 'pill', 'rounded-pill', 'fs-5']

    let notNameDivClasses = [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'col-2',
      'h-100',
      'text-white',
    ]

    const div = document.createElement('div')

    const textElement =
      (i === 4 && document.createTextNode(item.quantity)) ||
      (i === 3 && document.createTextNode(item.subtotal + '$')) ||
      (i === 2 && document.createTextNode(item.discount)) ||
      (i === 1 && document.createTextNode(item.name))

    if (i === 4) {
      div.classList.add(...quantityClasses)

      buttonMinus.classList.add('minus-button')
      const buttonText = document.createTextNode('-')
      buttonMinus.appendChild(buttonText)
      buttonMinus.classList.add('me-1')
      div.appendChild(buttonMinus)
    }

    if (i === 1) {
      div.classList.add('col-5')
    } else {
      div.classList.add(...notNameDivClasses)
    }

    if (textElement) {
      div.appendChild(textElement)

      if (i === 4) {
        buttonPlus.classList.add('plus-button')
        const buttonText = document.createTextNode('+')
        buttonPlus.appendChild(buttonText)
        buttonPlus.classList.add('ms-1')
        div.appendChild(buttonPlus)
      }

      listItem.appendChild(div)
    }
  }

  listItem.setAttribute('data-itemtype', item.name)

  buttonMinus.addEventListener('click', () => {
    removeFromCart(item.name)
    const itemToPrint = cart.find((object) => object.name === item.name)
    printCart(itemToPrint)
    addSubtotalsWithDiscount()
  })
  buttonPlus.addEventListener('click', () => {
    addToCart(item.name)
    const itemToPrint = cart.find((object) => object.name === item.name)
    printCart(itemToPrint)
    addSubtotalsWithDiscount()
  })

  toast.classList.replace('hidden', 'toasty')
  timer = setTimeout(() => {
    window.clearTimeout(timer)
    toast.classList.replace('toasty', 'hidden')
  }, 1000)

  list.appendChild(listItem)

  const foundItem = list.querySelector(`li[data-itemtype="${item.name}"]`)

  addSubtotalsWithDiscount()

  if (foundItem) list.replaceChild(listItem, foundItem)
}
