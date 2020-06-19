var TPClient;
(function (TPClient) {
    var ModalControl = (function () {
        function ModalControl(url, title, sizeW, sizeH, guid, fnNameToReturn) {
            var self;
            self = this;
            self.mControlIndex = window.top.TPClient.Modal.GetNextIndex();
            self.mGuid = guid;
            self.mSizeW = sizeW;
            self.mSizeH = sizeH;
            self.mWindow = window;
            if ((fnNameToReturn == "") || (typeof fnNameToReturn == "undefined")) {
                self.mfnNameToReturn = null;
            }
            else {
                self.mfnNameToReturn = fnNameToReturn;
            }
            self.DrawControl(url, title, sizeH);
            window.top.TPClient.Modal.ModalList.push(self);
            if ((self.mSizeW.toUpperCase() == 'FS') || (self.mSizeH.toUpperCase() == 'FS')) {
                //resize handler
                try {
                    window.top.WindowCollectionObserverResizeFS.push(self);
                }
                catch (e) { }
            }
            else {
                //scroll handler
                try {
                    window.top.WindowCollectionObserverScroll.push(window);
                }
                catch (e) { }
            }
        }
        ModalControl.prototype.DrawControl = function (url, title, sizeH) {
            var self;
            self = this;
            if ((self.mSizeW.toUpperCase() == 'FS') || (self.mSizeH.toUpperCase() == 'FS')) {
                self.DrawFullScreen(url, title);
                return;
            }
            var DivModal;
            var DivDialog;
            var DivContent;
            var DivHeader;
            var HeaderCloseButton;
            var HeaderH4;
            var DivBody;
            var iframe;
            DivModal = document.createElement("div");
            DivDialog = document.createElement("div");
            DivContent = document.createElement("div");
            DivHeader = document.createElement("div");
            HeaderCloseButton = document.createElement("button");
            HeaderH4 = document.createElement("h4");
            DivBody = document.createElement("div");
            iframe = document.createElement("iframe");
            DivModal.id = "TPCLIENT_MODAL_TS_myModal_" + self.mControlIndex;
            DivModal.className = "modal  draggable";
            DivModal.setAttribute("role", "dialog");
            DivDialog.id = "TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex;
            DivDialog.className = "modal-dialog modal-" + sizeH;
            DivContent.id = "TPCLIENT_MODAL_TS_myContent_" + self.mControlIndex;
            DivContent.className = "modal-content";
            DivHeader.id = "TPCLIENT_MODAL_TS_myHeader_" + self.mControlIndex;
            DivHeader.className = "modal-header";
            //Header button
            HeaderCloseButton.id = "TPCLIENT_MODAL_TS_myHeaderCloseButton_" + self.mControlIndex;
            HeaderCloseButton.innerHTML = "&times;";
            HeaderCloseButton.className = "close";
            HeaderCloseButton.setAttribute("data-dismiss", "modal");
            //H4
            HeaderH4.id = "TPCLIENT_MODAL_TS_myHeaderH4_" + self.mControlIndex;
            if (title == '') {
                HeaderH4.innerHTML = '&nbsp;';
            }
            else {
                HeaderH4.innerHTML = title;
            }
            HeaderH4.className = "modal-title";
            //Body
            DivBody.id = "TPCLIENT_MODAL_TS_myBody_" + self.mControlIndex;
            DivBody.className = "modal-body";
            //iframe
            iframe.id = "TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex;
            iframe.style.display = "none";
            iframe.frameBorder = "0";
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute("mozallowfullscreen", "true");
            iframe.setAttribute("webkitallowfullscreen", "true");
            iframe.src = url;
            iframe.onload = function () {
                self.OnLoadIframe();
            };
            DivHeader.appendChild(HeaderCloseButton);
            DivHeader.appendChild(HeaderH4);
            DivBody.appendChild(iframe);
            DivContent.appendChild(DivHeader);
            DivContent.appendChild(DivBody);
            DivDialog.appendChild(DivContent);
            DivModal.appendChild(DivDialog);
            //document.getElementsByTagName("body").append(DivModal);
            document.body.appendChild(DivModal);
            //setTimeout(function () {
            //    $('#TPCLIENT_MODAL_TS_myIframe_' + self.mControlIndex).ready(function () {
            //        self.RecalcSize();
            //    });
            //}, 1000);
        };
        ModalControl.prototype.OnLoadIframe = function () {
            var self;
            self = this;
            self.RecalcSize();
            $('.modal.draggable>.modal-dialog').draggable({
                cursor: 'move',
                handle: '.modal-header'
            });
            $('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css('cursor', 'move');
            //$("#TPCLIENT_MODAL_TS_myModal_" + self.mControlIndex).on('shown.bs.modal', function () {
            //});
            $("#TPCLIENT_MODAL_TS_myModal_" + self.mControlIndex).on('hidden.bs.modal', function () {
                window.top.TPClient.Modal.CloseModal(self.mGuid, true);
            });
            $("#TPCLIENT_MODAL_TS_myModal_" + self.mControlIndex).modal({
                keyboard: false,
                backdrop: 'static'
            });
            $("#TPCLIENT_MODAL_TS_myModal_" + self.mControlIndex).modal('show');
            try {
                window.LoadingModal.Hide();
            }
            catch (ex) { }
        };
        ModalControl.prototype.RecalcSize = function () {
            var self;
            self = this;
            var h;
            var w;
            var h1;
            var h2;
            var h3;
            var screenHeight;
            h = $(self.mWindow).height();
            w = $(self.mWindow).width();
            screenHeight = $(window.top).height();
            var bodyHeight;
            var bodyWidth;
            var modalHeight;
            var contentHeight;
            var fixedHeight;
            fixedHeight = false;
            //height
            switch (self.mSizeH) {
                case "lg":
                    modalHeight = Math.floor(h * 0.98);
                    bodyHeight = modalHeight - 40 - 17 * 2 - 50 - 80; //header and iframe top an bottom margin
                    break;
                case "md":
                    modalHeight = Math.floor(h * 0.75);
                    bodyHeight = modalHeight - 40 - 17 * 2 - 80; //header and iframe top an bottom margin
                    break;
                case "sm":
                    modalHeight = Math.floor(h * 0.5);
                    bodyHeight = modalHeight - 40 - 17 * 2 - 80; //header and iframe top an bottom margin
                    break;
                case "xs":
                    modalHeight = Math.floor(h * 0.25);
                    bodyHeight = modalHeight - 40 - 17 * 2 - 80; //header and iframe top an bottom margin
                    break;
                default:
                    modalHeight = Math.floor(Number(self.mSizeH));
                    bodyHeight = modalHeight - 40 - 17 * 2 - 80; //header and iframe top an bottom margin
                    fixedHeight = true;
                    break;
            }
            if (bodyHeight < 100 && !fixedHeight) {
                bodyHeight = 100;
            }
            if (self.mWindow === window.top) {
                //not window top
                if (h > screenHeight) {
                    //content not fit window size
                    bodyHeight = screenHeight - 40 - 17 * 2 - 110; //constant tabs postion,  iframe top an bottom margin, top and botom margin
                }
            }
            else {
                //not window top
                if (h > screenHeight - 123) {
                    //content not fit window size
                    bodyHeight = screenHeight - 123 - 40 - 17 * 2 - 110; //constant tabs postion,  iframe top an bottom margin, top and botom margin
                }
            }
            if (bodyHeight < 100 && !fixedHeight) {
                bodyHeight = 100;
            }
            switch (self.mSizeW) {
                case "lg":
                    $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).addClass("tp98pct");
                    break;
                case "md":
                    $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).addClass("tp75pct");
                    break;
                case "sm":
                    $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).addClass("tp50pct");
                    break;
                case "xs":
                    $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).addClass("tp25pct");
                    break;
                default:
                    $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).css("width", self.mSizeW + "px");
                    break;
            }
            //content
            try {
                contentHeight = $("#TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex).contents().find("#PageDiv").height();
                if (contentHeight) {
                    if (bodyHeight > contentHeight && !fixedHeight) {
                        bodyHeight = contentHeight + 30;
                    }
                }
                if (bodyHeight < 100 && !fixedHeight) {
                    bodyHeight = 100;
                }
            }
            catch (ex) {
                bodyHeight = 750;
            }
            //if ($(window.top.window.document).scrollTop() == 0) {
            //    $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).css("top", Math.floor(h / 2 - (bodyHeight + 40 + 17 * 2) / 2 - 30) + "px");
            //}
            if (self.mWindow === window.top) {
                $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).css("top", "0px");
            }
            else {
                //scroll not top
                $("#TPCLIENT_MODAL_TS_myDialog_" + self.mControlIndex).css("top", Math.floor($(window.top.window.document).scrollTop()) + "px");
            }
            $("#TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex).css("display", "block");
            $("#TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex).css("height", bodyHeight);
            $("#TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex).css("width", "100%");
            try {
                var hiframe = self.mWindow.document.getElementById("TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex).style.height;
                self.mWindow.document.getElementById("TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex).contentWindow.CallBackResizeModalTP(hiframe);
            }
            catch (e) { }
        };
        ModalControl.prototype.DrawFullScreen = function (url, title) {
            var self;
            self = this;
            var DivModal;
            var iframe;
            var screenHeight;
            var h;
            DivModal = window.top.document.createElement("div");
            iframe = window.top.document.createElement("iframe");
            DivModal.id = "TPCLIENT_MODAL_TS_myModal_" + self.mControlIndex;
            DivModal.style.position = "fixed";
            DivModal.style.zIndex = "1000000000000000";
            DivModal.style.top = "0";
            DivModal.style.left = "0";
            DivModal.style.width = "100%";
            DivModal.style.height = "100%";
            DivModal.style.backgroundColor = "white";
            //iframe
            iframe.id = "TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex;
            iframe.style.display = "none";
            iframe.frameBorder = "0";
            iframe.style.position = "fixed";
            iframe.style.top = "100px";
            iframe.style.left = "0px";
            iframe.style.width = "100%";
            screenHeight = $(window.top).height();
            h = ((screenHeight - 100 - 30) * 100 / screenHeight);
            if (screenHeight - 100 - 30 < 100) {
                h = 25;
            }
            iframe.style.height = h.toString() + "%";
            //iframe.style.border = "5px solid red";
            iframe.src = url;
            iframe.onload = function () {
                self.OnLoadIframeFullScreen();
            };
            DivModal.appendChild(iframe);
            window.top.document.getElementsByTagName("body")[0].appendChild(DivModal);
        };
        ModalControl.prototype.OnLoadIframeFullScreen = function () {
            var self;
            self = this;
            window.top.document.getElementById("TPCLIENT_MODAL_TS_myIframe_" + self.mControlIndex).style.display = "block";
        };
        return ModalControl;
    }());
    TPClient.ModalControl = ModalControl;
})(TPClient || (TPClient = {}));
//# sourceMappingURL=TPC_ModalControl.js.map