import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import * as yup from "yup";
import validationSchema from "../validation/validationSchema";

//Initial form values
const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
//Initial form errors
const initialFormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
//Initial users
const initialDisabled = [];
export default function SignUpComponent() {
  //States
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [passwordShown, setPasswordShown] = useState(false);
  //Toggles password to be visible
  const togglePasswordVisibility = (event) => {
    setPasswordShown(passwordShown ? false : true);
    event.preventDefault();
  };
  //Form submit
  const formSubmit = () => {
    const newUser = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };
  //Form submit event handler
  const onSubmit = (event) => {
    event.preventDefault();
    formSubmit();
  };

  //Use history hook
  const history = useHistory();
  //Axios post request
  const postNewUser = (newUser) => {
    console.log(newUser);
    axios
      .post(
        "https://familyrecipe-app-backend.herokuapp.com/api/auth/register",
        newUser
      )
      .then((res) => {
        console.log(res);
        setFormValues(initialFormValues);
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Input change
  const inputChange = (name, value) => {
    yup
      .reach(validationSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  //Disabled button when form isn't valid
  useEffect(() => {
    validationSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);
  //Input change event handler
  const onChange = (event) => {
    const { name, value } = event.target;
    inputChange(name, value);
  };
  //Styles
  const Button = styled.button`
    background-color: transparent;
    border-radius: 0.35em;
    border: solid 3px #efefef;
    &:hover {
      border-color: #49bf9d;
      color: #49bf9d;
    }
    color: #787878;
    cursor: pointer;
    font-weight: 400;
    height: calc(2.75em + 6px);
    min-width: 10em;
    padding: 0 1.5em;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    
  `
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            First Name
            <input
              value={formValues.firstName}
              onChange={onChange}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
          </label>
          <label>
            Last Name
            <input
              value={formValues.lastName}
              onChange={onChange}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </label>
          <label>
            Email
            <input
              value={formValues.email}
              onChange={onChange}
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              value={formValues.password}
              onChange={onChange}
              name="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
            />
          </label>
          <Button onClick={togglePasswordVisibility}>Show</Button>
          <label>
            Confirm Password
            <input
              value={formValues.confirmPassword}
              onChange={onChange}
              name="confirmPassword"
              type={passwordShown ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </label>
          <Button onClick={togglePasswordVisibility}>Show</Button>
          <Button disabled={disabled} type="submit">
            Submit
          </Button>
          {/* Render form errors */}
          <div>
            <div>{formErrors.firstName}</div>
            <div>{formErrors.lastName}</div>
            <div>{formErrors.email}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.confirmPassword}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
