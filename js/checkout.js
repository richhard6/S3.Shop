// Get the input fields
const name = document.querySelector('.name')
const lastName = document.querySelector('.lastName')
const password = document.querySelector('.password')
const email = document.querySelector('email')
const phone = document.querySelector('.phone')
const address = document.querySelector('.address')
const button = document.querySelector('.boton')

const inputs = document.querySelectorAll('input')

button.addEventListener('click', validate)

// Get the error elements

// Exercise 9
function validate(e) {
  e.preventDefault()
  const hasNumber = /\d/
  const isAlphanumeric = /\d[A-Z]|[A-Z]\d/i

  inputs.forEach((input) => {
    const errorType = input.nextElementSibling?.dataset.errortype
    const inputType = input.previousElementSibling.textContent

    if (input.value === '') {
      // hay qeu refactorizar todo esto. repeticionn de add, remove handle text error.
      //abstract
      input.classList.add('is-invalid')
      input.classList.remove('is-valid')

      if (!errorType) handleTextError(input, 'field is required')

      if (errorType && errorType !== 'required') {
        //ojo con esto.
        input.nextElementSibling.remove()
        handleTextError(input, 'field is required')
      }

      input.focus()
    } else if (input.value.length < 3) {
      input.classList.add('is-invalid')
      input.classList.remove('is-valid')

      if (!errorType)
        handleTextError(input, 'field must be longer than 3 characters') //aqui hay un error

      if (errorType && errorType !== 'characters') {
        input.nextElementSibling.remove()

        handleTextError(input, 'field must be longer than 3 characters')
      }

      input.focus()
    } else {
      input.classList.remove('is-invalid') //replace maybe
      input.classList.add('is-valid')
    }

    if (inputType.indexOf('Name') > 0 && hasNumber.test(input.value)) {
      input.classList.add('is-invalid')
      input.classList.remove('is-valid')
      if (!errorType) handleTextError(input, 'field can`t contain numbers')

      if (errorType && errorType !== 'numbers') {
        input.nextElementSibling.remove()
        handleTextError(input, 'field can`t contain numbers')
      }

      input.focus()
    } else if (inputType.indexOf('Name') > 0) {
      if (
        !hasNumber.test(input.value) &&
        input.value !== '' &&
        input.value.length > 2
      ) {
        console.log(inputType.indexOf('Name'))
        input.classList.remove('is-invalid')
        input.classList.add('is-valid')

        console.log(input.nextElementSibling)
        if (input.nextElementSibling) {
          console.log(input.nextElementSibling)
          input.nextElementSibling.remove()
        }
      }
    }
  })

  if (!hasNumber.test(phone.value)) {
    //aqui hay error

    const errorType = phone.nextElementSibling?.dataset.errortype
    phone.classList.remove('is-valid')
    phone.classList.add('is-invalid')

    if (!errorType) {
      handleTextError(phone, 'field can`t contain letters')
    }

    if (errorType && errorType !== 'letters') {
      phone.nextElementSibling.remove()
      handleTextError(phone, 'field can`t contain letters')
    }
  } else {
    phone.classList.remove('is-invalid')
    phone.classList.add('is-valid')
    phone.nextElementSibling.remove()
  }

  if (
    !isAlphanumeric.test(password.value) &&
    password.value.length > 2 &&
    password.value.length !== ''
  ) {
    //sale el mensaje de error pero el input no se colorea en rojo cuando noe s alphanumeric
    const errorType = password.nextElementSibling?.dataset.errortype
    password.classList.add('is-invalid')
    console.log('password must be alphanumeric')

    console.log(errorType)

    if (!errorType) {
      handleTextError(password, 'field must be alphanumeric')
      password.classList.add('is-invalid')
      console.log('1')
    }

    if (errorType && errorType !== 'alphanumeric') {
      password.nextElementSibling.remove()
      handleTextError(password, 'field must be alphanumeric')
      console.log('s')
    } else if (isAlphanumeric.test(password.value)) {
      password.classList.remove('is-invalid')
      password.classList.add('is-valid')

      password.nextElementSibling.remove()
      console.log(isAlphanumeric.test(password.value))
    }
  } else if (isAlphanumeric.test(password.value)) {
    password.nextElementSibling.remove()
  }
}

const handleTextError = (input, message) => {
  const paragraph = document.createElement('p')

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
