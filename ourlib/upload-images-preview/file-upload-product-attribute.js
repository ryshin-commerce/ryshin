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
    this.Extend = function (hostCdn, arrayCurentFileNames, arrayCurentPreviewImages, classifications, classificationInfo, inputElement, curentImageBox, previewBoxEle, form, maxfile, inputChangeCallback, isCreateInputName, uniqueControlName, newControlName, defaultCompress, defaultIsAddLogo, defaultDisableProductFeed) {
        var self = this;
        this.DefaultCompress = defaultCompress || 75;
        this.DefaultIsAddLogo = defaultIsAddLogo || false;
        this.DefaultDisableProductFeed = defaultDisableProductFeed || false;
        this.InputElement = inputElement;
        this.PreviewBoxElement = previewBoxEle;
        this.CurentImageBox = curentImageBox;
        this.Classifications = classifications||[];
        this.ClassificationInfo = JSON.parse(classificationInfo);
        this.Form = form;
        this.UniqueControlName = uniqueControlName || "CurentFilePaths[]";
        this.NewImageObjectControlName = newControlName || "NewFilePaths[]";
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
            var complexData = this.CurentPreviewImages[i].split('>');
            var reviewf = complexData[0];
            var compressNumber = +complexData[1];
            var isAddLogo = (complexData[2]=="True");
            var isRemoveProductFeed = (complexData[3]=="True");
            var uniqueName = self.UniqueControlName.replace("INDEX", i);
            var fileName = f.substring(f.lastIndexOf('/') + 1);
            var productClassSelected = JSON.parse(this.Classifications[i]);

            var container = document.createElement("div");
            container.className = " col-3 gutter-10";

            var figure = document.createElement('figure');
            figure.className = " _p-item _max-height-200 relative hover-children-show text-yellow";

            var controlsContainer = document.createElement("div");
            controlsContainer.className = "absolute hide padding tablet-show -border width-100 height-100 _fill-silver-opacity ";
          
            
            var tick = (new Date()).getTime();
            
            var inputCompressNumber = "<div>Compress:" + compressNumber + "<br><input type='number' class='_hidden' data-unique-name=" + uniqueName +" name='" + uniqueName + ".CompressNumber' value='" + compressNumber + "'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input></div>";
            var removeProductFeed = "<div class='row'><input id='chk" + tick + "1' value='True' type='checkbox' class='' " + (isRemoveProductFeed ? "checked" : "") + " data-unique-name=" + uniqueName +" name='" + uniqueName + ".IsRemoveProductFeed'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label  class='inline-block width-auto  text-yellow' for='chk" + tick +"1'>Remove Product Feed</label></div>";
            var inputIsAddLogo = "<div class='row'><input value='True' disabled id='chk" + tick + "2' type='checkbox' class='' " + (isAddLogo ? "checked" : "") + " data-unique-name=" + uniqueName +" name='" + uniqueName + ".IsAddLogo'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label class='inline-block width-auto text-yellow' for='chk" + tick + "2'>Add Logo</label></div>";
            var hiddenFileName = "<input class='_hidden' type='text' class='' " + " data-unique-name=" + uniqueName +" name='" + uniqueName + ".FileName' value='" + fileName + "' " + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input>";
             
            //Classification
            var checkClasses = "";
            if (this.ClassificationInfo.length === 1) {
                checkClasses = "<div class='_hidden'><input id='chk" + i + this.ClassificationInfo[0].value + "' value='" + this.ClassificationInfo[0].value + "' type='checkbox' class='' checked data-unique-name=" + uniqueName +" name='" + uniqueName + ".Classifications[]'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label  class='inline-block width-auto  text-yellow' for='chk" + i+ this.ClassificationInfo[0].value + "'>" + this.ClassificationInfo[0].text + "</label></div>";
            }
            else {
                for (var j = 0; j < this.ClassificationInfo.length; j++) {
                    var checked = "";

                    if (productClassSelected.indexOf(this.ClassificationInfo[j].value) >= 0) {
                        checked = "checked";
                    }

                    var checkClass = "<div class='col-6 overflow-hidden'><input id='chk" + i + this.ClassificationInfo[j].value + "' value='" + this.ClassificationInfo[j].value + "' type='checkbox' class='' " + checked + " data-unique-name=" + uniqueName +" name='" + uniqueName + ".Classifications[]'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label  class='inline-block width-auto  text-yellow' for='chk" + i + this.ClassificationInfo[j].value + "'>" + this.ClassificationInfo[j].text + "</label></div>";
                    checkClasses += checkClass;
                }
            }
            

            controlsContainer.innerHTML = inputCompressNumber + removeProductFeed + inputIsAddLogo + hiddenFileName +"<hr/>" + checkClasses;

            //
            var btn = document.createElement('button');

            btn.className = "btn text-strong  margin-top _idClickRemove";
            btn.innerText = "CLICK ĐỂ XÓA";
            btn.type = "button";
            btn.dataset.file = f;
            btn.dataset.notClose = "I";

            btn.addEventListener("click", function (evt) {
                //var parentContainer = Site.FindParent(evt.target, '_p-item');
                //parentContainer.remove();
                self.RemoveCurentFile(evt, self.InputElement);
            });

            controlsContainer.append(btn);

           

           
            var figureHtml = "<div data-image-show><img class='_max-width-100-percent' src='" + self.HostCdn + reviewf + "' alt='" + fileName + "' data-file='" + fileName + "' /><figcaption class='padding-5 text-center _text-ellipsis'>" + fileName + "</figcaption></div>";

            if (self.IsCreateInputName) {
                var input = "<input type='text' class='_hidden' " + " data-unique-name=" + uniqueName +" name='" + uniqueName + ".ImageUrl' value=" + f + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input>";
                figureHtml += input;
            }
            figureHtml = "<div data-image-show>" + figureHtml +"</div>";

            figure.innerHTML = figureHtml;
            figure.insertBefore(controlsContainer, figure.childNodes[0]);
            //
            //
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

        for (var index = 0; index < filesArr.length; index++) {
            var f = filesArr[index];
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
                reader.IndexFile = index;
                reader.FileName = f.name;
                reader.onload = function(e,index) {
                    var orderNumber = 12345678;
                    var compressNumber = self.DefaultCompress;
                    var isAddLogo = self.DefaultIsAddLogo;
                    var isRemoveProductFeed = self.DefaultDisableProductFeed;
                   
                    var uniqueName = self.NewImageObjectControlName.replace("INDEX", e.currentTarget.IndexFile);

                    var container = document.createElement("div");
                    container.className = " col-3 gutter-10";

                    var figure = document.createElement('figure');
                    figure.className = " _p-item _max-height-200 relative hover-children-show";

                    var controlsContainer = document.createElement("div");
                    controlsContainer.className =
                        "absolute hide padding tablet-show -border width-100 height-100 _fill-silver-opacity ";

                    var tick = (new Date()).getTime();
                    
                    var inputCompressNumber = "<div>Index<input type='number' class='s  margin-left _max-width-100' name='" + uniqueName + ".CompressNumber' value='" + compressNumber + "'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input></div>";
                    var removeProductFeed = "<div class='row'><input  value='True' id='chk" + tick + "1' type='checkbox' class='' " + (isRemoveProductFeed ? "checked" : "") + " name='" + uniqueName + ".IsRemoveProductFeed'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label  class='inline-block width-auto' for='chk" + tick + "1'>Remove Product Feed</label></div>";
                    var inputIsAddLogo = "<div class='row'><input  value='True'   id='chk" + tick + "2' type='checkbox' class='' " + (isAddLogo ? "checked" : "") + " name='" + uniqueName + ".IsAddLogo'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label class='inline-block width-auto' for='chk" + tick + "2'>Add Logo</label></div>";
                    var hiddenFileName = "<input class='_hidden' type='text' class='' " + (isAddLogo ? "checked" : "") + " name='" + uniqueName + ".FileName' value='" + e.currentTarget.FileName+"' " + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input>";
                  
                    //Classification
                    var checkClasses = "";
                    if (self.ClassificationInfo.length === 1) {
                        checkClasses = "<div class='_hidden'><input id='chkx" +  self.ClassificationInfo[0].value + "' value='" + self.ClassificationInfo[0].value + "' type='checkbox' class='' checked data-unique-name=" + uniqueName + " name='" + uniqueName + ".Classifications[]'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label  class='inline-block width-auto  text-yellow' for='chkx" +  self.ClassificationInfo[0].value + "'>" + self.ClassificationInfo[0].text + "</label></div>";
                    }
                    else {
                        for (var j = 0; j < self.ClassificationInfo.length; j++) {
                            var checkClass = "<div class='col-6 overflow-hidden'><input id='chkx" +  self.ClassificationInfo[j].value + "' value='" + self.ClassificationInfo[j].value + "' type='checkbox' class='' data-unique-name=" + uniqueName + " name='" + uniqueName + ".Classifications[]'" + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input><label  class='inline-block width-auto  text-yellow' for='chkx" +  self.ClassificationInfo[j].value + "'>" + self.ClassificationInfo[j].text + "</label></div>";
                            checkClasses += checkClass;
                        }
                    }

                    controlsContainer.innerHTML = inputCompressNumber + removeProductFeed + inputIsAddLogo + hiddenFileName +"<hr/>"+ checkClasses;



                    var btn = document.createElement('button');
                    btn.className = "btn text-strong  margin-top _idClickRemove";
                    btn.innerText = "CLICK ĐỂ XÓA";
                    btn.type = "button";
                    btn.dataset.file = e.currentTarget.FileName;
                    btn.dataset.notClose = "I";

                    btn.addEventListener("click",
                        function(evt) {
                            //var parentContainer = Site.FindParent(evt.target, '_p-item');
                            //parentContainer.remove();
                            self.RemoveFile(evt, self.InputElement);
                        });
                    controlsContainer.append(btn);
                   

                    var figureHtml = "<img class='width-100 _max-width-100-percent' src='" + e.target.result + "' alt='" + f.name + "' data-file='" + f.name + "' /><figcaption class='padding-5 text-center _text-ellipsis'>" + "(" + f.size % 1000 + " kb) " + f.name + "</figcaption>";


                    if (self.IsCreateInputName) {
                        var input = "<input type='text' class='_hidden' name='NewFiles" + self.UniqueControlName + "[]' value=" + f.name + (!!self.Form ? " form='" + self.Form.id + "'" : "") + "></input>";
                        figureHtml += input;
                    }

                    figure.innerHTML = figureHtml;
                    figure.insertBefore(controlsContainer, figure.childNodes[0]);

                    //
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
        };

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
        var imgUrl = parentContainer.querySelector('[data-image-show]');
        imgUrl.remove();
    };
    this.RemoveFile = function (evt, fuploadElement) {
        this.StoredFiles = [];
        //var file = evt.target.dataset.file;

        //for (var i = 0; i < this.StoredFiles.length; i++) {
        //    if (this.StoredFiles[i].name === file) {
        //        this.StoredFiles.splice(i, 1);
        //        break;
        //    }
        //}
        this.PreviewBoxElement.innerHTML = "";
        //var parentContainer = Site.FindParent(evt.target, '_p-item');
        //parentContainer.remove();

        //debugger;
        //this.InputElement.addEventListener("change", this.InputChange);
        Site.ClearInputFile(fuploadElement);
    };
    // init
    this.Init = function (hostCdn, arrayCurentFileNames, arrayCurentPreviewImages, classifications,classificationInfo, inputSelector, curentImageBoxSelector, previewBoxSelector, formSelector, maxFileCount, inputChangeCallback, isCreateInputName, uniqueControlName, newControlName, defaultCompress, defaultIsAddLogo, defaultDisableProductFeed) {

        var inputEle = document.querySelector(inputSelector);
        var previewBox = document.querySelector(previewBoxSelector);
        var curentImageBox = document.querySelector(curentImageBoxSelector);
        var form = document.querySelector(formSelector);

        if (inputEle == null || previewBox == null) {
            console.warn(inputSelector + " or " + previewBox + ": NULL");
        }

        this.Extend(hostCdn, arrayCurentFileNames, arrayCurentPreviewImages, classifications, classificationInfo, inputEle, curentImageBox, previewBox, form, maxFileCount, inputChangeCallback, isCreateInputName, uniqueControlName, newControlName, defaultCompress, defaultIsAddLogo == "true" || defaultIsAddLogo == "True", defaultDisableProductFeed == "true" || defaultDisableProductFeed == "True");
    };
};