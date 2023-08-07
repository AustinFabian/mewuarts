import '@babel/polyfill'
import { login } from './login'
import { logOut } from './login'
import {updateSettings} from './updateSettings'
import {updateTour} from './updateSettings'
import {newTour} from './updateSettings'
import {deleteEvent} from './updateSettings'
import {deleteClient} from './updateSettings'
import {deactivateSelf} from './updateSettings'
import {dropAReview} from './updateSettings'
import {deleteUserReview} from './updateSettings'
import {bookTour} from './stripe'
import {showAlert} from './alert'
import { signup } from './signup'

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const logOutBtn2 = document.querySelector('.nav__el--logout1');
const userDataForm = document.querySelector('.form-user-data');
const tourUpdateForm = document.querySelector('.form-tour-update');
const createTourForm = document.querySelector('.form-create-tour');
const deleteTour = document.getElementById('deleteTour');
const deleteUser = document.querySelectorAll('.usersb');
const deleteReview = document.querySelectorAll('.reviewsb');
const deleteSelf = document.querySelectorAll('.removeAccount');
const userPasswordForm = document.querySelector('.form-user-password');
const reviewForm = document.getElementById('formReview');
const bookBtn = document.getElementById('book-tour');
const carousel = document.querySelector('.carousel');

// DELEGATION

if(loginForm)loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password)
})

if (signupForm)
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name,email,password,passwordConfirm);
  });

if(logOutBtn)logOutBtn.addEventListener('click', logOut)
if(logOutBtn2)logOutBtn2.addEventListener('click', logOut)

// FOR UPDATING A USER
if (userDataForm) userDataForm.addEventListener('submit', function(e){
    e.preventDefault();
    const form = new FormData();
    form.append('name',document.getElementById('name').value)
    form.append('email',document.getElementById('email').value)
    form.append('photo',document.getElementById('photo').files[0])

    updateSettings(form, 'data')
})

// FOR REVIEW

if(reviewForm) reviewForm.addEventListener('submit', e =>{
	e.preventDefault();

    const review = document.getElementById('userReview').value
	const tour = document.getElementById('getTourId').getAttribute('title');

	dropAReview(review,tour)
})

// FOR CREATING NEW TOUR
if (createTourForm) createTourForm.addEventListener('submit', function(e){
    e.preventDefault();

	var create = document.getElementById('create');

	create.innerHTML = 'CREATING...<i style="width: 25px" class="fa fa-cog fa-spin"></i>'

    const form = new FormData();
    form.append('name',document.getElementById('tour-name').value)
	form.append('duration',document.getElementById('duration').value)
    form.append('startDates[0]',document.getElementById('start-date1').value)
	// form.append('startDates[1]',document.getElementById('start-date2').value)
	// form.append('startDates[2]',document.getElementById('start-date3').value)

	form.append('startLocation.description',document.getElementById('start-location1').value)
	form.append('startLocation.coordinates[0]',document.getElementById('start-location-co-ordinate1').value)
	form.append('startLocation.coordinates[1]',document.getElementById('start-location-co-ordinate2').value)

	// form.append('locations.description',document.getElementById('location1').value)
	// form.append('locations.coordinates[0]',document.getElementById('location1-cordinate1').value)
	// form.append('locations.coordinates[1]',document.getElementById('location1-cordinate2').value)

	// form.append('difficulty',document.getElementById('difficulty').value)
	// form.append('maxGroupSize',document.getElementById('max-group-size').value)
	form.append('price',document.getElementById('price').value)
    form.append('imageCover',document.getElementById('coverImage').files[0])
	form.append('images',document.getElementById('photo1').files[0])
	form.append('images',document.getElementById('photo2').files[0])
	form.append('images',document.getElementById('photo3').files[0])
	form.append('images',document.getElementById('photo4').files[0])
	form.append('images',document.getElementById('photo5').files[0])
	form.append('images',document.getElementById('photo6').files[0])
	// form.append('video',document.getElementById('videoa').files[0])
	form.append('description',document.getElementById('description').value)
	form.append('summary',document.getElementById('summary').value)

	// console.log(document.getElementById('videoa').files[0]);
	// console.log(document.getElementById('photo1').files[0]);
	
     newTour(form)
})

// FOR UPDATING TOUR
if (tourUpdateForm) tourUpdateForm.addEventListener('submit', function(e){
    e.preventDefault();

	var update = document.getElementById('update');

	update.innerHTML = 'UPDATING...<i style="width: 25px" class="fa fa-cog fa-spin"></i>'

    const form = new FormData();
    form.append('name',document.getElementById('tour-name').value)
	form.append('duration',document.getElementById('duration').value)
    form.append('startDates[0]',document.getElementById('start-date1').value)
	// form.append('startDates[1]',document.getElementById('start-date2').value)
	// form.append('startDates[2]',document.getElementById('start-date3').value)
	form.append('startLocation.description',document.getElementById('start-location1').value)
	// form.append('difficulty',document.getElementById('difficulty').value)
	// form.append('maxGroupSize',document.getElementById('max-group-size').value)
	form.append('price',document.getElementById('price').value)
    form.append('imageCover',document.getElementById('coverImage').files[0])
	form.append('images',document.getElementById('photo1').files[0])
	form.append('images',document.getElementById('photo2').files[0])
	form.append('images',document.getElementById('photo3').files[0])
	form.append('description',document.getElementById('description').value)
	form.append('summary',document.getElementById('summary').value)

	const Id = document.getElementById('id').getAttribute('title');
	
     updateTour(form, Id)
})

// FOR UPDATE PASSWORD
if (userPasswordForm) userPasswordForm.addEventListener('submit', e =>{

    e.preventDefault();

    document.querySelector('.button--save-password').innerHTML = 'UPDATING...'
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
     updateSettings({passwordCurrent,password,passwordConfirm},'password')

    document.querySelector('.button--save-password').innerHTML = 'Save Password'

    document.getElementById('password-current').value = ''
    document.getElementById('password').value = ''
    document.getElementById('password-confirm').value = ''
})

// FOR BOOKING
if(bookBtn){
    bookBtn.addEventListener('click', e => {
        e.target.textContent = 'processing...'
        const {tourId} = e.target.dataset;
        bookTour(tourId)
    })
}

const alertMessage = document.querySelector('body').dataset.alert;

if(alertMessage) showAlert('success', alertMessage, 20)

const nav = document.getElementsByClassName("bar")[0];
const show = document.getElementsByClassName("hidden")[0];
const review = document.getElementById("tourReview")
const formReview = document.getElementById("formReview")
const contain = document.getElementsByClassName("containment")[0]



$(document).ready(function () {
	$(nav).click(function () {
		$(show).toggleClass("activee");
	});

	$(contain).click(function () {
		$(show).removeClass("activee");
	});

	$(review).click(function(){
		$(formReview).slideToggle("slow");
	})


if(carousel)
	// for owl carousel
	$('.carousel').owlCarousel({
		loop: true,
		margin: 20,
		padding: 20,
		autoplayTimeOut: 2000,
		autoplayHoverPause: true,
		responsive:{
		  0:{
			items: 1,
			nav: false,
		  },
		  700:{
			items: 2,
			nav: false
		  },
		  1101:{
			items: 3,
			nav: false
		  },
		  1400:{
			items: 4,
			nav: false
		  }
		}
	  });
});

// FOR DELETE USER
if(deleteUser){
	deleteUser.forEach(item => {
		item.addEventListener('click', function(e){
			e.preventDefault();
			var question = prompt('You are about to delete a Users account, write yes to Go Ahead');
			var quest = question.toLowerCase();

			if(quest === 'yes'){
				var userId = item.getAttribute('title');
				deleteClient(userId)
			}else{
				alert('wrong input')
			}
		})
	})
} 

// FOR DELETE SELF
if(deleteSelf){
	deleteSelf.forEach(item => {
		item.addEventListener('click', function(e){
			e.preventDefault();
			var question = prompt('You are about to delete Your account, write yes to Go Ahead');
			var quest = question.toLowerCase();

			if(quest === 'yes'){
				deactivateSelf()
			}else{
				alert('wrong input')
			}
		})
	})
}

// FOR DELETE TOUR
if(deleteTour){
	var deleteButton = document.querySelectorAll('.delete');
	
	deleteButton.forEach(item=>{
		item.addEventListener('click', (e)=>{
			e.preventDefault();
			var question = prompt('You are about to delete this tour, write yes to go ahead');

			var quest = question.toLowerCase();

			if(quest === 'yes'){
				var tourId = item.getAttribute('title');
				deleteEvent(tourId);
			}else{
				alert('Wrong input');
			}
		})
	})

} 

// delete review

if(deleteReview){
	deleteReview.forEach(item => {
		item.addEventListener('click', function(e){
			e.preventDefault();
			var question = prompt('You are about to delete a Users review, write yes to Go Ahead');
			var quest = question.toLowerCase();

			if(quest === 'yes'){
				var reviewId = item.getAttribute('title');
				deleteUserReview(reviewId)
			}else{
				alert('wrong input')
			}
		})
	})
} 