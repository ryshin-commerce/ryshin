"use strict";


document.addEventListener("DOMContentLoaded",
    function () {
        loadStickMenuOnScroll();
    });

function loadStickMenuOnScroll() {
    var navbar = document.querySelector(".navbar");
    var row1 = document.querySelector("[data-row-1]");

    if (!!navbar) {
        window.onscroll = function () {
            if (window.scrollY > row1.offsetHeight) {
                navbar.classList.add("_z-stick");
            } else {
                navbar.classList.remove("_z-stick");
            }

        };
    }
}