import React, { useState} from "react";

import {useHistory} from "react-router-dom"; 

import axiosWithAuth from '../utils/axiosWithAuth'; 

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const { push } = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    // make post request and send the credentials object to the api

    axiosWithAuth()
      .post("/api/login", credentials)
      .then((res) => {
        //always consolelog first so you know what to do with it!
        window.localStorage.setItem("token", res.data.payload);
        // navigate user to /protected (or whatever landing page)
        push("/protected");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
