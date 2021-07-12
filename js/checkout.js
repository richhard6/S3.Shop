// Get the input fields

const button = document.querySelector('.boton')

const singleErrorInputs = document.querySelectorAll('[id^="single"]')

const inputs = document.querySelectorAll('input')

button.addEventListener('click', validate)

const hasNumber = /^[0-9]*$/
const includesNumber = /\d/ /*  cambiar nombres de aqui  */
const isAlphanumeric = /\d[A-Z]|[A-Z]\d/i
const isEmail =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// Exercise 9
function validate(e) {
  e.preventDefault()

  inputs.forEach(handleMultipleInputsError)

  singleErrorInputs.forEach(handleSingleInputError)
}

const handleTextError = (input, message) => {
  const paragraph = document.createElement('small')

  paragraph.classList.add('text-danger')
  paragraph.classList.add('ml-3')

  const textContent = input.previousElementSibling.textContent.replace(':', '')

  const dataSet = message.split(' ')

  const keyWord = dataSet[dataSet.length - 1]

  paragraph.setAttribute('data-errortype', keyWord)

  const text = document.createTextNode(`${textContent} ${message}`)

  paragraph.appendChild(text)

  input.insertAdjacentElement('afterend', paragraph)
}

const handleSingleInputError = (input) => {
  if (input.value.length > 2) {
    const inputType = input.previousElementSibling.textContent
    const errorType = input.nextElementSibling?.dataset.errortype

    const validation = new RegExp(
      (inputType.includes('Password') && isAlphanumeric) ||
        (inputType.includes('Phone') && hasNumber) ||
        (inputType.includes('Email') && isEmail)
    )

    //podria mejorar. y arreglar regexp de email para que si no tiene .com no sirva
    const errorMessage =
      (inputType.includes('Password') && 'field must be alphanumeric') ||
      (inputType.includes('Phone') && 'field can`t contain letters') ||
      (inputType.includes('Email') && 'field must be a valid email')

    const keyWord = errorMessage.split(' ').pop()

    if (!validation.test(input.value)) {
      input.classList.replace('is-valid', 'is-invalid')
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
      input.classList.replace('is-invalid', 'is-valid')
      if (input.nextElementSibling) {
        input.nextElementSibling.remove()
      }
    }
  }
}

const handleMultipleInputsError = (input) => {
  const errorType = input.nextElementSibling?.dataset.errortype
  const inputType = input.previousElementSibling.textContent

  if (input.value === '') {
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')

    if (!errorType) handleTextError(input, 'field is required')

    if (errorType && errorType !== 'required') {
      input.nextElementSibling.remove()
      handleTextError(input, 'field is required')
    }

    input.focus()
  } else if (input.value.length < 3) {
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')

    if (!errorType)
      handleTextError(input, 'field must be longer than 3 characters')

    if (errorType && errorType !== 'characters') {
      input.nextElementSibling.remove()

      handleTextError(input, 'field must be longer than 3 characters')
    }

    input.focus()
  } else if (
    input.value.length > 2 &&
    inputType.includes('Name') &&
    includesNumber.test(input.value)
  ) {
    input.classList.add('is-invalid')
    input.classList.remove('is-valid')
    if (!errorType) handleTextError(input, 'field can`t contain numbers')

    if (errorType && errorType !== 'numbers') {
      input.nextElementSibling.remove()
      handleTextError(input, 'field can`t contain numbers')
    }

    input.focus()
  } else {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')

    if (input.nextElementSibling) {
      console.log(input.nextElementSibling)
      input.nextElementSibling.remove()
    }
  }
}
