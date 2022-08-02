export const validationMessage = (name, value) => {
  let errorMessage = {}

  if (name === 'email') {
    if (!value) {
      errorMessage = {[name]: 'Пожалуйста заполните поле'}
    } else if (!new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/).test(value)) {
      errorMessage = {[name]: 'Введите корректный E-mail'}
    }
  }

  if (name === 'password') {
    if (!value) {
      errorMessage = {[name]: 'Пожалуйста заполните поле'}
    } else if (!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(value)) {
      errorMessage = {[name]: 'Пароль должен содержать 8 символов, иметь строчную и заглавную букву, одну цифру'}
    }
  }

  if (name === 'name') {
    if (!value) {
      errorMessage = {[name]: 'Пожалуйста заполните поле'}
    } else if (value.length < 2) {
      errorMessage = {[name]: 'Имя должно содержать два и более символов'}
    } else if (!new RegExp(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u).test(value)) {
      errorMessage = {[name]: 'Вы используете недопустимые символы'}
    }
  }

  return errorMessage
}