'use strict'


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

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
                iconUrl: "./img/success-icon.svg",
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
                iconUrl: "./img/error-icon.svg",
                messageColor: "#ffffff",
                backgroundColor: "#EF4040",
                progressBarColor: "#B51B1B"
            });
        })
});