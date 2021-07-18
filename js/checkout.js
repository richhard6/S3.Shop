const button = document.querySelector('.boton')
const inputs = document.querySelectorAll('input')

button.addEventListener('click', validate)

function validate(e) {
  e.preventDefault()
  inputs.forEach(handleInputsErrors)
  handleSend()
}

const handleTextError = (input, message) => {
  const paragraph = document.createElement('small')

  const classesToAdd = ['text-danger', 'ml-3']
  paragraph.classList.add(...classesToAdd)

  const textContent = input.previousElementSibling.textContent.replace(':', '')
  const dataSet = message.split(' ')
  const keyWord = dataSet[dataSet.length - 1]
  paragraph.setAttribute('data-errortype', keyWord)
  const text = document.createTextNode(`${textContent} ${message}`)
  paragraph.appendChild(text)
  input.insertAdjacentElement('afterend', paragraph)
}

const handleInputsErrors = (input) => {
  const inputType = input.previousElementSibling.textContent
  input.value = input.value.trim()

  const allNumber = /^[0-9]*$/
  const allLetters = /\b[^\d\W]+\b/
  const isAlphanumeric = /\d[A-Z]|[A-Z]\d/i
  const isEmail =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*.*\.{1}[a-z]+$/

  const validationAndMessage =
    ((input.value === '') === true && [true, 'field is required']) ||
    (input.value.length < 3 === true && [
      true,
      'field must be longer than 3 characters',
    ]) ||
    (inputType.includes('Password') && [
      isAlphanumeric,
      'field must be alphanumeric',
    ]) ||
    (inputType.includes('Phone') && [
      allNumber,
      'field can`t contain letters',
    ]) ||
    (inputType.includes('Email') && [isEmail, 'field must be a valid email']) ||
    (inputType.includes('Name') && [
      allLetters,
      'field can`t contain numbers',
    ]) ||
    (inputType.includes('Address') && [false])

  if (validationAndMessage) {
    const [validation, errorMessage] = validationAndMessage
    handleStyles(input, errorMessage, validation)
  }
}

const handleStyles = (input, errorMessage, validation) => {
  const errorType = input.nextElementSibling?.dataset.errortype
  keyWord = errorMessage?.split(' ').pop()
  new RegExp(validation)

  const finalValidation =
    (validation instanceof RegExp && !validation.test(input.value)) ||
    (validation === true && true)

  if (finalValidation) {
    input.classList.remove('is-invalid')
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')
    input.focus()
    if (!errorType) {
      handleTextError(input, errorMessage)
      input.focus()
    }

    if (errorType && errorType !== keyWord) {
      input.nextElementSibling.remove()
      handleTextError(input, errorMessage)
      input.focus()
    }
  } else {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')

    if (input.nextElementSibling) {
      input.nextElementSibling.remove()
    }
  }
  if (input.classList.contains('is-invalid')) {
    console.log('adasd')
    input.classList.remove('is-invalid')
    setTimeout(() => {
      input.classList.add('is-invalid')
    }, 10)
  }
}

const handleSend = () => {
  const validatedInputs = Array.from(inputs)
  const allValid = validatedInputs.every(
    (input) => input.classList[input.classList.length - 1] === 'is-valid'
  )
  if (allValid) {
    const classesToAdd = ['finalMessage']

    const iconClasses = ['fas', 'fa-check', 'iconCheck']
    document.querySelector('.form').remove()
    const main = document.querySelector('.checkout-main-picture')
    const div = document.createElement('div')

    div.classList.add('sentData')

    const finished = document.createElement('div')
    finished.classList.add('finished')

    const finalMessage = document.createElement('div')
    const icon = document.createElement('i')

    icon.classList.add(...iconClasses)

    finalMessage.textContent =
      'Thanks for your purchase, expect your order in 1 day'

    finalMessage.appendChild(icon)

    finalMessage.classList.add(...classesToAdd)

    main.insertAdjacentElement('afterend', div)

    div.appendChild(finished)

    setTimeout(() => {
      div.replaceChild(finalMessage, finished)
    }, 1000)
  }
}

const testInputs = () => {
  inputs[0].value = 'Richard'
  inputs[1].value = 'richard@gmail.com'
  inputs[2].value = 'asdasda'
  inputs[3].value = 'Perdomo'
  inputs[4].value = '11231a'
  inputs[5].value = '111111'
}
