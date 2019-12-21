"use strict";

var fileLogoUrl, fileLogo2Url, fileUploadFaviconFileUpload, fileUploadWartermarkImage, fileUploadWartermarkImageEcomerce;
var fileUploadLogo, fileUploadLogo2, fileUploadFavicon, fileWartermarkImage, fileWartermarkImageEcommerce;
var tabs,  txtStaticPage, addNewButtoncontainer, frmUpdateStaticPage;

document.addEventListener("DOMContentLoaded",
    function () {
        InitConfigIndex();
        innitFileUpload();
        InitCleaves();
        tabs = new TabPages();
        tabs.Init("[data-active-tab-number]");
        tabs.Tabs[tabs.SelectedTabNumber - 1].click();
        reloadOrder();
        Site.BindingSelectAutoSubmit();
    });

function InitConfigIndex() {
    fileLogoUrl = document.getElementById("fileLogoUrl");
    fileLogo2Url = document.getElementById("fileLogo2Url");
    fileUploadFavicon = document.getElementById("fileUploadFaviconImage");
    fileWartermarkImage = document.getElementById("fileWartermarkImage");
    fileWartermarkImageEcommerce = document.getElementById("fileUploadWartermarkImageEcommerce");
    txtStaticPage = document.getElementById("txtNewStaticPage");
    addNewButtoncontainer = document.getElementById("addNewButtoncontainer");
    frmUpdateStaticPage = document.getElementById("frmUpdateStaticPage");
}

function InitCleaves() {
    new Cleave('#ConfigJsonValuesModel_OpensHouse', {
        time: true,
        timePattern: ['h', 'm']
    });
    new Cleave('#ConfigJsonValuesModel_ClosesHouse', {
        time: true,
        timePattern: ['h', 'm']
    });
}

function innitFileUpload() {
    if (fileLogoUrl !== null) {
        const curentPathFiles0 = !!fileLogoUrl.dataset.curentPathFiles && fileLogoUrl.dataset.curentPathFiles !== ""
            ? [fileLogoUrl.dataset.curentPathFiles]
            : null;

        const curentReviewFiles0 =
            !!fileLogoUrl.dataset.curentShowingImages && fileLogoUrl.dataset.curentShowingImages !== ""
                ? [fileLogoUrl.dataset.curentShowingImages]
                : null;

        fileUploadLogo = new FileUpload();
        fileUploadLogo.Init(null,
            curentPathFiles0,
            curentReviewFiles0,
            "#" + fileLogoUrl.id,
            "#curentFileReview",
            "#curentFileReview",
            "#frmLogo",
            1,
            console.log("change"),
            true,
            "curentLogoUrl");
    }

    if (fileLogo2Url !== null) {
        const curentPathFiles2 = !!fileLogo2Url.dataset.curentPathFiles && fileLogo2Url.dataset.curentPathFiles !== ""
            ? [fileLogo2Url.dataset.curentPathFiles]
            : null;

        const curentReviewFiles2 =
            !!fileLogo2Url.dataset.curentShowingImages && fileLogo2Url.dataset.curentShowingImages !== ""
                ? [fileLogo2Url.dataset.curentShowingImages]
                : null;

        fileUploadLogo2 = new FileUpload();
        fileUploadLogo2.Init(null,
            curentPathFiles2,
            curentReviewFiles2,
            "#" + fileLogo2Url.id,
            "#curentFileReview2",
            "#curentFileReview2",
            "#frmLogo2",
            1,
            console.log("change"),
            true,
            "curentLogo2Url");
    }
  
    ////////
    if (fileUploadFavicon !== null) {
        const curentPathFiles1 = !!fileUploadFavicon.dataset.curentPathFiles && fileUploadFavicon.dataset.curentPathFiles !== ""
            ? [fileUploadFavicon.dataset.curentPathFiles]
            : null;

        const curentReviewFiles1 =
            !!fileUploadFavicon.dataset.curentShowingImages && fileUploadFavicon.dataset.curentShowingImages !== ""
                ? [fileUploadFavicon.dataset.curentShowingImages]
                : null;

        fileUploadFaviconFileUpload = new FileUpload();
        fileUploadFaviconFileUpload.Init(null,
            curentPathFiles1,
            curentReviewFiles1,
            "#" + fileUploadFavicon.id,
            "#curentFileReview1",
            "#curentFileReview1",
            "#frmFavicon",
            1,
            console.log("change"),
            true,
            "curentUrl");
    }
    
    ////////
    if (fileWartermarkImage !== null) {
        const curentPathFiles2 = !!fileWartermarkImage.dataset.curentPathFiles && fileWartermarkImage.dataset.curentPathFiles !== ""
            ? [fileWartermarkImage.dataset.curentPathFiles]
            : null;

        const curentReviewFiles2 =
            !!fileWartermarkImage.dataset.curentShowingImages && fileWartermarkImage.dataset.curentShowingImages !== ""
                ? [fileWartermarkImage.dataset.curentShowingImages]
                : null;

        fileUploadWartermarkImage = new FileUpload();
        fileUploadWartermarkImage.Init(null,
            curentPathFiles2,
            curentReviewFiles2,
            "#" + fileWartermarkImage.id,
            "#newFileReview2",
            "#newFileReview2",
            "#frmWartermark",
            1,
            console.log("change"),
            true,
            "curentUrl");
    }

    ////////
    debugger;
    if (fileWartermarkImageEcommerce !== null) {
        const curentPathFilesEcomerce = !!fileWartermarkImageEcommerce.dataset.curentPathFiles && fileWartermarkImageEcommerce.dataset.curentPathFiles !== ""
            ? [fileWartermarkImageEcommerce.dataset.curentPathFiles]
            : null;

        const curentReviewFilesEcomerce =
            !!fileWartermarkImageEcommerce.dataset.curentShowingImages && fileWartermarkImageEcommerce.dataset.curentShowingImages !== ""
                ? [fileWartermarkImageEcommerce.dataset.curentShowingImages]
                : null;

        fileUploadWartermarkImageEcomerce = new FileUpload();
        fileUploadWartermarkImageEcomerce.Init(null,
            curentPathFilesEcomerce,
            curentReviewFilesEcomerce,
            "#" + fileWartermarkImageEcommerce.id,
            "#newFileReviewEcomerce",
            "#newFileReviewEcomerce",
            "#frmWartermark2",
            1,
            console.log("change"),
            true,
            "curentUrl");
    }
}

function addStaticPages() {
    var staticPage = document.getElementById("txtNewStaticPage");

    var newRow = document.createElement('div');
    newRow.className = "row gutter-10  -padding-bottom -tablet-gutter-h";
    newRow.innerHTML = "<input data-page name='StaticPages[]' value='/" + staticPage.value+"' />";
    frmUpdateStaticPage.insertBefore(newRow, addNewButtoncontainer);
    reloadOrder();
}

function reloadOrder() {
    const lis = document.querySelectorAll("[data-page]");

    for (let i = 0; i < lis.length; i++) {
        lis[i].name = "StaticPages[" + i + "]";
    }
}