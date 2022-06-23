import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './register.css';

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Your password must be a minimum of eight characters and include at least one uppercase letter, one lowercase letter, one number and one special character.'
      )
      .required(),
  })
  .required();

function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onToucnhed',
  });

  const { errors } = formState;

  const navigate = useNavigate();

  const onSubmit = (data) => {
    instance
      .post(`/register`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        alert(
          'Successfully registered!\nClick "OK" to be automatically redirected to the login page.'
        );
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 409) {
          alert('Email already in use');
        } else {
          alert(err);
        }
      });
  };

  return (
    <div className='register-container'>
      <div className='register'>
        <h2>Please register!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='email-container'>
            <label htmlFor='email'>Email: </label>
            <br />
            <input type='email' name='email' {...register('email')} />
            {errors.email && <p role='alert'>{errors.email.message}</p>}
          </div>

          <div className='password-container'>
            <label htmlFor='password'>Password: </label>
            <br />

            <input type='password' name='password' {...register('password')} />
            {errors.password && <p role='alert'>{errors.password.message}</p>}
          </div>
          <div className='submit-container'>
            <input type='submit' value='Create an account' />
          </div>
          <div className='nav-buttons'>
            <button type='button'>
              <Link to='/login'>
                <a>Login page</a>
              </Link>
            </button>
            <button type='button'>
              <Link to='/users'>
                <a>Users' list</a>
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
