import React from "react";
import vmLogo from '../../Assets/vodacom-logo.png'
import { useForm } from "react-hook-form";
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

        if (e.response.data) {
          window.alert(e.response.data.message)
        } else {
          window.alert("Something went wrong!");
        }

        console.log(e);
      });
  };

  const handleClick = () => {
    navigate("/forgot");
  };

  const handleClicked = () => {
    navigate("/signup");
  };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-container">
          <img className="login-logo" src={ vmLogo } alt="logo" />
        </div>

        <div className="text">
          <h2>Queue Managemnet</h2>
          <p>Welcome back! Enter your account details</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} >
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

            <p className="alert-message">{errors.aopt?.message}</p>
          </div>

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
                type={"password"}
                placeholder="Enter Password"
                name="password"
                {...register("password", {
                  required: "Password is required",
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
  
          <div style={{ marginTop: 16 }}>
            <p className="">
              <span className="clickable" onClick={handleClick}>Forgot password?</span> or <span className="clickable" onClick={handleClicked}>Create an account</span>
            </p>

            <button className="submit" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="image"></div>
    </div>
  );
};

export default Login;