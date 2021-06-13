import React, { useState } from "react";
import "./Login.scss";
import { Avatar, Button } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

function Login({ handleLogin, responseError }) {
  const [user, setUser] = useState({ name: "", file: "" });
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.name == "") {
        setError('please enter a username')
    } else {
      handleLogin(user);
    }
  };

  const handleNameChange = (e) => {
    setError(null)
      setUser({...user, name: e.target.value})
  }

  const onFileChange = (e) => {
      setUser({...user, file: e.target.files[0]})
  }

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
          alt=""
        />
      </div>
      <div className="login-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="profile-img">
            <input
              className="file-upload"
              type="file"
              onChange={(e) => onFileChange(e)}
            />
            <FaceIcon className="icon-block" />
            <span className="bg-blue"> Upload Pic </span>
          </div>
          <div className="profile-name">
            <Avatar className="icon-block" />
            <input
              placeholder="Your name here"
              type="text"
              name="name"
              onChange={(e) => handleNameChange(e)}
            />
          </div>
          <input
            type="submit"
            className="profile-submit-btn"
            value="Join now"
          />
        </form>
        {error &&<div>{error}</div>}
        {responseError &&<div>{responseError}</div>}
      </div>
    </div>
  );
}

export default Login;
