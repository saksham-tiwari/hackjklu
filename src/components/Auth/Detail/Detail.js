import React, { useState, useEffect, useRef } from "react";
import "./Detail.css";
import Navbar from "../../Layout/Navbar/Navbar";
import { useForm } from "react-hook-form";
import photo1 from "../../Assets/customer.svg";
import photo2 from "../../Assets/store.svg";
import photo3 from "../../Assets/user.svg";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/API";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";

const Details = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pass } = useSelector((state) => state.AuthReducer);

  const [role, setRole] = useState(null);
  const [fieldValue, setFieldValue] = useState(null);
  const [preview, setPreview] = useState(photo3);
  const fileRef = useRef(null);



  const onSubmit = (data) => {
    if (role === null) {
      alert("Choose your role");
    return
    }

    dispatch(setLoader());

    const obj = {
        email: localStorage.getItem("email"),
        password: pass,
        fullname: data.fullname,
        mobileno: data.mobile,
        gender: data.aopt,
        role: role === "store" ? false : true,
      };
      console.log(obj);


    dispatch(actionCreators.userName(data.fullname));
    localStorage.setItem("fullname", data.fullname)
    dispatch(actionCreators.userMobile(data.mobile));
    dispatch(actionCreators.userGender(data.aopt));
    dispatch(actionCreators.userType(role));
    localStorage.setItem("Type", role);
    


    //after submit if role is store then navigate to another form else it navigate to home page
    AuthService.Details(obj)
            .then((res) => {
                dispatch(UnsetLoader());
                localStorage.setItem("userid", res.data._id);
                if (obj.role) {
                    navigate("/");
                } else {
                    navigate("/create-store");
                }
            })
            .catch((e) => {
                dispatch(UnsetLoader());
                console.log(e);
            });
    };

  const imageHandler = (e) => {
    setFieldValue(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
//   const fileRef = useRef(null);
  if (role) {
    console.log(role);
  }
  return (
    <div className="Signup-Page">
      <div className="Navbar-Signup">
        <Navbar />
      </div>
      <div className="middle-portion">
        <div className="first-portion">
          <div className="detail-heading">
            <p className="heading1">
              Tell us something about yourself <span className="ques">!</span>
            </p>
          </div>
          <div className="role">
            <p className="heading2">Select your Role</p>
          </div>
          <div className="images-role">
            <div className="photo1">
              <div className="photo1-img">
                <img className="pic1" src={photo1} alt="logo" />
              </div>
              <div className="photo1-role" onClick={() => setRole("Customer")}>
                Customer
              </div>
            </div>
            <div className="photo2">
              <div className="photo2-img">
                <img className="pic1" src={photo2} alt="logo" />
              </div>
              <div className="photo2-role" onClick={() => setRole("Store")}>
                store
              </div>
            </div>
          </div>
        </div>
        <form className="second-portion" onSubmit={handleSubmit(onSubmit)}>
          <div className="upload-user">
            <div className="user-img">
              <img className="pic2" src={preview} alt="logo" />
            </div>
            <div className="upload-btn">
              <input
                hidden
                ref={fileRef}
                type={"file"}
                accept="image/*"
                onChange={imageHandler}
              />
              <button
                onClick={() => {
                  fileRef.current.click();
                }}
                className="upload-img-btn"
              >
                <i id="plus" class="fa fa-plus" aria-hidden="true"></i>{" "}
                <span>Upload a profile pic</span>
              </button>
            </div>
          </div>
          <div className="input-login-field">
            <div className="fullname">
              <input
                className="input-field2"
                type="text"
                placeholder="Enter your full name"
                name="fullname"
                {...register("fullname", { required: "Name is required" })}
              ></input>
              <p className="alerts">{errors.fullname?.message}</p>
            </div>
            <div className="mobile">
              <input
                className="input-field2"
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                {...register("mobile", {
                  required: "A mozambican mobile number is required",
                  pattern: {
                    value: /^[8][0-9]{8}$/i,
                    message: "This is not a valid mobile number",
                  },
                })}
              ></input>
              <p className="alerts">{errors.mobile?.message}</p>
            </div>
          </div>
          <div className="radio-btns">
            <div className="male-radio">
              <label className="label-data" htmlFor="field-male">
                <input
                  {...register("aopt", { required: "This field is required" })}
                  type="radio"
                  name="aopt"
                  value="male"
                  id="field-male"
                />
                Male
              </label>
            </div>
            <div className="female-radio">
              <label className="label-data" htmlFor="field-female">
                <input
                  {...register("aopt", { required: "This field is required" })}
                  type="radio"
                  name="aopt"
                  value="female"
                  id="field-female"
                />
                Female
              </label>
            </div>
            <div className="other-radio">
              <label className="label-data" htmlFor="field-other">
                <input
                  {...register("aopt", { required: "This field is required" })}
                  type="radio"
                  name="aopt"
                  value="other"
                  id="field-other"
                />
                Other
              </label>
            </div>
            <p className="alerts">{errors.aopt?.message}</p>
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
