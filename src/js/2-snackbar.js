'use strict'


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import errorIcon from "/img/error-icon.svg";
import successIcon from "/img/success-icon.svg";

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`Fulfilled promise in ${delay}ms`);
            }
            if (state === 'rejected') {
                reject(`Rejected promise in ${delay}ms`);
            }
            reject("Unknown error");
        }, delay);
    });

    promise
        .then((value) => {
            iziToast.show({
                close: true,
                title: 'OK',
                titleColor: "#ffffff",
                message: value,
                position: 'topRight',
                iconUrl: successIcon,
                messageColor: "#ffffff",
                backgroundColor: "#59A10D",
                progressBarColor: "#326101"
            });
        })
        .catch((error) => {
            iziToast.show({
                close: true,
                title: 'Error',
                titleColor: "#ffffff",
                message: error,
                position: 'topRight',
                iconUrl: errorIcon,
                messageColor: "#ffffff",
                backgroundColor: "#EF4040",
                progressBarColor: "#B51B1B"
            });
        })
});