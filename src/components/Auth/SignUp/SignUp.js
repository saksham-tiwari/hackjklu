import React, { useState } from "react";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/API";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";
import vmLogo from '../../Assets/vodacom-logo.png'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    dispatch(setLoader());
    e.preventDefault();
    dispatch(actionCreators.userEmail(data.email));
    dispatch(actionCreators.userPass(data.password));
    localStorage.setItem("email", data.email);
    let obj = {
      email: data.email,
    };
    AuthService.Signup(obj)
      .then((res) => {
        dispatch(UnsetLoader());
        console.log(res);
      })
      .catch((error) => {
        dispatch(UnsetLoader());
        console.log(error);
      });
    navigate("/detail");
  };

  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);

  const handleClicked = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="login-container">
      <div className="login-form">
        <div className="logo-container">
          <img className="login-logo" src={ vmLogo } alt="logo" />
        </div>

        <div className="text">
          <h2>Queue Managemnet</h2>
          <p>Hate Never Ending Queues?</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div className="">
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
              <p className="alert-message">{errors.email?.message}</p>
            </div>
          </div>

          <div className="form-container">
            <div className="">
              <input
                className="input-field"
                type={toggle ? "text" : "password"}
                placeholder="Enter New Password"
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
              <p className="alert-message">{errors.password?.message}</p>
            </div>
          </div>

          <div className="form-container">
            <div className="">
              <input
                className="input-field"
                type={toggle1 ? "text" : "password"}
                placeholder="Renter New Password"
                name="cpassword"
                {...register("cpassword", {
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
              <p className="alert-message">{errors.cpassword?.message}</p>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <p className="">
              Existing users? <span className="clickable" onClick={handleClicked}>Login</span>
            </p>

            <button className="submit" type="submit">
              Sign Up Now
            </button>
          </div>
        </form>
      </div>

      <div className="image"></div>
    </div>
    </>
  );
};

export default SignUp;