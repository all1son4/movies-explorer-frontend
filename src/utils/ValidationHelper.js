import {useCallback, useState} from 'react';
import {validationMessage} from './validationMessage';

function ValidationHelper() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isValidate, setIsValidate] = useState(false);
  const [focus, setFocus] = useState({})

  const onFocus = (e) => {
    let focus = {};
    focus[e.target.name] = true;
    setFocus(focus);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues(v => ({...v, [name]: value}));

    const error = validationMessage(name, value);
    const activeError = {...errors, ...error};

    if (!error[name]) delete activeError[name];

    setErrors(activeError)

    if (Object.keys(activeError).length === 0) setIsValidate(event.target.closest('form').checkValidity())
  };

  const afterSubmit = useCallback(() => {
    setValues({
      email: '',
      password: '',
      name: ''
    });
    setErrors({});
    setIsValidate(false);
  }, [setValues, setErrors, setIsValidate]);

  return {
    values,
    handleChange,
    setValues,
    errors,
    setErrors,
    isValidate,
    setIsValidate,
    onFocus,
    focus,
    afterSubmit
  }
}

export default ValidationHelper;

