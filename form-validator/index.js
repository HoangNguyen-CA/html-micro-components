const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function getFieldName(input) {
  return input.id;
}
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');

  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add('success');
}

function validateEmail(input) {
  let email = new String(input.value);
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
}

function checkRequired(inputs) {
  inputs.forEach((element) => {
    if (element.value.trim() === '') {
      showError(element, `${element.id} is required`);
    } else {
      showSuccess(element);
    }
  });
}

function checkPasswordsMatch(input1, input2) {
  console.log(input1.value, input2.value);
  if (input1.value !== input2.value) {
    showError(input2, 'passwords do not match');
  } else if (input2.value === '') {
    showError(input2, 'password confirmation required');
  } else {
    showSuccess(input2);
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters long`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at less than ${max} characters long`
    );
  } else {
    showSuccess(input);
  }
}

function reset(inputs) {
  inputs.forEach((element) => {
    console.log(element);
    let formControl = element.parentElement;
    formControl.classList.remove('error');
    formControl.classList.remove('success');
  });
}
form.addEventListener('submit', (event) => {
  let inputs = [username, email, password, password2];
  reset(inputs);
  event.preventDefault();

  checkLength(username, 4, 15);
  checkLength(password, 5, 20);

  validateEmail(email);
  checkRequired(inputs);
  checkPasswordsMatch(password, password2);
});
