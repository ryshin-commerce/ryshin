"use strict";

var countDownInterval, imageCaptcha;

document.addEventListener("DOMContentLoaded",
    function () {
        init();
    });

function init() {
    imageCaptcha = document.querySelector("[data-capcha]");

    imageCaptcha.addEventListener("click", function (e) {
        var d = new Date();
        document.querySelector("#img-captcha").src= "/get-captcha-image?" + d.getTime();
    });
}

function createAcountSuccess() {
    Site.AddClass("[data-content]", "hide");
    Site.RemoveClass("[data-thankyou]", "hide");
    intCountDown();
}

function intCountDown() {
    var countNumber = 3;
    var clock = $('._idCountDown').FlipClock(countNumber, {
        clockFace: 'Counter'
    });

    setTimeout(function () {
        countDownInterval = setInterval(function () {
            clock.decrement();
            if (clock.time.time === 0) {
                clearInterval(countDownInterval);
                window.location = window.location.origin;
            }

        }, 1000);
    });
}