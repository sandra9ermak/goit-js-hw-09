import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const timerForm = document.querySelector('.field');
let selectedDate = new Date();
let nowDate = new Date();
let timer = null;
let convertDateMs = null;
startBtn.setAttribute('disabled', true);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < nowDate) {
      Notiflix.Notify.warning("Please choose a date in the future");
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};
flatpickr(input, options);

const addLeadingZero = (value =>  value.toString().padStart(2, '0'));

startBtn.addEventListener('click', e => {
  timer = setInterval(() => {
    let currentDate = new Date();
    if (selectedDate > currentDate) {
      const resultDate = selectedDate - currentDate;
      convertDateMs = convertMs(resultDate);
      days.textContent = addLeadingZero(convertDateMs.days);
      hours.textContent = addLeadingZero(convertDateMs.hours);
      minutes.textContent = addLeadingZero(convertDateMs.minutes);
      seconds.textContent = addLeadingZero(convertDateMs.seconds);
    } else if (selectedDate < currentDate){
      clearInterval(timer);
      Notiflix.Notify.failure('Time is up!');
    } else {
      clearInterval(timer);
    }
  }, 1000);
});

const stopBtn = document.querySelector('[data-stop]');

stopBtn.addEventListener('click', event => {
  clearInterval(timer);
})