var selectTheme;

document.addEventListener("DOMContentLoaded",
    function () {
        init();
        Site.BindingSelectAutoSubmit();
        selectTheme.dispatchEvent(new Site.CreateEvent("change"));
    });

function init() {
    selectTheme = document.getElementById("selectTheme");
}