import React, { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import background_img from "../img/background.jpg";
import logo_img from "../img/logo.jpg";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 401) {
          setMessage("Invalid username or password. Please try again.");
        } else if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const containerStyle = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    overflow: "hidden", // Ensure the blur effect doesn't overflow
  };

  const backgroundStyle = {
    backgroundImage: `url(${background_img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(5px)', // Apply blur only to the background
    width: '120%', // Make the transparent space a bit bigger
    height: '120%', // Make the transparent space a bit bigger
    marginLeft: '-10%', // Center the image
    marginTop: '-10%', // Center the image
  };

  const loginStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px', // Larger container
    height: '450px', // Larger container
    padding: '40px', // Adjusted padding for better spacing
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    textAlign: 'left', // Align text to the left
  };

  const logoContainerStyle = {
    position: 'relative', // Use relative positioning for the logo container
    marginBottom: '10px', // Add margin to separate logo and form
    top: '-25%', // Move the logo up by 50%
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
  };

  const logoStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
  };

  const textBelowLogoStyle = {
    color: '#fff',
    fontSize: '25px', // Increased font size
    margin: '0', // No space between sentences and username
    fontWeight: 'bold',
    textAlign: 'center', // Center-align the text
    textTransform: 'uppercase', // Apply uppercase transformation
    fontFamily: 'Open Sans, sans-serif',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginTop: '-70px', // Align form items to the left
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '15px', // Reduced space between sentences and username
    border: 'none',
    borderBottom: '1px solid #fff',
    background: 'transparent',
    outline: 'none',
    height: '50px',
    color: '#fff',
    fontSize: '15px', // Increase font size
    position: 'relative',
  };

  const passwordEyeContainerStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const submitStyle = {
    height: '40px',
    width: '100%', // Make the button full-width
    color: '#fff',
    fontSize: '15px',
    background: 'rgb(21, 164, 5)',
    cursor: 'pointer',
    borderRadius: '25px',
    border: 'none',
    outline: 'none',
    marginTop: '15px',
    fontWeight: 'bold',
  };

  return (
    <div className="login-container" style={containerStyle}>
      <div className="background" style={backgroundStyle}></div>
      <div className="login" style={loginStyle}>
        <div className="logo-container" style={logoContainerStyle}>
          <img className="logo" src={logo_img} alt="Logo" style={logoStyle} />
          <p style={textBelowLogoStyle}>LGU MALITBOG</p>
          <p style={textBelowLogoStyle}>GENERAL SERVICES OFFICE</p>
        </div>
        <form onSubmit={onSubmit} style={formStyle}>
        <div>
  <p style={{ margin: '0', padding: '0', fontWeight: 'bold', color: '#fff', fontSize: '20px' }}>Username</p>
  <input
    placeholder="Enter Username"
    type="email"
    ref={emailRef}
    required
    style={inputStyle}
  />

  <p style={{ margin: '10px 0 0', padding: '0', fontWeight: 'bold', color: '#fff', fontSize: '20px' }}>Password</p>
  <div style={{ position: 'relative' }}>
    <input
      placeholder="Enter Password"
      type={showPassword ? 'text' : 'password'}
      ref={passwordRef}
      required
      style={inputStyle}
    />
    <span style={passwordEyeContainerStyle} onClick={togglePasswordVisibility}>
      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon/>}
    </span>
  </div>
</div>
          <button type="submit" style={submitStyle}>Submit</button>
          {message && (
            <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
