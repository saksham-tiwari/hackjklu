import React from 'react'
import illustrate from '../../Assets/vodacom-logo.png'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const signingOut = () => {
        localStorage.clear();
        navigate("/login");
    }

const qrScan = () => {
    navigate("/qrcode");
}
const logoClick = () =>{
    navigate("/");
}
    return (
        <div className='Navbar'>
            <div className='logo' onClick={logoClick}>
                <div className='logo-image'>
                    <img className="image" src={illustrate} alt="logo" />
                </div>
                <div className='logo-head'>
                    <p>Vodacom</p>
                </div>

            </div>
            <div className='Nav-menu'>
                <div className='sign-out' style={{order: "2"}} onClick={signingOut}>
                    <i class="fa fa-sign-out" aria-hidden="true" style={{ color: "white", fontSize: "2.2em", cursor: "pointer" }}></i>
                </div>
                <div className='qr-code' style={{order: "1"}} onClick={qrScan}>
                     <i class="fa fa-qrcode" aria-hidden="true" style={{ color: "white", fontSize: "2.2em", cursor: "pointer"}}></i>
                </div>
                {/* <LogoutIcon style={{color:"white"}} fontSize="large"/> */}
            </div>
        </div>
    )
}

export default Navbar