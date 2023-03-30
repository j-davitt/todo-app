import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// const testUsers = {
//   Administrator: {
//     password: 'admin',
//     name: 'Administrator',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
//   },
//   Editor: {
//     password: 'editor',
//     name: 'Editor',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
//   },
//   Writer: {
//     password: 'writer',
//     name: 'Writer',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
//   },
//   User: {
//     password: 'user',
//     name: 'User',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
//   },
// };

export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loggedIn: false,
  //     can: this.can,
  //     login: this.login,
  //     logout: this.logout,
  //     user: { capabilities: [] },
  //     error: null,
  //   };
  // }

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const login = async (username, password) => {

    // let auth = testUsers[username];
    let config = {
      baseURL: 'https://api-js401.herokuapp.com',
      method: 'post',
      url: '/signin',
      auth: { username, password },
    }

    let response = await axios(config);
    console.log('Response', response);

    let user = response.data.user;
    let token = response.data.token;

    if (token) {
      try {
        validateToken(token);
      } catch (e) {
        setLoginState(loggedIn, token, user, e);
        console.error(e);
      }
    }
  }

  const logout = () => {
    setLoginState(false, null, { capabilities: [] });
  };

  const validateToken = token => {
    try {
      let validUser = jwt_decode(token);
      console.log('Valid User', validUser);
      setLoginState(true, token, validUser);
    }
    catch (e) {
      setLoginState(false, null, { capabilities: [] }, e);
      console.log('Token Validation Error', e);
    }

  };

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    // this.setState({ token, loggedIn, user, error: error || null });
    setToken(token);
    setLoggedIn(loggedIn);
    setUser(user);
    setError(error || null);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  const values = { loggedIn, login, logout, user, error, can };

  
    return (
      <LoginContext.Provider value={values}>
        {children}
      </LoginContext.Provider>
    );

}

export default LoginProvider;
