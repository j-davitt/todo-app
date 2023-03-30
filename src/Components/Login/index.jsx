import React, { useContext, useState } from 'react';
import {When} from 'react-if';

import { LoginContext } from '../../Context/Auth';

const Login = (props) => {
  const { loggedIn, logout, login } = useContext(LoginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // constructor(props) {
  //   super(props);
  //   this.state = { username: '', password: '' };
  // }

  // const handleChange = e => {
  //   // this.setState({ [e.target.name]: e.target.value });
  //   setUsername(e.target.value);
  //   setPassword(e.target.value);
  // };

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  
    return (
      <>
        <When condition={loggedIn}>
          <button onClick={logout}>Log Out</button>
        </When>

        <When condition={!loggedIn}>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </When>
      </>
    );
  
}

export default Login;
