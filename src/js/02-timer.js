import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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
    console.log(selectedDates[0]);
  },
};

const dateSelector = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dateNow = new Date();
const dateInput = new Date(dateSelector.value);
flatpickr(dateSelector, options);

//const getNowDate = dateNow.getDay + ' '

startBtn.addEventListener('click', event => {
    // if (dateSelector.value - dateNow.value === 0) {
    //     window.alert('ok');
    //     //startBtn.removeAttribute('disabled');
    // }
    // if (dateSelector.value < dateNow.getDay()) {
    //     console.log('oj');
    //     window.alert("Please choose a date in the future");
    //     //startBtn.setAttribute('disabled', 'true');
    // }

    //console.log(convertMs(dateNow) - dateSelector.value);
    const getNowTime = dateNow.getTime();
    //const getInputTime = dateSelector.getTime();
    //console.log(dateSelector.value);
    //console.log(dateSelector.value.getTime());
    console.log();
});
