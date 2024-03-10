'use strict'

// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
const startButton = document.querySelector("[data-start]");
const inputDate = document.querySelector("#datetime-picker");
const dataDaysSpan = document.querySelector("[data-days]");
const dataHoursSpan = document.querySelector("[data-hours]");
const dataMinutesSpan = document.querySelector("[data-minutes]");
const dataSecondsSpan = document.querySelector("[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        if (currentDate < selectedDates[0]) {
            userSelectedDate = selectedDates[0];
            startButton.removeAttribute("disabled");
        } else {
            startButton.setAttribute("disabled", true);
            iziToast.show({
                close: true,
                title: 'Error',
                titleColor: "#ffffff",
                message: 'Please choose a date in the future',
                color: "red",
                position: 'topRight',
                iconUrl: "./img/error-icon.svg",
                messageColor: "#ffffff",
                backgroundColor: "#EF4040",
                progressBarColor: "#B51B1B"
            });
        }
    },
};

flatpickr(inputDate, options);

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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

startButton.addEventListener("click", (event) => {
    startButton.setAttribute("disabled", true);
    inputDate.setAttribute("disabled", true);
    const interval = setInterval(() => {
        const currentDate = new Date();
        const remainTime = userSelectedDate - currentDate;
        if (remainTime < 0) {
            clearInterval(interval);

            startButton.removeAttribute("disabled");
            inputDate.removeAttribute("disabled");
            return;
        }

        const remainTimeObject = convertMs(remainTime);

        dataDaysSpan.innerHTML = addLeadingZero(remainTimeObject.days);
        dataHoursSpan.innerHTML = addLeadingZero(remainTimeObject.hours);
        dataMinutesSpan.innerHTML = addLeadingZero(remainTimeObject.minutes);
        dataSecondsSpan.innerHTML = addLeadingZero(remainTimeObject.seconds);
    }, 1000);
})
