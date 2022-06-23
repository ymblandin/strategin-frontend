import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      alert('Please specify both email and password');
    } else {
      instance
        .post(`/login`, {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then((response) => {
          alert(
            'Successfully logged in!\nClick "OK" to be automatically redirected to the users\' list.'
          );
          navigate('/users');
        })
        .catch((err) => {
          console.error(err);
          alert(err);
        });
    }
  };

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h2>Please log in!</h2>
        <form onSubmit={handleSubmit}>
          <div className='email-container'>
            <label htmlFor='email'>Email: </label>
            <br />
            <input
              type='email'
              id='email'
              name='email'
              value={loginInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className='password-container'>
            <label htmlFor='password'>Password: </label>
            <br />
            <input
              type='password'
              id='password'
              name='password'
              value={loginInfo.password}
              onChange={handleChange}
            />
          </div>
          <div className='submit-container'>
            <input type='submit' value='Login' />
          </div>

          <div className='nav-buttons'>
            <button type='button'>
              <Link to='/'>
                <a>Register a new user</a>
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

export default Login;
