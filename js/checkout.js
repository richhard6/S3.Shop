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
    } else if (input.value.length <= 2) {
      input.classList.add('is-invalid')
      input.classList.remove('is-valid')

      if (!errorType)
        handleTextError(input, 'field must be longer than 3 characters')

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
    } else if (
      inputType.indexOf('Name') > 0 &&
      !hasNumber.test(input.value) &&
      input.value !== ''
    ) {
      input.classList.remove('is-invalid')
      input.classList.add('is-valid')

      if (input.nextElementSibling) {
        input.nextElementSibling.remove()
      }
    }
  })

  if (!hasNumber.test(phone.value)) {
    //aqui nos quedamos
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
}

const handleTextError = (input, message) => {
  const paragraph = document.createElement('p')

  paragraph.classList.add('text-danger')
  paragraph.classList.add('ml-3')

  const textContent = input.previousElementSibling.textContent.replace(':', '')

  const dataSet = message.split(' ')

  const verb = dataSet[dataSet.length - 1]

  paragraph.setAttribute('data-errortype', verb)

  const text = document.createTextNode(`${textContent} ${message}`)

  paragraph.appendChild(text)

  input.insertAdjacentElement('afterend', paragraph)
}
