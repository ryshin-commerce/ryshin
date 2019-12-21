﻿"use strict";
var imageCaptcha;

document.addEventListener("DOMContentLoaded",
    function () {
        init();
    });

function init() {
    imageCaptcha = document.querySelector("[data-captcha-container] ._image-wrap");

    imageCaptcha.addEventListener("click", function(e) {
        reloadImage();
    });
}

function clearform() {
    $('#frmContact')[0].reset();
}

function reloadImage() {
    var d = new Date();
    $("#img-captcha").attr("src", "/get-captcha-image?" + d.getTime());
}

function initMap() {
    var myLatLng = { lat: 10.842345, lng: 106.629153 };
  
    // Create a map object and specify the DOM element
    // for display.
    var map = new google.maps.Map(document.getElementById('mapContainer'), {
        center: { lat: 10.846506, lng: 106.636714 },
        zoom: 15,
        disableDefaultUI: true
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
    });
}