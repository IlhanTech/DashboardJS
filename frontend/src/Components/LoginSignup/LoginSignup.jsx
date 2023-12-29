import React, { useState, useEffect } from 'react';
import './LoginSignup.css';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import createUser from '../../api/createUser';
import loginUser from '../../api/loginUser';
import ButtonGoogleLogin from '../ButtonGoogleLogin/ButtonGoogleLogin';
import { gapi } from  'gapi-script';

import user_icon from '../Assets/user_icon.png';
import email_icon from '../Assets/email_icon.png';
import password_icon from '../Assets/password_icon.png';

const ClientID = process.env.REACT_APP_GoogleClientID;

const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const roadName = useLocation();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: ClientID,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  useEffect(() => {
    if (action === 'Sign Up' && roadName.pathname === '/login') {
      setAction('Login');
    } else if (action === 'Login' && roadName.pathname === '/signup') {
      setAction('Sign Up');
    }
  }, [action, roadName.pathname]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

      if (action === 'Sign Up' && !values.name)
        errors.name = 'Veuillez fournir un nom';
      if (!values.email)
        errors.email = 'Veuillez fournir une adresse e-mail';
      if (!values.password || values.password.length < 8)
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères';

      return errors;
    },
    onSubmit: async (values) => {
      if (Object.keys(formik.errors).length === 0 && action === 'Sign Up') {
        const response = await createUser(values.name, values.email, values.password);
        console.log('Response from server:', response.data);
        console.log('Form submitted with values:', values);
        formik.resetForm();
        navigate('/dashboard');
      } else if (Object.keys(formik.errors).length === 0 && action === 'Login') {
        const response = await loginUser(values.email, values.password);
        console.log('Response from server:', response.data);
        console.log('Form submitted with values:', values);
        formik.resetForm();
        navigate('/dashboard');
      } else {
        console.log('Form has errors. Please fix them.');
      }
    },
  });

  function handleLogin() {
    if (action === "Sign Up") {
      setAction("Login");
      navigate('/login', { replace: true });
    } else {
      if (Object.keys(formik.errors).length === 0) {
        formik.handleSubmit();
      } else {
        console.log('Form has errors. Please fix them.');
      }
    }
  };

  function handleSignUp() {
    if (action === "Login") {
      setAction("Sign Up");
      navigate('/signup', { replace: true });
    } else {
      if (Object.keys(formik.errors).length === 0) {
        formik.handleSubmit();
      } else {
        console.log('Form has errors. Please fix them.');
      }
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={formik.handleSubmit} className='inputs'>
        {action === "Login" ? null : (
          <div className='input'>
            <img src={user_icon} alt=""/>
            <input
              type="text"
              placeholder='Name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              autoComplete="current-name"
            />
            {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
          </div>
        )}
        <div className='input'>
          <img src={email_icon} alt=""/>
          <input
            type="email"
            placeholder='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            autoComplete="current-email"
          />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>
        <div className='input'>
          <img src={password_icon} alt=""/>
          <input
            type="password"
            placeholder='Password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            autoComplete="current-password"
          />
          {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        </div>
      </form>
      <div className="forgot-password">Lost Password ? <span>Click Here !</span></div>
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUp}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={handleLogin}>Login</div>
      </div>
      <div>
        <ButtonGoogleLogin />
      </div>
    </div>
  );
};

export default LoginSignup;
