import axios from 'axios';
import url from './BaseUrl';
// import 'antd/dist/antd.css';
// Auth Service
class AuthServices {

    Signup(data) {
         return axios.post(url + "auth/signup", data)
    }
    Login(data) {
        console.log(data);
        return axios.post(url + "auth/login", data)
    }
    forgot(data) {
        return axios.post(url + "auth/forgot", data)
    }
    otp(data) {
        return axios.post(url + 'auth/otpVerification', data)
    }
    resendotp(data) {
        return axios.post(url + 'auth/resend', data)
    }
    resetpass(data) {
        return axios.post(url + 'zuth/setPassword', data)
    }
    Details(data) {
        console.log(data);
        return axios.post(url + "auth/details", data)
   }

}


export default new AuthServices();