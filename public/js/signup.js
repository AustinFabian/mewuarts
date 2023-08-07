/* eslint-disable */
import axios from 'axios';
import { showAlert } from '/alert';

var alertUs = document.getElementById('alertUs');

const hideAlert = function(){
  alertUs.classList.remove("alert--error");
  alertUs.innerHTML = "";
}

export const signup = async (name,email,password,passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    
    if (res.data.status === 'Success') {
      window.setTimeout(() => {
        alertUs.classList.add('alert--success')
        alertUs.innerHTML = "Weldone"
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    window.setTimeout(() => {
      alertUs.classList.add('alert--error');
      alertUs.innerHTML = "Check details and Try again"
      window.setTimeout(()=>{
        hideAlert()
      },7000)
    },1000);
  }
};

