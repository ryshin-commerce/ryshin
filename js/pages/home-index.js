﻿var tabs, imageCaptcha;

document.addEventListener("DOMContentLoaded",
    function () {
        init();
        loadSwipper();
        tabs = new TabPages();
        tabs.Init("[data-active-tab-number]");
        //tabs.Tabs[0].click();
        tabs.Tabs[tabs.SelectedTabNumber - 1].click();
        Site.BindingOnCroll();
    });

function init() {
    imageCaptcha = document.querySelector("[data-captcha-container] ._image-wrap");

    imageCaptcha.addEventListener("click", function (e) {
        reloadImage();
    });
}

function loadSwipper() {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
        },
        //autoplay: {
        //    delay: 4000,
        //    disableOnInteraction: false
        //},
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    var swipertech = new Swiper('.swiper-container-tech', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        }
    });
}

function clearform() {
    $('#frmContact')[0].reset();
}

function reloadImage() {
    var d = new Date();
    $("#img-captcha").attr("src", "/get-captcha-image?" + d.getTime());
}

function countUp() {
    $('[data-count]').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({ countNum: $this.text() }).animate({
            countNum: countTo
        },
        {

            duration: 3000,
            easing: 'linear',
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                $this.text(this.countNum);
                //alert('finished');
            }

        });
    });
}