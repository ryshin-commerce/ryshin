﻿"use strict";
var tabs;

document.addEventListener("DOMContentLoaded",
    function () {
        init();
        tabs = new TabPages();
        tabs.Init("[data-active-tab-number]");
        tabs.Tabs[tabs.SelectedTabNumber - 1].click();
    });

function init() {
    
}
