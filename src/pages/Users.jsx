import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './users.css';

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    instance
      .get(`/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("You're not authorized");
        } else if (err.response.status === 401) {
          alert("You're not authenticated");
        }
      });
  }, []);

  return (
    <div className='users-container'>
      <div className='users'>
        <h2>Here is the list of all the registered users!</h2>
        <h3>You must be logged in to see the list.</h3>
        <div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>
            ))}
          </ul>
          <div className='nav-buttons'>
            <button type='button'>
              <Link to='/'>
                <a>Register a new user</a>
              </Link>
            </button>
            <button type='button'>
              <Link to='/login'>
                <a>Login page</a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
