"use strict";var imageCaptcha;function init(){(imageCaptcha=document.querySelector("[data-captcha-container] ._image-wrap")).addEventListener("click",function(t){reloadImage()})}function clearform(){$("#frmContact")[0].reset()}function reloadImage(){var t=new Date;$("#img-captcha").attr("src","/get-captcha-image?"+t.getTime())}function initMap(){var t=new google.maps.Map(document.getElementById("mapContainer"),{center:{lat:10.846506,lng:106.636714},zoom:15,disableDefaultUI:!0});new google.maps.Marker({map:t,position:{lat:10.842345,lng:106.629153},title:"Hello World!"})}!function(c){var i="unobtrusiveAjaxClick",o="unobtrusiveAjaxClickTarget";function d(t,a){for(var e=window,n=(t||"").split(".");e&&n.length;)e=e[n.shift()];return"function"==typeof e?e:(a.push(t),Function.constructor.apply(null,a))}function s(t){return"GET"===t||"POST"===t}function u(o,t){var a,r,i,u;if(!(a=o.getAttribute("data-ajax-confirm"))||window.confirm(a)){r=c(o.getAttribute("data-ajax-loading")),u=parseInt(o.getAttribute("data-ajax-loading-duration"),10)||0,c.extend(t,{type:o.getAttribute("data-ajax-method")||void 0,url:o.getAttribute("data-ajax-url")||void 0,cache:"true"===(o.getAttribute("data-ajax-cache")||"").toLowerCase(),beforeSend:function(t){var a,e,n;return e=t,s(n=i)||e.setRequestHeader("X-HTTP-Method-Override",n),!1!==(a=d(o.getAttribute("data-ajax-begin"),["xhr"]).apply(o,arguments))&&r.show(u),a},complete:function(){r.hide(u),d(o.getAttribute("data-ajax-complete"),["xhr","status"]).apply(o,arguments)},success:function(t,a,e){var n,r,i;n=o,r=t,-1===(e.getResponseHeader("Content-Type")||"text/html").indexOf("application/x-javascript")&&(i=(n.getAttribute("data-ajax-mode")||"").toUpperCase(),c(n.getAttribute("data-ajax-update")).each(function(t,a){switch(i){case"BEFORE":c(a).prepend(r);break;case"AFTER":c(a).append(r);break;case"REPLACE-WITH":c(a).replaceWith(r);break;default:c(a).html(r)}})),d(o.getAttribute("data-ajax-success"),["data","status","xhr"]).apply(o,arguments)},error:function(){d(o.getAttribute("data-ajax-failure"),["xhr","status","error"]).apply(o,arguments)}}),t.data.push({name:"X-Requested-With",value:"XMLHttpRequest"}),i=t.type.toUpperCase(),t.data instanceof FormData?(t.processData=!1,t.contentType=!1,t.data.append("X-Requested-With","XMLHttpRequest"),s(i)||(t.type="POST",t.data.append("X-HTTP-Method-Override",i))):(t.data.push({name:"X-Requested-With",value:"XMLHttpRequest"}),s(i)||(t.type="POST",t.data.push({name:"X-HTTP-Method-Override",value:i})));var e=c(o);if(e.is("form")&&"multipart/form-data"==e.attr("enctype")){var n=new FormData;c.each(t.data,function(t,a){n.append(a.name,a.value)}),c("input[type=file]",e).each(function(){var e=this;c.each(e.files,function(t,a){n.append(e.name,a)})}),c.extend(t,{processData:!1,contentType:!1,data:n})}c.ajax(t)}}c(document).on("click","a[data-ajax=true]",function(t){t.preventDefault(),u(this,{url:this.href,type:"GET",data:[]})}),c(document).on("click","form[data-ajax=true] input[type=image]",function(t){var a=t.target.name,e=c(t.target),n=c(e.parents("form")[0]),r=e.offset();n.data(i,[{name:a+".x",value:Math.round(t.pageX-r.left)},{name:a+".y",value:Math.round(t.pageY-r.top)}]),setTimeout(function(){n.removeData(i)},0)}),c(document).on("click","form[data-ajax=true] :submit",function(t){var a=t.currentTarget.name,e=c(t.target),n=c(e.parents("form")[0]);n.data(i,a?[{name:a,value:t.currentTarget.value}]:[]),n.data(o,e),setTimeout(function(){n.removeData(i),n.removeData(o)},0)}),c(document).on("submit","form[data-ajax=true]",function(t){var a,e=c(this).data(i)||[],n=c(this).data(o),r=n&&n.hasClass("cancel");(t.preventDefault(),r||(!(a=c(this).data("unobtrusiveValidation"))||!a.validate||a.validate()))&&(this.enctype&&"multipart/form-data"===this.enctype?new FormData(this):e.concat(c(this).serializeArray()),u(this,{url:this.action,type:this.method||"GET",data:e.concat(c(this).serializeArray())}))})}(jQuery),document.addEventListener("DOMContentLoaded",function(){init()});