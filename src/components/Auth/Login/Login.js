import React, { useState, useEffect } from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import { useForm } from "react-hook-form";
import image from "../../Assets/pic.svg";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AuthService from "../../../services/API";
import { useDispatch } from "react-redux";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data, e) => {
    dispatch(setLoader());
    e.preventDefault();
    let obj = {
      email: data.email,
      password: data.password,
      isStore: data.aopt === "store" ? false : true,
    };
    AuthService.Login(obj)
      .then((res) => {
        dispatch(UnsetLoader());

        console.log(res);
        if (res) {
          localStorage.setItem("access", res.data.access_token);
          localStorage.setItem("access", res.data.refresh_token);
          localStorage.setItem("userid", res.data._id);

          // navigate("/");
          // console.log(obj);
          !obj.isStore ? navigate("/create-store") : navigate("/");
        }
      })
      .catch((e) => {
        dispatch(UnsetLoader());

        console.log(e);
      });
  };
  const handleClick = () => {
    navigate("/forgot");
  };
  const handleClicked = () => {
    navigate("/signup");
  };
  const [toggle, setToggle] = useState(false);
  return (
    <div className="Signup-Page">
      <div className="Navbar-Signup">
        <Navbar />
      </div>
      <div className="middle-portion">
        <div className="login-heading">
          <p>
            Welcome Back <span className="ques">!</span>
          </p>
        </div>
        <form className="input-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="radio-button">
            <div className="customer-radio">
              <label className="label-data" htmlFor="field-customer">
                <input
                  {...register("aopt", { required: "This field is required" })}
                  type="radio"
                  name="aopt"
                  value="customer"
                  id="field-customer"
                />
                Customer
              </label>
            </div>
            <div className="store-radio">
              <label className="label-data" htmlFor="field-store">
                <input
                  {...register("aopt", { required: "This field is required" })}
                  type="radio"
                  name="aopt"
                  value="store"
                  id="field-store"
                />
                Store
              </label>
            </div>
            <p className="alerts">{errors.aopt?.message}</p>
          </div>
          <div className="form-container">
            <div className="emails">
              <input
                className="input-field"
                type="email"
                placeholder="Enter Email Address"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: "This is not a valid email",
                  },
                })}
              ></input>
              <p className="alerts">{errors.email?.message}</p>
            </div>
          </div>
          <div className="form-container">
            <div className="passwords">
              <i id="passlock" class="fa fa-eye" aria-hidden="true"></i>
              {toggle ? (
                <i
                  id="passlock"
                  class="fa fa-eye-slash"
                  aria-hidden="true"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                ></i>
              ) : (
                <i
                  id="passlock"
                  class="fa fa-eye"
                  aria-hidden="true"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                ></i>
              )}
              <input
                className="input-field"
                type={toggle ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be more than 8 characters",
                  },
                  maxLength: {
                    value: 14,
                    message: "Password cannot exceed more than 14 characters",
                  },
                })}
              ></input>
              <p className="alerts">{errors.password?.message}</p>
            </div>
          </div>
          <p className="forgot" onClick={handleClick}>
            <u>Forgot password ?</u>
          </p>
          <button className="signup-btn" type="submit">
            Login
          </button>
          <p className="signup-head">
            Create New Account <span onClick={handleClicked}>Signup</span>
          </p>
        </form>
      </div>
      <div className="queue-img">
        <img className="pic" src={image} alt="logo" />
      </div>
    </div>
  );
};

export default Login;
