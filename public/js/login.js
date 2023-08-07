/* eslint-disable */
import axios from 'axios'
import {showAlert} from '/alert'

var alertUs = document.getElementById('alertUs');

const hideAlert = function(){
  alertUs.classList.remove("alert--error");
  alertUs.innerHTML = "";
}

export const login = async (email, password) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        data: {
          email,
          password
        }
      });
      if(res.data.status === 'Success'){
        window.setTimeout(() => {
          alertUs.classList.add('alert--success')
          alertUs.innerHTML = "Login Successful"
          location.assign('/');
        }, 1000);
      }
    } catch (err) {
      window.setTimeout(() => {
        alertUs.classList.add('alert--error');
        alertUs.innerHTML = "Invalid Email or Password"
        window.setTimeout(()=>{
          hideAlert()
        },7000)
      },1000);
    }
  };


  // For logging  out users
  export const logOut = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/users/logOut'
      });
      if ((res.data.status === 'Success')){
        location.reload(true);
        location.assign('/')
      }
    } catch (err) {
      showAlert('error', 'Error logging out! Try again.');
    }
  };


