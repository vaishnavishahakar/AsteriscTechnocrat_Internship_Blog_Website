import { useState } from "react";
import axios from "axios";
import "../../Css/Login.css"
import { Link, useNavigate } from "react-router-dom";

const apiURL = process.env.REACT_APP_API_URL;


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${apiURL}/auth/login`,
        { email, password }
      );
      console.log("login data", data);
      localStorage.setItem("authToken", data.token);

      console.log("localstorage", localStorage.getItem("authToken"));

      setTimeout(() => {

        navigate("/")

      }, 1800)

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4500);

    }
  };

  return (

    <div className="Inclusive-login-page">

      <div className="login-big-wrapper">
        <div className="login-banner-section ">

          <img src="Mobile-login-rafiki.png" alt="banner" width="400px" />
        </div>
        <div className="section-wrapper">
          
          <div className="top-login-explain">
            <h2>Login</h2>
            <p>
              Please Login Your Account, Thank You!
            </p>
          </div>

          <form onSubmit={loginHandler} >
            {error && <div className="error_message">{error}</div>}
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1} required></input>
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2} placeholder="Enter Password"></input>
              <label for="floatingPassword">Password</label>
            </div>

            <div className="top-suggest_register">

              <span>Don't have an account? </span>
              <a href="/register">Sign Up</a>
              <span>  <Link to="/forgotpassword" className="login-screen__forgotpassword"> Forgot Password ?
              </Link></span>
            </div>

            <button type="submit" >
              Login
            </button>

          </form>


        </div>



      </div>


    </div>


  );
};

export default LoginScreen;