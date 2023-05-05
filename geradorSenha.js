const inputEl = document.querySelector('#password') //id

const upperCaseCheckE1 = document.querySelector('#uppercase-check') //id
const numbersCheckE1 = document.querySelector('#number-check') //id
const symbolsCheckE1 = document.querySelector('#symbol-check') //id

const securityIndicatorE1 = document.querySelector('#security-indicator-bar') //id

// value = 16, a variavel que ser do tipo number
let passwordLenght = 16

function createPassword() {
  let chars = 'abcdefghijklnmopqrstuvWxyz'

  const upperCaseChars = 'ABCDEFGHIJKLNMOPQRSTUVWXY'
  const numbersChars = '123456789'
  const symbolsChars = '!@#$%^&*(){}[]'

  if (upperCaseCheckE1.checked) {
    chars += upperCaseChars
  }
  if (numbersCheckE1.checked) {
    chars += numbersChars
  }
  if (symbolsCheckE1.checked) {
    chars += symbolsChars
  }

  let password = ''

  for (let i = 0; i < passwordLenght; ++i) {
    const randomNumber = Math.floor(Math.random() * chars.length)

    password += chars.substring(randomNumber, randomNumber + 1)
  }
  //console.log(password)
  //----------------------------------------------------
  inputEl.value = password

  calculateQuality()
  calculateFontSize()
  return password
}

function calculateQuality() {
  // T*0.25 + M*0.15 + N*0,25 + S*0.35 = 100
  const percent = Math.round(
    (passwordLenght / 64) * 25 +
      (upperCaseCheckE1.checked ? 15 : 0) +
      (numbersCheckE1.checked ? 25 : 0) +
      (symbolsCheckE1.checked ? 35 : 0)
  )
  // console.log(percent)

  securityIndicatorE1.style.width = `${percent}%`

  if (percent > 69) {
    //safe
    securityIndicatorE1.classList.remove('critical')
    securityIndicatorE1.classList.remove('warning')
    securityIndicatorE1.classList.add('safe')
  } else if (percent > 50) {
    //warning
    securityIndicatorE1.classList.remove('critical')
    securityIndicatorE1.classList.add('warning')
    securityIndicatorE1.classList.remove('safe')
  } else {
    //critical
    securityIndicatorE1.classList.add('critical')
    securityIndicatorE1.classList.remove('warning')
    securityIndicatorE1.classList.remove('safe')
  }

  if (percent >= 100) {
    securityIndicatorE1.classList.add('completed')
  } else {
    securityIndicatorE1.classList.remove('completed')
  }
}

//diminue fonte dependendo do tamanho
function calculateFontSize() {
  if (passwordLenght > 45) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.add('font-xxs')
  } else if (passwordLenght > 32) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.add('font-xs')
    inputEl.classList.remove('font-xxs')
  } else if (passwordLenght > 22) {
    inputEl.classList.add('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  } else {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  }
}

//função do botão copiar
function copy() {
  navigator.clipboard.writeText(inputEl.value)
  alert('senha copiada')
}

//Fazendo a interação do input renge
const passwordLenghtE1 = document.querySelector('#password-length') //id
passwordLenghtE1.addEventListener('input', function () {
  passwordLenght = passwordLenghtE1.value
  //console.log(passwordLenght)

  document.querySelector('#password-length-text').innerHTML = passwordLenght

  //atualizar toda vez que mexe na barra

  createPassword()
})

upperCaseCheckE1.addEventListener('click', createPassword)
numbersCheckE1.addEventListener('click', createPassword)
symbolsCheckE1.addEventListener('click', createPassword)

//interação do botão copiar
const buttonCopyE1 = document.querySelector('#copy-2') //id
buttonCopyE1.addEventListener('click', copy)

const imgE1 = document.querySelector('#copy-1')
imgE1.addEventListener('click', copy)

const imgE2 = document.querySelector('#renew')
imgE2.addEventListener('click', createPassword)

createPassword()
