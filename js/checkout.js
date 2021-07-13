const button = document.querySelector('.boton')
const inputs = document.querySelectorAll('input')
button.addEventListener('click', validate)

function validate(e) {
  e.preventDefault()
  inputs.forEach(handleInputsErrors)
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

const handleInputsErrors = (input) => {
  const inputType = input.previousElementSibling.textContent

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
}
