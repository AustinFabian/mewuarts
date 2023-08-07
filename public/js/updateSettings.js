import axios from 'axios'
import {showAlert} from '/alert'

var forError = document.getElementById('spanErrors')
var error = document.getElementById('errors')
const hideAlert = function(){
  error.classList.remove("disError");
  forError.classList.remove("disError");
  forError.innerHTML = "";
}

// type is either 'password' or 'data'
export const updateSettings = async (data,type) => {

    const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe'

    try {
      const res = await axios({
        method: 'PATCH',
        url,
        data
      });

      if(res.data.status === 'Success'){
          showAlert('success',`${type} changed succesfully`);
          location.reload(true) 
      }
    } catch (err) {
      showAlert('error',err.response.data.message);
    }
  };

  // CREATING TOUR ENGINE
  export const newTour = async (data) => {

    const url = `/api/v1/tours`;

    try {
      const res = await axios({
        method: 'POST',
        url,
        data
      });

      
      if(res.data.status === 'success'){
          location.assign('/') 
      }
    } catch (err) {
      console.log('error',err.response.data.message);
    }
  };

  // UPDATING TOUR ENGINE
  export const updateTour = async (data,tourId) => {

    const url = `/api/v1/tours/${tourId}`;

    try {
      const res = await axios({
        method: 'PATCH',
        url,
        data
      });
      
      if(res.data.status === 'success'){
          location.reload(true) 
      }
    } catch (err) {
      console.log('error',err.response.data.message);
    }
  };


  // DELETING TOUR ENGINE
  export const deleteEvent = async (tourId) => {

    const url = `/api/v1/tours/${tourId}`;

    try {
      const res = await axios({
        method: 'DELETE',
        url
      });
      
      if(res.data.status === 'success'){
          location.reload(true) 
      }
    } catch (err) {
      console.log('error',err.response.data.message);
    }
  };

  // DELETE USER ENGINE
  export const deleteClient = async (userId) => {

    const url = `/api/v1/users/${userId}`;

    try {
      const res = await axios({
        method: 'DELETE',
        url
      });
      
      if(res.data.status === 'success'){
          location.reload(true) 
      }
    } catch (err) {
      console.log('error',err.response.data.message);
    }
  };

  // DELETE USER ENGINE
  export const deactivateSelf = async () => {

    const url = `/api/v1/users/deleteme`;

    try {
      const res = await axios({
        method: 'DELETE',
        url
      });
      
      if(res.status === 204){
          location.assign('/') 
      }
    } catch (err) {
      console.log('error',err.response.data.message);
    }
  };

  // TOUR REVIEW ENGINE
  export const dropAReview = async (review,tour) => {

    const url = `/api/v1/reviews/${tour}`;

    try {
      const res = await axios({
        method: 'POST',
        url,
        data:{
          review,
          status: 201
        }
      });
        location.reload();
    } catch (err) {
      console.log('error',err.response.data.message);
      if(err.response.data.message.includes("duplicate key")){
        window.setTimeout(()=>{
          forError.classList.add('disError');
          forError.innerHTML = "A user can drop a review only once";
          window.setTimeout(()=>{
            hideAlert();
          },7000)
        })
      }else{
          error.classList.add('disError');
          forError.classList.add('disError');
          forError.innerHTML = err.response.data.message;
          window.setTimeout(()=>{
            hideAlert();
          },7000)
      }
      
    }
  };

  // DELETE USER REVIEW ENGINE

  export const deleteUserReview = async (reviewId) => {

    const url = `api/v1/reviews/${reviewId}`;

    try {
      const res = await axios({
        method: 'DELETE',
        url
      });
      
      if(res.data.status === 'success'){
          location.reload(true) 
      }
    } catch (err) {
      console.log('error',err.response.data.message);
    }
  };
