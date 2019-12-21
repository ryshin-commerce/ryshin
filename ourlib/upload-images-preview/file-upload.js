"use strict";

/* * * * * * * * * * * * * * * * *
 * LocalStorageHelper
 * javascript page navigation
 * * * * * * * * * * * * * * * * */
function FileUpload() {
    this.InputElement = null;
    this.PreviewBoxElement = null;
    this.CurentImageBox = null;
    this.Form = null;
    this.MaxFile = null;
    this.StoredFiles = [];
    this.CurentFiles = [];
    this.CurentPreviewImages = [];
    this.Extend = function (hostCdn, arrayCurentFileNames, arrayCurentPreviewImages, inputElement, curentImageBox, previewBoxEle, form, maxfile, inputChangeCallback, isCreateInputName, uniqueControlName) {
        var self = this;
        this.InputElement = inputElement;
        this.PreviewBoxElement = previewBoxEle;
        this.CurentImageBox = curentImageBox;
        this.Form = form;
        this.UniqueControlName = uniqueControlName || "CurentFilePaths[]";
        this.MaxFile = maxfile || 2;
        this.InputChangeCallBack = inputChangeCallback !== undefined ? inputChangeCallback : null;
        this.InputElement.addEventListener("change", this.InputChange);
        this.InputElement.fileUpload = this;
        this.FileReader = new FileReader();
        this.IsCreateInputName = isCreateInputName || false;
        this.HostCdn = hostCdn || "";
        this.CurentFiles = arrayCurentFileNames || [];
        this.CurentPreviewImages = arrayCurentPreviewImages || [];
        this.Process();
    };

    this.Process = function () {
        if (!this.CurentImageBox) {
            return;
        }
        var self = this;

        for (let i = 0; i < this.CurentFiles.length; i++) {
            var f = this.CurentFiles[i];
            var reviewf = this.CurentPreviewImages[i];
            var container = document.createElement("div");
            container.className = "col-3 gutter-10 _p-item";

            var figure = document.createElement('figure');
            figure.className = "_max-height-200 relative hover-children-show";
            var btn = document.createElement('button');

            btn.className = "absolute hide tablet-show -border width-100 height-100 _fill-silver-opacity text-strong";
            btn.innerText = "CLICK ĐỂ XÓA";
            btn.type = "button";
            btn.dataset.file = f;
            btn.dataset.notClose = "I";

            btn.addEventListener("click", function (evt) {
                //var parentContainer = Site.FindParent(evt.target, '_p-item');
                //parentContainer.remove();
                self.RemoveCurentFile(evt, self.InputElement);
            });

            var fileName = f.substring(f.lastIndexOf('/') + 1);
            var figureHtml = "<img class='_max-width-100-percent' onerror='this.src=\"/images/shared/no-image.svg\"' src='" + self.HostCdn + reviewf + "' alt='" + fileName + "' data-file='" + fileName + "' /><figcaption class='padding-5 text-center _text-ellipsis'>" + fileName + "</figcaption>";

            if (self.IsCreateInputName) {
                var input = "<input type='text' class='_hidden' name='" + self.UniqueControlName + "' value=" + f + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input>";
                figureHtml += input;
            }

            figure.innerHTML = figureHtml;
            figure.insertBefore(btn, figure.childNodes[0]);
            container.appendChild(figure);
            self.CurentImageBox.appendChild(container);
        }
    };
    this.InputChange = function (evt) {
        var self = evt.target.fileUpload;
        var files = evt.target.files;
        var filesArr = Array.prototype.slice.call(files);
        self.PreviewBoxElement.innerHTML = "";
        self.StoredFiles = [];

        filesArr.forEach(function (f) {
            if (!f.type.match("image.*")) {
                return;
            }

            self.StoredFiles.push(f);

            if (self.PreviewBoxElement === self.CurentImageBox) {
                self.CurentFiles = [];
                self.CurentImageBox.innerHTML = "";
            }

            if (self.StoredFiles.length + self.CurentFiles.length <= self.MaxFile) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var container = document.createElement("div");
                    container.className = "gutter-10 _p-item";

                    var figure = document.createElement('figure');
                    figure.className = "_max-height-200 relative hover-children-show";

                    var btn = document.createElement('button');
                    btn.className = "absolute hide -border width-100 height-100 _fill-silver-opacity text-strong";
                    btn.type = "button";
                    btn.innerText = "CLICK ĐỂ XÓA";
                    btn.dataset.file = f.name;
                    btn.dataset.notClose = "I";

                    btn.addEventListener("click", function (evt) {
                        //var parentContainer = Site.FindParent(evt.target, '_p-item');
                        //parentContainer.remove();
                        self.RemoveFile(evt, self.InputElement);
                    });

                    var figureHtml = "<img class='width-100 _max-width-100-percent' src='" + e.target.result + "' alt='" + f.name + "' data-file='" + f.name + "' /><figcaption class='padding-5 text-center _text-ellipsis'>" + "(" + f.size % 1000 + " kb) " + f.name + "</figcaption>";

                    if (self.IsCreateInputName) {
                        var input = "<input type='text' class='_hidden' name='NewFiles" + self.UniqueControlName + "[]' value=" + f.name + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input>";
                        figureHtml += input;
                    }

                    figure.innerHTML = figureHtml;
                    figure.insertBefore(btn, figure.childNodes[0]);
                    container.appendChild(figure);
                    self.PreviewBoxElement.appendChild(container);
                };

                reader.readAsDataURL(f);
            }

            //var btnRemoves = document.getElementsByClassName("_btnRemoveImage");

            //for (var i = 0; i < btnRemoves.length; i++) {
            //    btnRemoves[i].addEventListener("click", function (evt) {
            //        var parentContainer = Site.FindParent(evt.target, '_p-item');
            //        parentContainer.remove();
            //    });
            //}
        });

        if (!!self.InputChangeCallBack) {
            self.InputChangeCallBack(self.StoredFiles);
        }
    };
    this.RemoveCurentFile = function (evt) {
        var file = evt.target.dataset.file;
        for (var i = 0; i < this.CurentFiles.length; i++) {
            if (this.CurentFiles[i] === file) {
                this.CurentFiles.splice(i, 1);
                break;
            }
        }
        var parentContainer = Site.FindParent(evt.target, '_p-item');
        parentContainer.remove();
    };
    this.RemoveFile = function (evt, fuploadElement) {
        var file = evt.target.dataset.file;

        for (var i = 0; i < this.StoredFiles.length; i++) {
            if (this.StoredFiles[i].name === file) {
                this.StoredFiles.splice(i, 1);
                break;
            }
        }
        var parentContainer = Site.FindParent(evt.target, '_p-item');
        parentContainer.remove();

        //debugger;
        //this.InputElement.addEventListener("change", this.InputChange);
        Site.ClearInputFile(fuploadElement);
    };
    // init
    this.Init = function (hostCdn, arrayCurentFileNames,arrayCurentPreviewImages, inputSelector, curentImageBoxSelector, previewBoxSelector, formSelector, maxFileCount, inputChangeCallback, isCreateInputName, uniqueControlName) {

        var inputEle = document.querySelector(inputSelector);
        var previewBox = document.querySelector(previewBoxSelector);
        var curentImageBox = document.querySelector(curentImageBoxSelector);
        var form = document.querySelector(formSelector);

        if (inputEle == null || previewBox == null) {
            console.warn(inputSelector + " or " + previewBox + ": NULL");
        }

        this.Extend(hostCdn, arrayCurentFileNames, arrayCurentPreviewImages, inputEle, curentImageBox, previewBox, form, maxFileCount, inputChangeCallback, isCreateInputName, uniqueControlName);
    };
};