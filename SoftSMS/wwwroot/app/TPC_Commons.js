/// <reference path="../scripts/typings/sweetalert/sweetalert.d.ts" />
var TPClient;
(function (TPClient) {
    var Commons = (function () {
        function Commons() {
        }
        Commons.RemovePX = function (px) {
            return parseInt(px.replace("px", ""), 10);
        };
        Commons.tpAlertError = function (Message, OkFunction, paramConfirm, OkMessage) {
            if (window.top.TPSessionHasExpired) {
                return;
            }
            if ((OkMessage == null) || (typeof OkMessage == "undefined")) {
                OkMessage = window.top.fnGetGlobalResource('OkButton');
            }
            swal({
                title: '',
                text: Message,
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: OkMessage,
                type: 'error',
                html: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    if ((OkFunction != null) && (typeof OkFunction != "undefined")) {
                        try {
                            OkFunction(paramConfirm);
                        }
                        catch (e) { }
                    }
                }
            });
        };
        Commons.tpAlertSuccess = function (Message, OkFunction, paramConfirm, OkMessage) {
            if (window.top.TPSessionHasExpired) {
                return;
            }
            if ((OkMessage == null) || (typeof OkMessage == "undefined")) {
                OkMessage = window.top.fnGetGlobalResource('OkButton');
            }
            swal({
                title: '',
                text: Message,
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: OkMessage,
                type: 'success',
                html: true
            }, function (isConfirm) {
                if (isConfirm) {
                    if ((OkFunction != null) && (typeof OkFunction != "undefined")) {
                        try {
                            OkFunction(paramConfirm);
                        }
                        catch (e) { }
                    }
                }
            });
        };
        Commons.tpAlertWarning = function (Message, OkFunction, paramConfirm, OkMessage) {
            if (window.top.TPSessionHasExpired) {
                return;
            }
            if ((OkMessage == null) || (typeof OkMessage == "undefined")) {
                OkMessage = window.top.fnGetGlobalResource('OkButton');
            }
            swal({
                title: '',
                text: Message,
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: OkMessage,
                type: 'warning',
                html: true
            }, function (isConfirm) {
                if (isConfirm) {
                    if ((OkFunction != null) && (typeof OkFunction != "undefined")) {
                        try {
                            OkFunction(paramConfirm);
                        }
                        catch (e) { }
                    }
                }
            });
        };
        Commons.tpAlertInfo = function (Message, OkFunction, paramConfirm, OkMessage) {
            if (window.top.TPSessionHasExpired) {
                return;
            }
            if ((OkMessage == null) || (typeof OkMessage == "undefined")) {
                OkMessage = window.top.fnGetGlobalResource('OkButton');
            }
            swal({
                title: '',
                text: Message,
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: OkMessage,
                type: 'info',
                html: true
            }, function (isConfirm) {
                if (isConfirm) {
                    if ((OkFunction != null) && (typeof OkFunction != "undefined")) {
                        try {
                            OkFunction(paramConfirm);
                        }
                        catch (e) { }
                    }
                }
            });
        };
        Commons.tpAlertErrorWithCallback = function (Message, OkMessage, OkFunction, paramConfirm) {
            if (window.top.TPSessionHasExpired) {
                return;
            }
            swal({
                title: '',
                text: Message,
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: OkMessage,
                closeOnConfirm: true,
                html: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    //eval(OkFunction);
                    if ((OkFunction != null) && (typeof OkFunction != "undefined")) {
                        try {
                            OkFunction(paramConfirm);
                        }
                        catch (e) { }
                    }
                }
            });
        };
        Commons.tpAlertSuccessTimer = function (Message, CallBackFunctionAfter, paramConfirm) {
            if (window.top.TPSessionHasExpired) {
                return;
            }
            swal({
                title: '',
                text: Message,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
                type: 'success',
                html: true
            });
            if (CallBackFunctionAfter == "" || CallBackFunctionAfter == undefined) {
            }
            else {
                setTimeout(function () {
                    if ((CallBackFunctionAfter != null) && (typeof CallBackFunctionAfter != "undefined")) {
                        try {
                            CallBackFunctionAfter(paramConfirm);
                        }
                        catch (e) { }
                    }
                }, 1600);
            }
        };
        Commons.tpConfirm = function (Message, OkMessage, CancelMessage, OkFunction, paramConfirm, CancelFunction, paramCancel) {
            if (window.top.TPSessionHasExpired) {
                return;
            }
            swal({
                title: '',
                text: Message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: OkMessage,
                cancelButtonText: CancelMessage,
                closeOnCancel: true,
                closeOnConfirm: true,
                html: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    //eval(OkFunction);
                    if ((OkFunction != null) && (typeof OkFunction != "undefined")) {
                        try {
                            OkFunction(paramConfirm);
                        }
                        catch (e) { }
                    }
                }
                else {
                    //eval(CancelFunction);
                    if ((CancelFunction != null) && (typeof CancelFunction != "undefined")) {
                        try {
                            CancelFunction(paramCancel);
                        }
                        catch (e) { }
                    }
                }
            });
        };
        Commons.TPformat = function (str, arg) {
            for (var i = 0; i < arg.length; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, arg[i]);
            }
            return str;
        };
        Commons.clearScreenErrors = function () {
            $(".tpValidateError").addClass("hide");
            $(".tpValidateGroup").removeClass("has-error");
        };
        Commons.tpModalFullScreen = function (url) {
            var Div;
            var iframe;
            TPClient.Commons.mModalIndex = TPClient.Commons.mModalIndex + 1;
            Div = window.top.document.createElement('div');
            Div.id = "tpModalFullScreen_" + TPClient.Commons.mModalIndex.toString();
            Div.style.position = "fixed";
            Div.style.top = "0";
            Div.style.left = "0";
            Div.style.right = "0";
            Div.style.bottom = "0";
            Div.style.zIndex = TPClient.Commons.mModalIndex.toString() + "";
            Div.style.backgroundColor = "white";
            iframe = window.top.document.createElement("iframe");
            iframe.id = "tpModalIFrameFullScreen_" + TPClient.Commons.mModalIndex.toString();
            iframe.name = "tpModalIFrameFullScreen_" + TPClient.Commons.mModalIndex.toString();
            iframe.style.position = "fixed";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.right = "0";
            iframe.style.bottom = "0";
            iframe.style.border = "none";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.overflow = "auto";
            iframe.style.zIndex = TPClient.Commons.mModalIndex.toString() + "";
            iframe.style.backgroundColor = "white";
            iframe.src = url;
            Div.appendChild(iframe);
            window.top.document.getElementsByTagName('body')[0].appendChild(Div);
        };
        Commons.tpCloseModalFullScreen = function (windowobject) {
            try {
                var iframe;
                var iframe_id;
                var wordToSearch;
                var index;
                iframe = windowobject.parent.document.getElementById(windowobject.name);
                if ((iframe != null) && (typeof iframe != "undefined")) {
                    iframe_id = iframe.id;
                    if ((iframe_id != null) && (iframe_id.length) && (iframe_id.length > 0)) {
                        wordToSearch = "tpModalIFrameFullScreen_";
                        if (iframe_id.substr(0, wordToSearch.length) == wordToSearch) {
                            index = iframe_id.substring(wordToSearch.length);
                            window.top.document.getElementsByTagName('body')[0].removeChild(window.top.document.getElementById("tpModalFullScreen_" + index));
                        }
                    }
                }
            }
            catch (e) { }
        };
        Commons.tpClearFieldValidators = function () {
            $(".tpValidateGroup").find("input").keydown(function () {
                TPClient.Commons.clearScreenErrors();
            });
            $(".tpValidateGroup").find("input:radio").click(function () {
                TPClient.Commons.clearScreenErrors();
            });
            $(".tpValidateGroup").find("textarea").keyup(function () {
                TPClient.Commons.clearScreenErrors();
            });
            $(".tpValidateGroup").find("select").change(function () {
                TPClient.Commons.clearScreenErrors();
            });
        };
        //Public Shared Function BuildTextScapeDobleQuotesAndSingleQuote(ByVal inputText As String,
        //    ByVal ProperCase As Boolean) As String
        //Dim outputText As String
        //outputText = inputText
        //If ProperCase Then
        //outputText = CommonFunctions.ProperCase(outputText)
        //End If
        //outputText = Replace(outputText, Chr(39), "\" & Chr(39)) 'Sigle quotes
        //    outputText = Replace(outputText, Chr(34), "\" & Chr(39) & "\" & Chr(39)) 'Double quotes
        //    Return outputText
        //End Function
        Commons.tpGenerateCheckBox = function (checkId, isChecked, isDisabled, functionClicText) {
            var checkedText;
            var disabledText;
            checkedText = "";
            disabledText = "";
            if (isChecked === true || isChecked.toString().toLowerCase() === "true" || isChecked.toString() == "1")
                checkedText = "checked='checked'";
            if (isDisabled === true || isDisabled.toString().toLowerCase() === "true" || isDisabled.toString() == "1")
                disabledText = "disabled='disabled'";
            if (!functionClicText)
                functionClicText = "";
            else
                functionClicText = " onclick=" + '"' + functionClicText + '"';
            var html = "";
            html = html + "<div class='checkbox-nice checkbox-inline'>";
            html = html + " <input type='checkbox' " + checkedText + " id='" + checkId + "'  name='" + checkId + "' " + disabledText + functionClicText + "/> ";
            html = html + " <label for='" + checkId + "' >&nbsp;</label>";
            html = html + "</div>";
            return html;
        };
        Commons.tpProperCase = function (text) {
            return text.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        };
        Commons.tpBuildTextScapeDobleQuotesAndSingleQuote = function (inputText, ProperCase) {
            var outputText = inputText;
            if (ProperCase)
                outputText = TPClient.Commons.tpProperCase(outputText);
            outputText = outputText.replace("'", "\'");
            outputText = outputText.replace('"', "\'\'");
            return outputText;
        };
        Commons.tpGenerateDeleteButton = function (IsSystemRecord, Id_Encrypted, Id, Parameter1, Parameter2, Parameter3) {
            if (IsSystemRecord === true) {
                return "";
            }
            if (!Parameter1)
                Parameter1 = "";
            if (!Parameter2)
                Parameter2 = "";
            if (!Parameter3)
                Parameter3 = "";
            var html = "";
            html = "<a  href=" + '"' + "javascript:fnDelete('" + Id_Encrypted + "','" + Id + "','" + Parameter1 + "','" + Parameter2 + "','" + Parameter3 + "');" + '"' + ">";
            html = html + "<img src=" + '"' + "images/Admin_Delete.png" + '"' + " alt=" + '""' + " style=" + '"' + "border:0" + '"' + "/>";
            html = html + "</a>";
            return html;
        };
        Commons.tpDataTableGenerator = function (dbPreferences, noOrderableColumns, canSaveAsDefault, topicTable, includePreferences, hasSelectAllCheckbok, fixedColumnsLeft, fixedColumnsRight, buttons, tpTableID, tpViewDataDIV, columATTR, withGeneralExport, itemsToSelect, AddActiveRowClass, OnRenderFunction, paging, pageLengthInput, responsive, isServerSide, paginatedSp, columns, ajaxUrl, ajaxType, additionalParameters, colbodycenter, colbodyright, deferRender, setDataInLine, data) {
            var contI = 0;
            if (isServerSide == null || isServerSide == undefined) {
                isServerSide = false;
            }
            else {
                if (ajaxUrl == null || ajaxUrl == undefined) {
                    ajaxUrl = "DataTablesHandler.ashx";
                }
                if (ajaxType == null || ajaxType == undefined) {
                    ajaxType = "POST";
                }
                if (paginatedSp == null || paginatedSp == undefined || Number(paginatedSp) <= 0) {
                    throw "Parameter paginatedSp is required when isServerSide=true";
                }
                if (columns == null || columns == undefined || columns.length <= 0) {
                    throw "Parameter columns is required when isServerSide=true";
                }
            }
            if ((colbodycenter == null) || (typeof colbodycenter == "undefined")) {
                colbodycenter = [];
            }
            if ((colbodyright == null) || (typeof colbodyright == "undefined")) {
                colbodyright = [];
            }
            if (deferRender == null || deferRender == undefined) {
                deferRender = false;
            }
            if (setDataInLine == null || setDataInLine == undefined) {
                setDataInLine = false;
            }
            else if (setDataInLine == true) {
                if ((data == null) || (typeof data == "undefined") || data.length <= 0) {
                    data = [];
                }
            }
            if (paging == null || paging == undefined) {
                paging = true;
            }
            if (responsive == null || responsive == undefined) {
                responsive = true;
            }
            if (!itemsToSelect) {
                itemsToSelect = 100;
            }
            if (columATTR == null || columATTR == undefined) {
                columATTR = "data-index";
            }
            if (AddActiveRowClass == null || AddActiveRowClass == undefined) {
                AddActiveRowClass = true;
            }
            if (tpViewDataDIV == null || tpViewDataDIV == undefined) {
                tpViewDataDIV = "tpViewDataDIV";
            }
            if (tpTableID == null || tpTableID == undefined) {
                tpTableID = "tpViewDataTable";
            }
            $("#" + tpTableID + " > thead > tr > th").each(function () {
                $(this).attr("data-index", contI);
                contI++;
            });
            Commons.mButtonSpacer.buttonText = "tpspacer";
            var dropdownPreferencesText = window.top.fnGetGlobalResource('gridPreferencesLabel');
            var buttonSavePreferencesText = window.top.fnGetGlobalResource('SavePreferencesButton');
            var buttonSavePreferencesAsDefaultText = window.top.fnGetGlobalResource('SaveAsDefaultButton');
            var buttonResetPreferencesText = window.top.fnGetGlobalResource('ResetPreferencesButton');
            if ((dropdownPreferencesText == null) || (typeof dropdownPreferencesText == "undefined")) {
                dropdownPreferencesText = "Preferences";
            }
            if ((buttonSavePreferencesAsDefaultText == null) || (typeof buttonSavePreferencesAsDefaultText == "undefined")) {
                buttonSavePreferencesAsDefaultText = "Save as default";
            }
            if ((buttonSavePreferencesText == null) || (typeof buttonSavePreferencesText == "undefined")) {
                buttonSavePreferencesText = "Save";
            }
            if ((buttonResetPreferencesText == null) || (typeof buttonResetPreferencesText == "undefined")) {
                buttonResetPreferencesText = "Reset";
            }
            if ((topicTable == null) || (typeof topicTable == "undefined")) {
                throw "NOTOPIC_ERROR";
            }
            if ((canSaveAsDefault == null) || (typeof canSaveAsDefault == "undefined")) {
                canSaveAsDefault = "False";
            }
            if ((includePreferences == null) || (typeof includePreferences == "undefined")) {
                includePreferences = true;
            }
            if ((hasSelectAllCheckbok == null) || (typeof hasSelectAllCheckbok == "undefined")) {
                hasSelectAllCheckbok = false;
            }
            if ((fixedColumnsLeft == null) || (typeof fixedColumnsLeft == "undefined")) {
                fixedColumnsLeft = 0;
            }
            if ((fixedColumnsRight == null) || (typeof fixedColumnsRight == "undefined")) {
                fixedColumnsRight = 0;
            }
            if ((noOrderableColumns != null) && (typeof noOrderableColumns != "undefined")) {
            }
            if ((buttons == null) || (typeof buttons == "undefined")) {
                buttons = [];
            }
            var pageLength = TPClient.Commons.mPagelengthDefaultDatatable;
            var colReorder = {};
            var i;
            var colhidden = [];
            colReorder.order = [];
            try {
                if (dbPreferences != "") {
                    var preferences = JSON.parse(dbPreferences);
                    if (preferences) {
                        //colreorder
                        try {
                            if (typeof preferences.colReorder === 'string' || preferences.colReorder instanceof String) {
                                preferences.colReorder = preferences.colReorder.split(',');
                            }
                            for (i = 0; i <= preferences.colReorder.length - 1; i++) {
                                colReorder.order.push(parseInt(preferences.colReorder[i], 10));
                            }
                        }
                        catch (ex1) {
                            colReorder = {};
                            colReorder.order = null;
                        }
                        //pageLength
                        try {
                            pageLength = parseInt(preferences.pageLength, 10);
                            if ((isNaN(pageLength)) || (pageLength <= 0)) {
                                pageLength = TPClient.Commons.mPagelengthDefaultDatatable;
                            }
                        }
                        catch (ex2) {
                            pageLength = TPClient.Commons.mPagelengthDefaultDatatable;
                        }
                        //never
                        try {
                            for (i = 0; i <= preferences.never.split(',').length - 1; i++) {
                                colhidden.push(parseInt(preferences.never.split(',')[i], 10));
                            }
                        }
                        catch (ex3) {
                            colhidden = [];
                        }
                    }
                }
                else {
                    colReorder.order = null;
                }
            }
            catch (ex4) {
                pageLength = TPClient.Commons.mPagelengthDefaultDatatable;
                colReorder.order = null;
                colhidden = [];
            }
            colReorder.fixedColumnsRight = fixedColumnsRight;
            colReorder.fixedColumnsLeft = fixedColumnsLeft;
            if (pageLengthInput != null && pageLengthInput != undefined) {
                if (fnIsNumericOnlyInteger(pageLengthInput)) {
                    pageLength = pageLengthInput;
                }
            }
            try {
                pageLength = Math.min(pageLength, TPClient.Commons.mMaxPagelengthDefaultDatatable);
            }
            catch (ex3) {
                pageLength = TPClient.Commons.mMaxPagelengthDefaultDatatable;
            }
            var settingsTPTable = {
                "language": window.top.GetDatatableLanguage(window.top.fnGetCurrentLanguage()),
                "responsive": responsive,
                "scrollX": !responsive,
                "destroy": true,
                "colReorder": colReorder,
                "pageLength": pageLength,
                "paging": paging,
                "deferRender": deferRender,
                "buttons": [
                    {
                        extend: 'excelHtml5',
                        action: function (e, dt, node, config) {
                            fnCheckExportToExcel("TRACKING");
                            $.fn.dataTable.ext.buttons.excelHtml5.action.call(this, e, dt, node, config);
                        },
                        exportOptions: {
                            columns: ':visible',
                            format: {
                                body: function (innerHtml, cellRowIndex, cellColumnIndex) {
                                    var innerHtmlToCompare = "<span>" + innerHtml + "</span>";
                                    var justText = $(innerHtmlToCompare).clone() //clone the element
                                        .children() //select all the children
                                        .remove() //remove all the children
                                        .end() //again go back to selected element
                                        .text()
                                        .trim();
                                    innerHtml = justText;
                                    $(innerHtmlToCompare).children().each(function () {
                                        if ($(this).get(0).tagName.toLowerCase() == "a") {
                                            if ($(this).children().length > 0) {
                                                if ($(this).has("span.fa.fa-search-plus.tpfa-1-5x").length) {
                                                }
                                                else {
                                                    if ($(this).has("img").length) {
                                                        if ($(this).find("img").first().attr("title")) {
                                                            innerHtml += ((innerHtml == undefined || innerHtml == null || innerHtml.trim() == "") ? "" : " - ") + $(this).find("img").first().attr("title");
                                                        }
                                                    }
                                                    else {
                                                        innerHtml += ((innerHtml == undefined || innerHtml == null || innerHtml.trim() == "") ? "" : " - ") + $(this).clone() //clone the element
                                                            .children() //select all the children
                                                            .remove() //remove all the children
                                                            .end() //again go back to selected element
                                                            .text()
                                                            .trim();
                                                    }
                                                }
                                            }
                                            else {
                                                innerHtml += ((innerHtml == undefined || innerHtml == null || innerHtml.trim() == "") ? "" : " - ") + $(this).html();
                                            }
                                        }
                                        else {
                                            switch ($(this).get(0).tagName.toLowerCase()) {
                                                case "img":
                                                    if ($(this).attr("title")) {
                                                        innerHtml += ((innerHtml == undefined || innerHtml == null || innerHtml.trim() == "") ? "" : " - ") + $(this).attr("title");
                                                    }
                                                    break;
                                                case "input":
                                                    if ($(this).attr("type").toLowerCase() == 'checkbox') {
                                                        innerHtml += ((innerHtml == undefined || innerHtml == null || innerHtml.trim() == "") ? "" : " - ") + $(this).is(":checked");
                                                    }
                                                    break;
                                                case "div":
                                                    if ($(this).has("input[type='checkbox']").length) {
                                                        innerHtml += ((innerHtml == undefined || innerHtml == null || innerHtml.trim() == "") ? "" : " - ") + $(this).find("input[type='checkbox']").first().is(":checked");
                                                    }
                                                    break;
                                                case "p":
                                                    innerHtml += $(this).text();
                                                    break;
                                            }
                                        }
                                    });
                                    //if ($(innerHtmlToCompare).has("a").length) {
                                    //    innerHtml = $(innerHtmlToCompare).find("a").html();
                                    //}
                                    //if ($(innerHtmlToCompare).has("input[type='checkbox']").length) {
                                    //    innerHtml = $(innerHtmlToCompare).find("input[type='checkbox']").is(":checked");
                                    //}
                                    //if ($(innerHtmlToCompare).has("input[type='text']").length) {
                                    //    innerHtml = $(innerHtmlToCompare).find("input[type='text']").val();
                                    //}
                                    //if ($(innerHtmlToCompare).has("textarea").length) {
                                    //    innerHtml = $(innerHtmlToCompare).find("textarea").text();
                                    //}
                                    //if ($(innerHtmlToCompare).has("img").length) {
                                    //    innerHtml = $(innerHtmlToCompare).find("img").attr("data-tptooltip-title");
                                    //}
                                    //console.log($(innerHtml).text());
                                    //var elem = document.createElement('textarea');
                                    //elem.innerHTML = innerHtml;
                                    //var decoded = elem.value;
                                    //console.log(decoded);
                                    //return decoded;
                                    //return $('<div/>').html(innerHtml).text();
                                    //return htmlDecode(innerHtml);
                                    return innerHtml.replace("&amp;", "&");
                                }
                            }
                        }
                    }
                ],
                "lengthMenu": TPClient.Commons.mlengthMenuDatatable,
                "columnDefs": [
                    {
                        "targets": noOrderableColumns,
                        "searchable": false,
                        "orderable": false
                    },
                    { className: 'never', "targets": colhidden },
                    { className: 'text-center', "targets": colbodycenter },
                    { className: 'text-right', "targets": colbodyright }
                ],
                "drawCallback": function () {
                    SetToolTip();
                    $("#" + tpViewDataDIV).removeClass("hide");
                    if (AddActiveRowClass == true) {
                        AddActiveRowClickDataTable(tpTableID);
                    }
                },
                order: []
            };
            if (isServerSide === true) {
                settingsTPTable.processing = isServerSide;
                settingsTPTable.serverSide = isServerSide;
                settingsTPTable.ajax = {};
                settingsTPTable.ajax.url = ajaxUrl;
                settingsTPTable.ajax.type = ajaxType;
                if (ajaxType == "POST") {
                    settingsTPTable.ajax.contentType = "application/json; charset=utf-8";
                    settingsTPTable.ajax.data = function (d) {
                        d.paginatedSp = paginatedSp;
                        d.additionalParameters = additionalParameters;
                        return JSON.stringify(d);
                    };
                }
                settingsTPTable.columns = columns;
            }
            //Set data inline
            if (setDataInLine == true) {
                settingsTPTable.data = data;
            }
            var superTableTP = $("#" + tpTableID + "").DataTable(settingsTPTable);
            $('#' + tpTableID).on('draw.dt', function () {
                if ((OnRenderFunction != null) && (typeof OnRenderFunction != "undefined")) {
                    OnRenderFunction();
                }
                if (AddActiveRowClass == true) {
                    AddActiveRowClickDataTable(tpTableID);
                }
            });
            superTableTP.buttons().container().appendTo($('.col-sm-6:eq(0)', superTableTP.table().container()));
            $("#" + tpTableID + "_wrapper .dt-buttons").addClass("hidden");
            var preferencesHtml = "";
            preferencesHtml += '<div data-placement="bottom" titleCustom="' + dropdownPreferencesText + '" class="dropdown tpNoHoverDropdown-menu DataTablePreferences hidden">';
            preferencesHtml += '    <button id=' + tpTableID + '_btnPreferencesS" class="btn btn-white dropdown-toggle tpNavyColorToolbarDT" type="button" id="dropdownPreferences" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="margin-left:10px;">';
            preferencesHtml += '        <span class="glyphicon glyphicon-cog"></span>';
            preferencesHtml += '        <span>';
            //  preferencesHtml += '            <span>' + dropdownPreferencesText + '</span></span>';
            preferencesHtml += '        </span>';
            preferencesHtml += '        <span class="caret"></span>';
            preferencesHtml += '    </button>';
            preferencesHtml += '    <ul class="dropdown-menu dropdown-menu-right" style="left: auto; right: 0;" aria-labelledby="dropdownPreferences" id="' + tpTableID + '_preferencesList">';
            preferencesHtml += '        <li>';
            preferencesHtml += '            <a href="#" onclick="fnSavePreferencesDB(' + "'" + topicTable + "'" + ',' + "'" + tpTableID + "'" + ',' + "'" + columATTR + "'" + ');">';
            preferencesHtml += '                <span class="label label-large label-primary col-xs-12">';
            preferencesHtml += '                    <span>' + buttonSavePreferencesText + '</span>';
            preferencesHtml += '                </span>';
            preferencesHtml += '            </a>';
            preferencesHtml += '        </li>';
            if (canSaveAsDefault == "True") {
                preferencesHtml += '        <li>';
                preferencesHtml += '            <a href="#" onclick="fnSaveAsDefault(' + "'" + topicTable + "'" + ',' + "'" + tpTableID + "'" + ',' + "'" + columATTR + "'" + ');">';
                preferencesHtml += '                <span class="label label-large label-primary col-xs-12">';
                preferencesHtml += '                    <span>' + buttonSavePreferencesAsDefaultText + '</span>';
                preferencesHtml += '                </span>';
                preferencesHtml += '            </a>';
                preferencesHtml += '        </li>';
            }
            preferencesHtml += '        <li>';
            preferencesHtml += '            <a href="#" onclick="fnResetPreferences(' + "'" + topicTable + "'" + ',' + "'" + tpTableID + "'" + ',' + "'" + columATTR + "'" + ');">';
            preferencesHtml += '                <span class="label label-large label-primary col-xs-12">';
            preferencesHtml += '                    <span>' + buttonResetPreferencesText + '</span>';
            preferencesHtml += '                </span>';
            preferencesHtml += '            </a>';
            preferencesHtml += '        </li>';
            preferencesHtml += '';
            preferencesHtml += '    </ul>';
            preferencesHtml += '</div>';
            var botoneraHtml = "";
            $("#" + tpTableID + "_length").parent().removeClass("col-sm-6").addClass("col-sm-4").addClass("col-xs-8");
            $("#" + tpTableID + "_filter").parent().removeClass("col-sm-6").addClass("col-sm-8").addClass("col-xs-4");
            $("#" + tpTableID + "_length").parent().parent().css("margin-right", "10px");
            $("#" + tpTableID + "_length").parent().parent().css("margin-left", "10px");
            $("#" + tpTableID + "_length").parent().css("float:left");
            $("#" + tpTableID + "_length").parent().attr("id", tpTableID + "_divToToolbar");
            $("#" + tpTableID + "_length").detach().insertBefore($("#" + tpTableID + "_filter"));
            $("#" + tpTableID + "_length").css("float", "right");
            $("#" + tpTableID + "_filter").css("float", "right");
            //Check export to excel permission
            var CheckExportToExcel;
            CheckExportToExcel = false;
            CheckExportToExcel = fnCheckExportToExcel("CHECK");
            var contTP = 0;
            if (buttons.length > 0 || includePreferences) {
                botoneraHtml = '<div id="' + tpTableID + '_tpToolbarDT" class="btn-group clsMergeINJ" role="group" aria-label="">';
                var marginLeft = false;
                for (var j = 0; j < buttons.length; j++) {
                    if (buttons[j].buttonText == "tpspacer") {
                        marginLeft = true;
                    }
                    else {
                        //Check export to excel permission
                        if (!CheckExportToExcel) {
                            if (buttons[j].buttonClasses.indexOf("excel") != -1) {
                                break;
                            }
                        }
                        var laMargen = "";
                        if (marginLeft) {
                            laMargen = " style='margin-left:10px;'";
                            marginLeft = false;
                        }
                        botoneraHtml += "<button id='" + tpTableID + "_btnToolbarDT" + contTP.toString() + "' type='button'";
                        botoneraHtml += "class='btn btn-white'";
                        //if (buttons[j].buttonClasses == "") {
                        //    botoneraHtml += "class='btn btn-white'";
                        //} else {
                        //    botoneraHtml += "class='btn btn-white " + buttons[j].buttonClasses + "'";
                        //}
                        botoneraHtml += " titleCustom='" + buttons[j].buttonText + "' " + laMargen + ">";
                        botoneraHtml += "<i class='" + buttons[j].buttonClasses + "'></i>";
                        botoneraHtml += "</button>";
                        if (buttons[j].buttonClasses.indexOf("excel") != -1) {
                            withGeneralExport = false;
                        }
                        contTP++;
                    }
                }
                var generalExcelExportButtonTPId = "";
                //Check export to excel permission
                if (CheckExportToExcel) {
                    if (withGeneralExport == true || (withGeneralExport == null || withGeneralExport == undefined)) {
                        laMargen = " style='margin-left:10px;'";
                        generalExcelExportButtonTPId = tpTableID + "_btnToolbarDT" + contTP.toString();
                        botoneraHtml += "<button id='" + tpTableID + "_btnToolbarDT" + contTP.toString() + "' type='button'";
                        botoneraHtml += "class='btn btn-white'";
                        botoneraHtml += " titleCustom='" + window.top.fnGetGlobalResource('ExportToExcelLabel') + "' " + laMargen + ">";
                        botoneraHtml += "<i class='" + this.mClassesExcelButtonGrid + "'></i>";
                        botoneraHtml += "</button>";
                        contTP++;
                    }
                }
                botoneraHtml += "   <div id='" + tpTableID + "_divToIncludePreferences' class='btn-group' role='group'>";
                botoneraHtml += "   </div>";
                botoneraHtml += "   <button id='" + tpTableID + "_tpBtnHelpDT' type='button' class='btn btn-white fa fa-question-circle tpNavyColorToolbarDT' style='margin-left:10px'></button>";
                botoneraHtml += "</div>";
                if (includePreferences) {
                    $("#" + tpTableID + "_divToToolbar").append(botoneraHtml);
                    $("#" + tpTableID + "_divToToolbar").css("z-index", "500");
                    $("#" + tpTableID + "_divToToolbar").next().css("z-index", "500");
                    $("#" + tpTableID + "_divToIncludePreferences").append(preferencesHtml);
                    $("#" + tpTableID + "_filter").find("input").insertBefore($("#" + tpTableID + "_filter").find("input").parent());
                    $("#" + tpTableID + "_filter").find("input").parent().append($("<div class='filter-block' style='margin-top:0px'><div class='form-group' id='" + tpTableID + "_divTxtBuscar'></div></div>"));
                    $("#" + tpTableID + "_divTxtBuscar").append($("#" + tpTableID + "_filter").find("input"));
                    $("#" + tpTableID + "_filter").find("input").parent().append($('<i id=' + tpTableID + '_icon-searchDT" class="fa fa-search search-icon"></i>'));
                    var placeHolder = window.top.fnGetGlobalResource('SearchDTPlaceholder');
                    $("#" + tpTableID + "_filter").find("input").css("height", "30px").attr("placeholder", placeHolder);
                    $("#" + tpTableID + "_filter").find("label").prependTo($("#" + tpTableID + "_divTxtBuscar"));
                    $("#" + tpTableID + "_icon-searchDT").css("margin-top", "-3px");
                    $(".dataTables_filter").addClass("form-group");
                    $("#" + tpTableID + "_tpToolbarDT").find("button").css("height", "35px").css("margin-top", "10px").css("border", "1px solid #dddddd").css("font-size", "20px");
                    $("#" + tpTableID + "_wrapper").css("background", "#E8EFF5");
                    $("#" + tpTableID + "_wrapper").css("border-top-left-radius", "5px");
                    $("#" + tpTableID + "_wrapper").css("border-top-right-radius", "5px");
                    $("#" + tpTableID + "_wrapper").css("border", "solid 1px #dddddd");
                    $("#" + tpTableID + "_wrapper").find(".row").first().css("margin-left", "10px");
                    $("#" + tpTableID + "_wrapper").find(".row").first().css("margin-right", "10px");
                    $("#" + tpTableID).css("background-color", "white");
                    $("#" + tpTableID + "_filter").css("margin-right", "15px");
                    $(".dropdown.tpNoHoverDropdown-menu.DataTablePreferences").removeClass("hidden");
                }
                Commons.mTpTotToolTipDT = 0;
                for (var j = 0; j < buttons.length; j++) {
                    if (buttons[j].buttonText != "tpspacer") {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpTotToolTipDT.toString()).click(buttons[j].buttonFunction);
                        if (buttons[j].buttonClasses.indexOf("excel") != -1) {
                            $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpTotToolTipDT.toString()).click(function () {
                                fnCheckExportToExcel("TRACKING");
                            });
                        }
                        Commons.mTpTotToolTipDT++;
                    }
                }
                if (withGeneralExport == true || (withGeneralExport == null || withGeneralExport == undefined)) {
                    Commons.mTpTotToolTipDT++;
                }
                $("#" + generalExcelExportButtonTPId).click(function () {
                    $("#" + tpTableID + "_wrapper .dt-buttons a").first().trigger("click");
                });
                $('[titleCustom]').each(function (index, el) {
                    if (typeof $(el).attr('data-tptooltip1-title') == 'undefined' && $(el).attr('titleCustom') != '') {
                        $(el).attr("data-toggle", "popover");
                        $(el).attr('data-tptooltip1-title', $(el).attr('titleCustom'));
                        $(el).attr('titleCustom', ' ');
                        $(el).popover({
                            trigger: "hover",
                            container: "body",
                            placement: "bottom",
                            content: $(el).attr('data-tptooltip1-title')
                        });
                    }
                });
                $("#" + tpTableID + "_btnPreferencesS").css("font-size", "14px");
                //$("#" + tpTableID + "_btnPreferencesS").attr("id", tpTableID + "_btnToolbarDT" + contTP);
                var content = $("<div style='width:71px'><button id='" + tpTableID + "_btnTpAnt' type='button' class='btn btn-white' style='margin-right:2px'><</button><span id='tmpt'></span><button id='" + tpTableID + "_btnTpSig' type='button' class='btn btn-white'>></button></div>");
                content.on('click', '#' + tpTableID + '_btnTpSig', function (evt) {
                    evt.stopPropagation();
                    if (Commons.mTpActToolTipDT <= 0 && Commons.mTpAntToolTipDT == -1) {
                        Commons.mTpAntToolTipDT = Commons.mTpActToolTipDT;
                        Commons.mTpActToolTipDT++;
                    }
                    else {
                        if (Commons.mTpActToolTipDT == Commons.mTpTotToolTipDT) {
                            Commons.mTpActToolTipDT = 0;
                            Commons.mTpAntToolTipDT = Commons.mTpTotToolTipDT;
                        }
                        else {
                            Commons.mTpAntToolTipDT = Commons.mTpActToolTipDT;
                            Commons.mTpActToolTipDT++;
                        }
                    }
                    //$("#tmpt").html("act: " + Commons.mTpActToolTipDT + " ant: " + Commons.mTpAntToolTipDT);
                    if (Commons.mTpActToolTipDT == Commons.mTpTotToolTipDT) {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpActToolTipDT).parent().popover({ placement: "bottom" }).popover("show");
                    }
                    else {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpActToolTipDT).popover({ placement: "bottom" }).popover("show");
                    }
                    if (Commons.mTpAntToolTipDT == Commons.mTpTotToolTipDT) {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpAntToolTipDT).parent().popover("hide");
                    }
                    else {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpAntToolTipDT).popover("hide");
                    }
                }).on('click', '#' + tpTableID + '_btnTpAnt', function (evt) {
                    evt.stopPropagation();
                    if ((Commons.mTpActToolTipDT <= 0 && Commons.mTpAntToolTipDT == -1) || (Commons.mTpActToolTipDT == 0 && Commons.mTpAntToolTipDT == 1)) {
                        Commons.mTpActToolTipDT = Commons.mTpTotToolTipDT;
                        Commons.mTpAntToolTipDT = 0;
                    }
                    else {
                        Commons.mTpAntToolTipDT = Commons.mTpActToolTipDT;
                        Commons.mTpActToolTipDT--;
                    }
                    //$("#tmpt").html("act: " + Commons.mTpActToolTipDT + " ant: " + Commons.mTpAntToolTipDT);
                    if (Commons.mTpActToolTipDT == Commons.mTpTotToolTipDT) {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpActToolTipDT).parent().popover({ placement: "bottom" }).popover("show");
                    }
                    else {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpActToolTipDT).popover({ placement: "bottom" }).popover("show");
                    }
                    if (Commons.mTpAntToolTipDT == Commons.mTpTotToolTipDT) {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpAntToolTipDT).parent().popover("hide");
                    }
                    else {
                        $("#" + tpTableID + "_btnToolbarDT" + Commons.mTpAntToolTipDT).popover("hide");
                    }
                });
                var textTitle = window.top.fnGetGlobalResource('ToolTipHelpTitlePlural');
                $("#" + tpTableID + "_tpBtnHelpDT").popover({
                    title: textTitle,
                    content: content,
                    placement: 'left',
                    //trigger: 'manual',
                    html: true
                }).on('hidden.bs.popover', function () {
                    $(".popover").popover("hide");
                    content.detach();
                    $("#" + tpTableID + "_tpBtnHelpDT").removeClass("active");
                    $("a:first").focus();
                }).on('shown.bs.popover', function () {
                    $("#" + tpTableID + "_btnToolbarDT0").popover("show");
                    Commons.mTpActToolTipDT = 0;
                    Commons.mTpAntToolTipDT = -1;
                    $("#" + tpTableID + "_tpBtnHelpDT").addClass("active");
                }).on("click", function (evt) {
                    //(<any>evt).stopPropagation();
                    //(<any>$('#' + tpTableID + '_tpBtnHelpDT')).popover('show');
                });
            }
            $("#" + tpTableID + "_tpBtnHelpDT").detach().prependTo($("#" + tpTableID + "_length").parent()).css("float", "right");
            $("#" + tpTableID + "_divToIncludePreferences").detach().prependTo($("#" + tpTableID + "_length").parent()).css("float", "right").find("button").css("margin-left", "0px");
            /*
                Style finished!!
             */
            var table = $("#" + tpTableID + "").DataTable();
            if (includePreferences) {
                //create checkbox
                table.columns().every(function (myIndex) {
                    var that = this;
                    var text;
                    var html;
                    var checked;
                    if (!$(this.header()).hasClass("tpnopreference")) {
                        var attindex;
                        var attcode;
                        attindex = $(this.header()).attr("data-index");
                        attcode = $(this.header()).attr("data-code");
                        text = $(this.header()).text();
                        text = text.replace(/\r\n|\n\r|\n|\r/ig, "").replace(/  /ig, "");
                        html = "<li class='tpchkprefclick'><a href='javascript:void(0)'>";
                        html = html + "<div class='checkbox-nice checkbox-inline'>";
                        checked = "checked='checked'";
                        for (var i = 0; i <= colhidden.length - 1; i++) {
                            if (colhidden[i] == attindex) {
                                checked = "";
                                break;
                            }
                        }
                        html = html + "<input type='checkbox' class='tpPreferenceCHK' " + checked + " id='chkPreference_" + tpTableID + "_" + attindex + "' data-index='" + attindex + "' data-code='" + attcode + "' />";
                        html = html + "<label for='chkPreference_" + tpTableID + "_" + attindex + "' >" + text + "</label></div></a></li>";
                        $("#" + tpTableID + "_preferencesList").append(html);
                    }
                });
                $(".tpchkprefclick").click(function (event) {
                    event.stopPropagation();
                });
            }
            if (hasSelectAllCheckbok) {
                var toAddHtml = '<div class="col-sm-12" style="' +
                    'font-size: smaller; ' +
                    'padding: 0; ' +
                    'font-weight: 600; ' +
                    'margin: 0; ' +
                    'top: 0px; ' +
                    '">' +
                    '<span>' + window.top.fnGetGlobalResource('ItemsSelectedInCurrentPageLabel') + ' <i id="itemsSelectedCurrentPage">0</i></span>' +
                    '   </div>';
                $('#' + tpTableID + "_divToToolbar").parent().append(toAddHtml);
                //$('#' + tpTableID + '_selectall').click(function (event) {  //on click
                $('#' + tpTableID).find("#selectall").click(function (event) {
                    if (this.checked) {
                        var miCont = 0;
                        $('.TPCHKgrid').each(function () {
                            this.checked = true; //select all checkboxes with class "checkbox"
                            $(this).closest("tr").addClass("selected");
                            miCont++;
                            if (miCont > itemsToSelect) {
                                window.top.TPClient.Commons.tpAlertInfo(window.top.fnGetGlobalResource('OnlyFirstLabel') + " " + itemsToSelect + " " + window.top.fnGetGlobalResource('ItemsWereSelectedLabel'), null, null, null);
                                this.checked = false;
                                miCont--;
                                return false;
                            }
                        });
                        $('#' + tpTableID + "_wrapper #itemsSelectedCurrentPage").html(miCont.toString());
                    }
                    else {
                        $('.TPCHKgrid').each(function () {
                            this.checked = false; //deselect all checkboxes with class "checkbox"
                            $(this).closest("tr").removeClass("selected");
                        });
                        $('#' + tpTableID + "_wrapper #itemsSelectedCurrentPage").html("0");
                    }
                });
                $("body").on("click", '#' + tpTableID + " .TPCHKgrid", function () {
                    var miCont = 0;
                    $('#' + tpTableID + " .TPCHKgrid").each(function () {
                        if (this.checked == true) {
                            miCont++;
                        }
                    });
                    if (miCont > itemsToSelect) {
                        window.top.TPClient.Commons.tpAlertInfo(window.top.fnGetGlobalResource('PleaseSelectUpToLabel') + " " + itemsToSelect + " " + window.top.fnGetGlobalResource('ItemsLabel'), null, null, null);
                        this.checked = false;
                        miCont--;
                    }
                    $('#' + tpTableID + "_wrapper #itemsSelectedCurrentPage").html(miCont.toString());
                });
                $('#' + tpTableID).on('draw.dt', function () {
                    var miCont = 0;
                    $('.TPCHKgrid').each(function () {
                        if (this.checked) {
                            miCont++;
                        }
                    });
                    $('#' + tpTableID + "_wrapper #itemsSelectedCurrentPage").html(miCont.toString());
                });
            }
            Commons.ActiveSearchKeyPress(topicTable, tpTableID);
        };
        Commons.ActiveSearchKeyPress = function (topicTable, tpTableID) {
            $("#" + tpTableID + "_divTxtBuscar").css("margin-right", "0");
            var buttonClearId = tpTableID + "_clearButton";
            $("#" + tpTableID + "_divTxtBuscar").parent().append('<button type="button" id="' + buttonClearId + '" class="btn btn-white fa fa-times hidden" style="margin-left: 0;color: #bb5d5d;"></button>');
            $("#" + tpTableID).parents("#tpViewDataDIV").find("input[type=search]").keyup(function () {
                window.top.dataTableSearchArray[topicTable] = $(this).val();
                if ($(this).val().trim() == "") {
                    $(this).css("background-color", "white");
                    $("#" + buttonClearId).addClass("hidden");
                }
                else {
                    $(this).css("background-color", "rgb(247, 230, 171)");
                    $("#" + buttonClearId).removeClass("hidden");
                }
            });
            if (window.top.dataTableSearchArray[topicTable]) {
                var table = $('#' + tpTableID).DataTable();
                table.search(window.top.dataTableSearchArray[topicTable]).draw();
                var elControl = $("#" + tpTableID).parents("#tpViewDataDIV").find("input[type=search]");
                if ($(elControl).val().trim() == "") {
                    $(elControl).css("background-color", "white");
                    $("#" + buttonClearId).addClass("hidden");
                }
                else {
                    $(elControl).css("background-color", "rgb(247, 230, 171)");
                    $("#" + buttonClearId).removeClass("hidden");
                }
            }
            $("#" + buttonClearId).click(function () {
                $("#" + tpTableID).parents("#tpViewDataDIV").find("input[type=search]").val("");
                $("#" + tpTableID).parents("#tpViewDataDIV").find("input[type=search]").css("background-color", "white");
                $("#" + buttonClearId).addClass("hidden");
                var table = $('#' + tpTableID).DataTable();
                window.top.dataTableSearchArray[topicTable] = "";
                table.search(window.top.dataTableSearchArray[topicTable]).draw();
                $("#" + tpTableID).parents("#tpViewDataDIV").find("input[type=search]").focus();
            });
        };
        Commons.toUTF8Text = function (str) {
            var utf8 = [];
            var i;
            var tmp;
            utf8 = TPClient.Commons.toUTF8Array(str);
            tmp = '';
            for (i = 0; i <= utf8.length - 1; i++) {
                tmp = tmp + utf8[i].toString();
                if (i != utf8.length - 1) {
                    tmp = tmp + "-";
                }
            }
            return tmp;
        };
        Commons.toUTF8Array = function (str) {
            var utf8 = [];
            for (var i = 0; i < str.length; i++) {
                var charcode = str.charCodeAt(i);
                if (charcode < 0x80)
                    utf8.push(charcode);
                else if (charcode < 0x800) {
                    utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
                }
                else if (charcode < 0xd800 || charcode >= 0xe000) {
                    utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
                }
                else {
                    i++;
                    // UTF-16 encodes 0x10000-0x10FFFF by
                    // subtracting 0x10000 and splitting the
                    // 20 bits of 0x0-0xFFFFF into two halves
                    charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                        | (str.charCodeAt(i) & 0x3ff));
                    utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
                }
            }
            return utf8;
        };
        Commons.fromUTF8Text = function (str) {
            var data = [];
            var datastr = [];
            var i;
            datastr = str.split('-');
            for (i = 0; i <= datastr.length - 1; i++) {
                data.push(parseInt(datastr[i], 10));
            }
            return TPClient.Commons.fromUTF8Array(data);
        };
        Commons.fromUTF8Array = function (data) {
            var str = '', i;
            for (i = 0; i < data.length; i++) {
                var value = data[i];
                if (value < 0x80) {
                    str += String.fromCharCode(value);
                }
                else if (value > 0xBF && value < 0xE0) {
                    str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
                    i += 1;
                }
                else if (value > 0xDF && value < 0xF0) {
                    str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
                    i += 2;
                }
                else {
                    // surrogate pair
                    var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;
                    str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
                    i += 3;
                }
            }
            return str;
        };
        Commons.IsWhiteColor = function (Color) {
            var tmpColor;
            tmpColor = Color.toLowerCase().trim();
            //words
            if (tmpColor == "white") {
                return true;
            }
            //hex notation
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            tmpColor = tmpColor.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(tmpColor);
            if (result != null) {
                if ((parseInt(result[1], 16) == 255) && (parseInt(result[2], 16) == 255) && (parseInt(result[3], 16) == 255)) {
                    return true;
                }
            }
            //rgb and rgba
            if ((tmpColor.indexOf("rgb(") != -1) || (tmpColor.indexOf("rgba(") != -1)) {
                var i;
                var j;
                i = tmpColor.indexOf("(");
                j = tmpColor.indexOf(")");
                if (j != -1) {
                    var data = tmpColor.substring(i + 1, j).split(',');
                    if ((data != null) && (data.length >= 3)) {
                        if ((data[0].trim() == "255") && (data[1].trim() == "255") && (data[2].trim() == "255")) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        Commons.fnFormatNowTime = function () {
            var nowDate = new Date();
            var result;
            result = '';
            if (nowDate.getHours() <= 9) {
                result = result + '0' + nowDate.getHours();
            }
            else {
                result = result + nowDate.getHours();
            }
            result = result + ":";
            if (nowDate.getMinutes() <= 9) {
                result = result + '0' + nowDate.getMinutes();
            }
            else {
                result = result + nowDate.getMinutes();
            }
            result = result + ":";
            if (nowDate.getSeconds() <= 9) {
                result = result + '0' + nowDate.getSeconds();
            }
            else {
                result = result + nowDate.getSeconds();
            }
            return result;
        };
        Commons.GetTinyMCEFontsizeFormats = function () {
            return "8pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt 38pt 40pt";
        };
        Commons.GetTinyMCEFontFormats = function () {
            return "Andale Mono=andale mono,times;" +
                "Arial=arial,helvetica,sans-serif;" +
                "Arial Black=arial black,avant garde;" +
                "Book Antiqua=book antiqua,palatino;" +
                "Comic Sans MS=comic sans ms,sans-serif;" +
                "Courier New=courier new,courier;" +
                "Georgia=georgia,palatino;" +
                "Helvetica=helvetica;" +
                "Impact=impact,chicago;" +
                "Symbol=symbol;" +
                "Tahoma=tahoma,arial,helvetica,sans-serif;" +
                "Terminal=terminal,monaco;" +
                "Times New Roman=times new roman,times;" +
                "Trebuchet MS=trebuchet ms,geneva;" +
                "Verdana=verdana,geneva;" +
                "Webdings=webdings;" +
                "Wingdings=wingdings,zapf dingbats";
        };
        Commons.mlengthMenuDatatable = [1, 3, 5, 10, 50, 100, 200];
        Commons.mPagelengthDefaultDatatable = 10;
        Commons.mMaxPagelengthDefaultDatatable = 200;
        Commons.mModalIndex = 5000;
        Commons.mButtonSpacer = {};
        Commons.mClassesExcelButtonGrid = "fa fa-file-excel-o tpExportToExcelCheckBox";
        Commons.mClassesRefreshButtonGrid = "fa fa-refresh tpNavyColorToolbarDT";
        Commons.mTpAntToolTipDT = 0;
        Commons.mTpActToolTipDT = 0;
        Commons.mTpTotToolTipDT = 0;
        return Commons;
    }());
    TPClient.Commons = Commons;
})(TPClient || (TPClient = {}));
var TPButtonDT = (function () {
    function TPButtonDT() {
    }
    return TPButtonDT;
}());
//# sourceMappingURL=TPC_Commons.js.map