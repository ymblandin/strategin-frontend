import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className='app'>
        {/* <nav>
          <ul>
            <li>
              <Link to='/'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
