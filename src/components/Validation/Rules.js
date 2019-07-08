import validator from 'validator';
const required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return 'Field is required';
    }
  };
  
const email = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
};

const number = (value) => {
  if (isNaN(value)) {
      return `${value} is not a number.`
  }
};

export { required, email, number};