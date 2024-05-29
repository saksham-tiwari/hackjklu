import React, { useState, useEffect } from 'react'
import Navbar from '../../Layout/Navbar/Navbar'
import image from '../../Assets/pic.svg'
import './OTP.css'
import OtpInput from 'react-otp-input';
import AuthService from '../../../services/API'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
const Otp = () => {
    const [state, setState] = useState('');
    const [flag, setFlag] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const handleChange = (otp) => setState(otp);
    const x = localStorage.getItem("forgot");
    const {email,pass} = useSelector((state)=>state.AuthReducer);
    const style = {
        width: "28vw",
        height: "12vh",
        justifyContent: "space-around",
        alignItem: "center",
        position: "relative",
        left: "-10%"
    }
    const handleClick = () => {
        setMinutes(1);
        AuthService.resendotp()
    }
    const navigate = useNavigate();
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)  
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
        dispatch(setLoader())
        e.preventDefault();
        if(localStorage.getItem("forgot")==='1'){
            localStorage.removeItem("forgot");
            let obj={
                "email":localStorage.getItem("emailj"),
                "userOtp":state
            }
            AuthService.otp(obj)
            .then((res)=>{
                dispatch(UnsetLoader())
            console.log(res);
            navigate("/reset");
            }).catch((e)=>{
                dispatch(UnsetLoader())

            console.log(e);
            })
        }else{
            let obj={
                "email":email,
                "otp":state,
                "password":pass,
            }
            AuthService.otp(obj)
            .then((res)=>{
                dispatch(UnsetLoader())

            console.log(res);
            navigate("/detail");
            }).catch((e)=>{
                dispatch(UnsetLoader())
            console.log(e);
            })
        }
}
  return (<>
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>
            <div className='middle-portion'>
            {
                        x==='1' ? <div className='login-heading'>
                        <p>Check your email <span className='ques'>.</span></p>
                    </div> :<div className='otp-heading'>
                    <p>Let us verify your email <span className='ques'>.</span></p>
                        </div> 
                    }
                
                <form className='input-login' onSubmit={(e) => handleSubmit(e)}>
                    <p className='Enter-otp'>Enter OTP</p>
                    <div className='otp-input'>
                        <OtpInput
                            value={state}
                            onChange={handleChange}
                            numInputs={4}
                            hasErrored={flag}
                            errorStyle={{ border: "3px solid red", borderRadius: "15px" }}
                            containerStyle={style}
                            inputStyle={{ width: "5vw", height: "10vh", border: "3px solid black", borderRadius: "15px", fontFamily: "Source Sans Pro", fontWeight: "900", fontSize: "3em", color: "#304D6D" }}
                        />
                    </div>
                    <button className='otp-verify' type='submit'>Verify</button>
                    <p className='otp-head'>Didn't receive   
                        {
                         minutes === 0 && seconds === 0
                        ? <u onClick={handleClick}>Resend OTP</u>
                       : <p className='timer'> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</p>  
                        }
                        </p>
                </form>
            </div>
            <div className='queue-img'>
                <img className="pic" src={image} alt="logo" />
            </div>
        </div>
  </>
  )
}

export default Otp