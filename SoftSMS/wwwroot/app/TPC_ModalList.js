var TPClient;
(function (TPClient) {
    var Modal = (function () {
        function Modal() {
        }
        Modal.GetNextIndex = function () {
            TPClient.Modal.mCurrentIndex = TPClient.Modal.mCurrentIndex + 1;
            return TPClient.Modal.mCurrentIndex;
        };
        Modal.RecalcAllModalSizes = function () {
            var i;
            for (i = 0; i <= TPClient.Modal.ModalList.length - 1; i++) {
                TPClient.Modal.ModalList[i].RecalcSize();
            }
        };
        Modal.GetExecuteReturnFunction = function (guid) {
            var i;
            for (i = 0; i <= TPClient.Modal.ModalList.length - 1; i++) {
                if (TPClient.Modal.ModalList[i].mGuid == guid) {
                    return TPClient.Modal.ModalList[i].mfnNameToReturn;
                }
            }
            return null;
        };
        Modal.CloseModal = function (guid, flagHide) {
            var i;
            for (i = 0; i <= TPClient.Modal.ModalList.length - 1; i++) {
                if (TPClient.Modal.ModalList[i].mGuid == guid) {
                    if (typeof flagHide == "undefined") {
                        $(TPClient.Modal.ModalList[i].mWindow.document).find("#TPCLIENT_MODAL_TS_myModal_" + TPClient.Modal.ModalList[i].mControlIndex).modal('hide');
                    }
                    //$((<any>TPClient.Modal.ModalList[i].mWindow).document).find("#TPCLIENT_MODAL_TS_myModal_" + TPClient.Modal.ModalList[i].mControlIndex).data('modal', null);
                    $(TPClient.Modal.ModalList[i].mWindow.document).find("#TPCLIENT_MODAL_TS_myModal_" + TPClient.Modal.ModalList[i].mControlIndex).next().remove();
                    //$((<any>TPClient.Modal.ModalList[i].mWindow).document).find('.modal-backdrop').remove();
                    $(TPClient.Modal.ModalList[i].mWindow.document).find("#TPCLIENT_MODAL_TS_myModal_" + TPClient.Modal.ModalList[i].mControlIndex).remove();
                    if (i == 0) {
                        TPClient.Modal.ModalList.shift();
                    }
                    else if (i == TPClient.Modal.ModalList.length - 1) {
                        TPClient.Modal.ModalList.pop();
                    }
                    else {
                        var head = TPClient.Modal.ModalList.slice(0, i);
                        var tail = TPClient.Modal.ModalList.slice(i + 1);
                        TPClient.Modal.ModalList = head.concat(tail);
                    }
                    break;
                }
            }
        };
        Modal.ModalList = [];
        Modal.mCurrentIndex = 5000;
        return Modal;
    }());
    TPClient.Modal = Modal;
})(TPClient || (TPClient = {}));
//# sourceMappingURL=TPC_ModalList.js.map