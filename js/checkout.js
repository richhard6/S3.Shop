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
const errorPassword = document.getElementById('errorPassword')
const errorName = document.getElementById('errorName')
const errorPhone = document.getElementById('errorPhone')

// Exercise 9
function validate(e) {
  e.preventDefault()
  // Validate fields entered by the user: name, phone, password, and email
  inputs.forEach((input) => {
    const errorType = input.nextElementSibling?.dataset.errortype

    if (input.value === '') {
      input.classList.add('is-invalid')
      input.classList.remove('is-valid')

      console.log(errorType)
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
      input.classList.remove('is-invalid')
      input.classList.add('is-valid')
    }

    console.dir(input)
  })
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
