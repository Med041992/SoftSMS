var blackListHEX = "";
var tabADMINMenuitem = 2;
var ExpRSATpCol;
var ModRSATpCol;
var myFunctionDashboardRender = null;
var $contextMenu;
var $itemClicked;
var TPItemMultipleAutocomplete = new Array();

$(document).ready(function () {
	$('input:text').on('drop', function (event) {
		event.preventDefault();
	});
	$("textarea").on('drop', function (event) {
		event.preventDefault();
	});
	try {
		if ($("#MasterBody_ModeTextBox").val() == "Update" || $("#MasterBody_Mode2TextBox").val() == "Update") {
			$("#tpRepeatGenerateCode").parent().remove();
		} else {
			$("#tpRepeatGenerateCode").parent().show();
		}
	} catch (ex) { }


	//setInterval(function () {
	//    $('.TPRenderClass').each(function () {
	//        var myWidth;
	//        var myHeight;

	//        myWidth = $(this).width()
	//        myHeight = $(this).height()

	//        if (parseInt(myWidth, 10) >= 451 || parseInt(myHeight, 10) >= 341) {
	//            $(this).css('border', '1px solid #7a8b98');
	//            $(this).css('padding', '2px');
	//            $(this).css('border-radius', '5px');
	//        }
	//    });
	//},30000)
	generateContextMenuForVerticalTabs();	
});


function generateContextMenuForVerticalTabs() {
	var htl = '<div id="contextMenu" class="dropdown clearfix" style="position: absolute;display: none;z-index:999;">';
	htl += '    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style="display: block; position: static; margin-bottom: 5px;">';
	htl += '        <li data-type="1"><a tabindex="-1" href="#">.Fermer tous sauf cela</a>';
	htl += '        </li>';
	htl += '        <li data-type="2"><a tabindex="-1" href="#">.Fermez toutes les</a>';
	htl += '        </li>';
	htl += '        <li data-type="3"><a tabindex="-1" href="#">.Fermer en bas</a>';
	htl += '        </li>';
	htl += '        <li data-type="4"><a tabindex="-1" href="#">.Près de haut</a>';
	htl += '        </li>';
	htl += '        <li class="divider"></li>';
	htl += '        <li data-type="5"><a tabindex="-1" href="#">.Fermer ce</a>';
	htl += '        </li>';
	htl += '    </ul>';
	htl += '</div>';
	$("body").append(htl);

	$contextMenu = $("#contextMenu");

	$("body").on("contextmenu", "li.tplimenuitem:not(#adminTabLi):not(.cssNoClose)", function (e) {
		$itemClicked = $(this)

		var pageWidth = $(window).width();
		var menuWidth = $contextMenu.width();
		var leftPosition = e.pageX + menuWidth > pageWidth ? e.pageX - menuWidth : e.pageX;

		$contextMenu.css({
			display: "block",
			left: leftPosition,
			top: e.pageY
		});
		return false;
	});

	$contextMenu.on("click", "a", function () {
		//var message = "You clicked on the row '" + $($itemClicked).attr("mv-index") + "'\n"
		//message += "And selected the menu item '" + $(this).parents("li").attr("data-type") + "'"
		fnCloseVerticalTabs($($itemClicked).attr("mv-index"), $(this).parents("li").attr("data-type"));
		$contextMenu.hide();
	});

	$(document).click(function () {
		$contextMenu.hide();
	});
}

function fnCloseVerticalTabs(currentIndex, type) {
	var totalVerticalTabs = 100;//$("li.tplimenuitem:not(#adminTabLi)").length;

	for (var i = 0; i <= totalVerticalTabs; i++) {
		switch (type) {
			case "1": //close all but this
				$("li.tplimenuitem[mv-index=" + i + "]").each(function () {
					if (i != currentIndex) {
						RemoveTabADMIN($(this).attr("id").replace("tabADMINli_", ""));
					}
				});
				break;
			case "2":
				for (var i = 0; i <= totalVerticalTabs; i++) {
					$("li.tplimenuitem[mv-index=" + i + "]").each(function () {
						RemoveTabADMIN($(this).attr("id").replace("tabADMINli_", ""));
					});
				}
				break;
			case "3":
				for (var i = 0; i <= totalVerticalTabs; i++) {
					$("li.tplimenuitem[mv-index=" + i + "]").each(function () {
						if (i > currentIndex) {
							RemoveTabADMIN($(this).attr("id").replace("tabADMINli_", ""));
						}
					});
				}
				break;
			case "4":
				for (var i = 0; i <= totalVerticalTabs; i++) {
					$("li.tplimenuitem[mv-index=" + i + "]").each(function () {
						if (i < currentIndex) {
							RemoveTabADMIN($(this).attr("id").replace("tabADMINli_", ""));
						}
					});
				}
				break;
			case "5":
				RemoveTabADMIN($("li.tplimenuitem[mv-index=" + currentIndex + "]").attr("id").replace("tabADMINli_", ""));
				break;
		}
	}

}


function fnSetlightboxPositionFromTop() {
	var positionFromTop;

	positionFromTop = $(window.parent).scrollTop();
	if (positionFromTop <= 0) {
		positionFromTop = $(window).scrollTop();
		if (positionFromTop <= 0) {
			positionFromTop = 50;
		}
	}

	lightbox.option({
		'positionFromTop': positionFromTop,
		'showImageNumberLabel': false
	})
}

function TPModalDialogWindow() {
	var _this = this;
	this.URL = "";
	this.Div = null;
	this.Iframe = null;
	this.Width = null;
	this.Height = null;
	this.Title = null;
	this.Guid = null;
	this.fnNameToReturn = null;


	this.Init = function (ContentUrl, Width, Height, Title, Guid, fnNameToReturn) {
		this.URL = ContentUrl;
		this.Width = Width;
		this.Height = Height;
		this.Title = Title;
		this.Guid = Guid;
		this.fnNameToReturn = fnNameToReturn;
	}

	this.Show = function () {


		var oneModal = new TPClient.ModalControl(this.URL, this.Title, this.Width, this.Height, this.Guid, this.fnNameToReturn);
	}

	this.Hide = function () {

		window.top.TPClient.Modal.CloseModal(this.Guid);

	}

	this.AdjustPage = function (event, ui) {

	}

	this.fnRemoveAt = function (index) {

	}
}

function fnLoadTPModalDialogTPClient(ContentUrl, Width, Height, Title, Guid, fnNameToReturn) {
	var obj = new TPModalDialogWindow();
	obj.Init(ContentUrl, Width, Height, Title, Guid, fnNameToReturn);
	obj.Show();
}

function fnResizeTPModalDialogTPClient() {
	window.top.TPClient.Modal.RecalcAllModalSizes();
}

function fnTPAutocompleteInitV2(textBoxControl, textBoxCode, url, functionNameToTriggerSelect, functionNameToTriggerChange) {
	//init autocomplete  parameters
	$(textBoxControl).autocomplete({
		source: url,
		minLength: 2,
		autoFocus: true,
		select: function (event, ui) {
			$(textBoxCode).val('');
			if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
				eval(functionNameToTriggerSelect);
			}
			if (ui.item) {
				$(textBoxCode).val(ui.item.id);
				$(textBoxControl).val(htmlDecode(ui.item.value));
				if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
					eval(functionNameToTriggerSelect);
				}
				return false;
			}
		},
		close: function (event, ui) {
			if (functionNameToTriggerChange != '' && functionNameToTriggerChange != null && (typeof functionNameToTriggerChange != "undefined")) {
				try {
					eval(functionNameToTriggerChange);
				} catch (e) { }
			}
		},
		change: function (event, ui) {
		}
	});//end parameters

	//override keydown to special keys
	$(textBoxControl).keydown(function (event) {
		var keyCode = $.ui.keyCode;
		if (
			(event.keyCode == keyCode.TAB) || //TAB
			(event.keyCode == 13) || //ENTER
			(event.keyCode == 16) || //SHIFT
			(event.keyCode == 17) || //CONTROL
			(event.keyCode == 20) || //CAPS_LOCK
			(event.keyCode == 37) || //LEFT
			(event.keyCode == 39) || //RIGHT
			(event.keyCode == 36) || //HOME
			(event.keyCode == 35) || //END
			(event.keyCode == 45) || //INSERT
			(event.keyCode == 18) || //ALT
			(event.keyCode == 91) || //WINDOWS
			(event.keyCode == keyCode.NUMPAD_ENTER) ||
			(event.keyCode == 144) || //NUMLOCK
			(event.keyCode == 27) //ESC
			) {
			//nothing to do
		}
		else {
			$(textBoxCode).val('');
			if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
				try {
					eval(functionNameToTriggerSelect);
				} catch (e) { }
			}
		}
	}); //end override keydown

};

//function to search all
function TPsearchAllitemsAutoCompleteV2(textBoxControl, textBoxCode, functionNameToTriggerSelect, clearTextBox) {
	var bolClearTextbox = false;

	if ($(textBoxControl).data('ui-autocomplete') == undefined) {
		return;
	}
	if (clearTextBox) {
		if (clearTextBox == "1") {
			bolClearTextbox = true;
		}
	}
	if (bolClearTextbox == true) {
		$(textBoxCode).val('');
		$(textBoxControl).val('');
	}

	if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
		try {
			eval(functionNameToTriggerSelect);
		} catch (e) { }
	}
	$(textBoxControl).autocomplete("search", "...");
	$(textBoxControl).focus();

	try {
		TPClient.Commons.clearScreenErrors();
	} catch (e) { }


};

//function to search multiple values
function fnTPAutocompleteInitMultipleValuesV2(textBoxControl, url, functionNameToTriggerSelect) {
	//init autocomplete  parameters
	$(textBoxControl).autocomplete({
		source: url,
		minLength: 2,
		focus: function () {
			return false;
		},
		select: function (event, ui) {

			function split(val) {
				return val.split(/;\s*/);
			}

			if (ui.item) {
				var terms = split($(textBoxControl).val());
				terms.pop();
				terms.push(htmlDecode(ui.item.id));
				terms.push("");
				$(textBoxControl).val(terms.join("; "));

				if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
					eval(functionNameToTriggerSelect);
				}
				return false;
			}
		}
	});  //end parameters

	//override keydown to TAB key
	$(textBoxControl).bind("keydown", function (event) {
		if (event.keyCode === $.ui.keyCode.TAB &&
				$(textBoxControl).data("uiAutocomplete").menu.active) {
			event.preventDefault();
		}
	})

	//override keydown to special keys
	$(textBoxControl).keydown(function (event) {
		var keyCode = $.ui.keyCode;
		if (
			(event.keyCode == keyCode.TAB) || //TAB
			(event.keyCode == 13) || //ENTER
			(event.keyCode == 16) || //SHIFT
			(event.keyCode == 17) || //CONTROL
			(event.keyCode == 20) || //CAPS_LOCK
			(event.keyCode == 37) || //LEFT
			(event.keyCode == 39) || //RIGHT
			(event.keyCode == 36) || //HOME
			(event.keyCode == 35) || //END
			(event.keyCode == 45) || //INSERT
			(event.keyCode == 18) || //ALT
			(event.keyCode == 91) || //WINDOWS
			(event.keyCode == keyCode.NUMPAD_ENTER) ||
			(event.keyCode == 144) || //NUMLOCK
			(event.keyCode == 27) //ESC
			) {
			//nothing to do
		}
		else {
			if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
				eval(functionNameToTriggerSelect);
			}
		}
	}); //end override keydown

};

//function to search multiple values
function fnTPAutocompleteInitMultipleValuesLabelAndValue(textBoxControl, url, guid, preventduplicates, functionNameToTriggerSelect) {
	//init autocomplete  parameters
	$(textBoxControl).autocomplete({
		source: url,
		minLength: 2,
		focus: function () {
			return false;
		},
		select: function (event, ui) {
			function split(val) {
				return val.split(/;\s*/);
			}

			if (ui.item) {
				var oneAutocompleteMatches;
				var terms = split($(textBoxControl).val());
				if (preventduplicates == true) {
					if (terms != '' && terms != null) {
						for (var i = 0; i < terms.length; i++) {
							if (terms[i] == ui.item.value) {
								return false;
							}
						}
					}
				}
				terms.pop();
				terms.push(htmlDecode(ui.item.value));
				terms.push("");
				$(textBoxControl).val(terms.join("; "));

				oneAutocompleteMatches = $.grep(TPItemMultipleAutocomplete, function (e) { return e.guid == guid && e.id == ui.item.id });
				if (oneAutocompleteMatches == '' || oneAutocompleteMatches == null || (typeof oneAutocompleteMatches == "undefined") || oneAutocompleteMatches.length == 0) {
					TPItemMultipleAutocomplete.push(newItemMultipleAutocomplete(guid, ui.item.id, ui.item.value, ui.item.extracol1, ui.item.extracol2, ui.item.extracol3, ui.item.extracol4, ui.item.extracol5));
				}

				if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
					eval(functionNameToTriggerSelect);
				}
				return false;
			}
		}
	});  //end parameters

	//override keydown to TAB key
	$(textBoxControl).bind("keydown", function (event) {
		if (event.keyCode === $.ui.keyCode.TAB &&
				$(textBoxControl).data("uiAutocomplete").menu.active) {
			event.preventDefault();
		}
	})

	//override keydown to special keys
	$(textBoxControl).keydown(function (event) {
		var keyCode = $.ui.keyCode;
		if (
			(event.keyCode == keyCode.TAB) || //TAB
			(event.keyCode == 13) || //ENTER
			(event.keyCode == 16) || //SHIFT
			(event.keyCode == 17) || //CONTROL
			(event.keyCode == 20) || //CAPS_LOCK
			(event.keyCode == 37) || //LEFT
			(event.keyCode == 39) || //RIGHT
			(event.keyCode == 36) || //HOME
			(event.keyCode == 35) || //END
			(event.keyCode == 45) || //INSERT
			(event.keyCode == 18) || //ALT
			(event.keyCode == 91) || //WINDOWS
			(event.keyCode == keyCode.NUMPAD_ENTER) ||
			(event.keyCode == 144) || //NUMLOCK
			(event.keyCode == 27) //ESC
			) {
			//nothing to do
		}
		else {
			if (functionNameToTriggerSelect != '' && functionNameToTriggerSelect != null && (typeof functionNameToTriggerSelect != "undefined")) {
				eval(functionNameToTriggerSelect);
			}
		}
	}); //end override keydown

};

function fnTPAutocompleteDestroy(textBoxControl) {
	if ($(textBoxControl).data('ui-autocomplete') != undefined) {
		$(textBoxControl).autocomplete("destroy");
	}
}

function newItemMultipleAutocomplete(guid, id, value, extracol1, extracol2, extracol3, extracol4, extracol5) {
	var el = new Object();
	el.guid = guid;
	el.id = id;
	el.value = value;
	el.extracol1 = extracol1;
	el.extracol2 = extracol2;
	el.extracol3 = extracol3;
	el.extracol4 = extracol4;
	el.extracol5 = extracol5;
	return el;
}

//Counts the chars in a textbox
//e.g.:
//CountChars(TextBox, 6000, Label);
function CountChars(TextBox, MaxCharsTextBox, Label) {
	var Text;
	MaxChars = parseInt(document.getElementById(MaxCharsTextBox).value);
	Text = document.getElementById(TextBox).value;
	if (Text.length > MaxChars) {
		Text = Text.substring(0, MaxChars);
		document.getElementById(TextBox).value = Text;
	}
	var Length;
	Length = MaxChars - parseInt(Text.length);
	if ($("#" + Label).is(":visible")) {
		if (document.getElementById(Label).textContent) {
			document.getElementById(Label).textContent = Length + " / " + MaxChars;
		} else {
			document.getElementById(Label).innerText = Length + " / " + MaxChars;
		}
	}
}

//Counts the chars in a textbox
//e.g.:
//CountCharsNoCut(TextBox, 6000, Label, CutTextDiv);
function CountCharsNoCut(TextBox, MaxCharsTextBox, Label, CutTextDiv) {
	var Text;
	var Length;
	var SpanText;
	var MaxChars;

	$("#" + CutTextDiv).css("display", "none");
	MaxChars = parseInt($("#" + MaxCharsTextBox).val());
	Text = $("#" + TextBox).val();
	Length = MaxChars - parseInt(Text.length);
	if (Text.length > MaxChars) {
		$("#" + CutTextDiv).css("display", "block");
		SpanText = "<span style='color:red;'>" + Length + "</span>" + " / " + MaxChars;
	}
	else {
		SpanText = "<span style='color:black;'>" + Length + "</span>" + " / " + MaxChars;
	}
	$("#" + Label).html(SpanText);
}


//Resize child iFrames
function ResizeIframe(iframe, height) {
	try {
		document.getElementById(iframe).style.height = height + "px";
	} catch (e) { }
}

//Funcion para trim
String.prototype.trim = function () {
	// skip leading and trailing whitespace
	// and return everything in between
	return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");
}

function replaceAll(originalText, replace, with_this) {
	return originalText.split(replace).join(with_this);
}

function RemoveHTMLTags(originalText) {
	var regex = /(<([^>]+)>)/ig

	originalText = replaceAll(originalText, '&nbsp;', ' ')
	originalText = replaceAll(originalText, '<br />', '\n')
	originalText = replaceAll(originalText, '<br/>', '\n')
	originalText = replaceAll(originalText, '<br >', '\n')
	originalText = replaceAll(originalText, '<br>', '\n')

	return originalText.replace(regex, "");
}

//Function to limit the maximum size the textarea
//placed in the onkeypress onkeyup event
function fnTextboxMultilineMaxNumber(txt, maxLen) {
	try {
		if (txt.value.length > (maxLen - 1)) {
			txt.value = txt.value.substring(0, maxLen);
			return false;
		}
	} catch (e) {
	}
}

//function to open modal windows and no modal windows
function fnModalWindowAndNotModal(URL, W, H, T, L, Modal) {
	var P;
	var R;
	L = L + "";
	T = T + "";

	if ((L == "0" && T == "0") || (L == "" && T == "")) {
		if (W != screen.availWidth) {
			L = (screen.availWidth / 2) - (W / 2);
		}
		if (H != screen.availHeight) {
			T = (screen.availHeight / 2) - (H / 2);
		}
	}

	if (Modal == true) {
		if (navigator.appName == "Microsoft Internet Explorer") {
			P = "dialogHeight:" + H + "px;dialogWidth:" + W + "px;resizable:yes;center:yes";
			R = showModalDialog(URL, "", P);
		}
		else {
			P = "height=" + H + ",width=" + W + ",toolbar=no,scrollbars=yes,menubar=no,resizable=yes,";

			if (L != "") {
				P = P + "left=" + L + ",";
			}
			if (T != "") {
				P = P + "top=" + T + ",";
			}
			P = P + "status=yes";
			window.open(URL, '', P);
		}
	}
	else {
		P = "height=" + H + ",width=" + W + ",toolbar=no,scrollbars=yes,menubar=no,resizable=yes,";
		if (L != "") {
			P = P + "left=" + L + ",";
		}
		if (T != "") {
			P = P + "top=" + T + ",";
		}
		P = P + "status=yes";
		window.open(URL, '', P);
	}
}

function fnDummy() {
	var d = new Date();
	return d.getTime();
}

function fnGetGuid() {
	var d = new Date();
	return d.getTime();
}

function removeByIndex(arrayName, arrayIndex) {
	var tmpArray = new Array();
	var i;
	for (i = 0; i < arrayIndex; i++) {
		tmpArray.push(arrayName[i]);
	}
	for (i = arrayIndex + 1; i <= arrayName.length - 1; i++) {
		tmpArray.push(arrayName[i]);
	}
	return tmpArray;
}

function SetEnd(TB) {
	if (TB.createTextRange) {
		var FieldRange = TB.createTextRange();
		FieldRange.moveStart('character', TB.value.length);
		FieldRange.collapse();
		FieldRange.select();
	}
}

//Password validation
function fnValidatePassWord(control) {
	var RegExPattern = /(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/;
	if ((control.value.match(RegExPattern)) && (control.value != '')) {
		return true;
	} else {
		return false;
	}
}

// ******** Validation Regular Expresion ********

function fnValidateEmail(email) {
	var reg = /^([A-Za-z0-9_\-\.\&/+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,15})$/;
	var emails;
	var validateEmail;
	email = email.replace(/ /ig, "");
	email = email.replace(/,/g, ";");
	validateEmail = email.charAt(email.length - 1);
	if (validateEmail == ';') {
		email = email.substring(0, email.length - 1);
	}
	emails = email.split(";");
	for (i = 0; i < emails.length; i++) {
		if (!reg.test(emails[i].trim())) {
			return false;
		}
	}
	return true;
}


//Validation later
function fnIsNumeric(ValueNumber) {
	/*****************************************************************
	DESCRIPTION: Validates that a string contains only valid numbers.

	PARAMETERS:
	ValueNumber - String to be tested for validity

	RETURNS:
	True if valid, otherwise false.
	******************************************************************/
	var patron = /(^-\d*\.?\d*[0-9]+\d*$)|(^-[0-9]+\d*\.\d*$)(^[0-9]*[0-9]+[0-9]*\.[0-9]*$)|(^[0-9]*\.[0-9]*[0-9]+[0-9]*$)|(^[0-9]*[0-9]+[0-9]*$)/;
	//check for numeric characters
	return patron.test(ValueNumber);
}

//Validation later - Only Integer
function fnIsNumericOnlyInteger(ValueNumber) {
	/*****************************************************************
	DESCRIPTION: Validates that a string contains only valid numbers.

	PARAMETERS:
	ValueNumber - String to be tested for validity

	RETURNS:
	True if valid, otherwise false.
	******************************************************************/
	var patron = /^[0-9]+$/;
	//check for numeric characters
	return patron.test(ValueNumber);
}


/*
	DESCRIPTION: Validates that a key code is in (-.0123456789)
	PARAMETERS:
	RETURNS:
	True if valid, otherwise false.
*/
function fnValidateKeyNumber(e) {
	var key = (document.all) ? e.keyCode : e.which;
	if (key == 8 || key == 9 || key == 0) return true;
	//if (key == 8) return true;
	var patron = /[-.0123456789]/;
	te = String.fromCharCode(key);
	return patron.test(te);
}

//Use Mode:
//onkeypress = "return fnValidateOnlyNumbers(event)"
function fnValidateOnlyNumbers(e) {
	var key = (document.all) ? e.keyCode : e.which;
	if (key == 8 || key == 9 || key == 0) return true;
	var patron = /\d/;  // Solo acepta números
	te = String.fromCharCode(key);
	return patron.test(te);
}


//Use Mode:
//onkeypress = "return fnValidateTextAZ(event)"
function fnValidateTextAZ(e) {
	var key = (document.all) ? e.keyCode : e.which;
	if (key == 8) return true;
	patron = /[A-Za-z\s]/; //  letras mayúsculas A-Z, letras minúsculas a-z y el espacio \s
	te = String.fromCharCode(key);
	return patron.test(te);
}

//Use Mode:
//onkeypress = "return fnValidateLyricsAndNumbers(event)"
function fnValidateLyricsAndNumbers(e) {
	var key = (document.all) ? e.keyCode : e.which;
	if (key == 8) return true;
	patron = /\w/; // Acepta números y letras
	te = String.fromCharCode(key);
	return patron.test(te);
}

//Use Mode:
//onkeypress = "return fnValidateNoNumbers(event)"
function fnValidateNoNumbers(e) {
	var key = (document.all) ? e.keyCode : e.which;
	if (key == 8) return true;
	patron = /\D/; // No acepta números
	te = String.fromCharCode(key);
	return patron.test(te);
}
//Use Mode:
//onblur="fnValidateRequiredNumbersAndLetters(this);"
// Por lo menos un digito y una letra, entre 2 y 8 caracteres
function fnValidateRequiredNumbersAndLetters(control) {
	var RegExPattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,10})$/;
	if ((control.value.match(RegExPattern)) && (control.value != '')) {
		return true;
	} else {
		return false;
	}
}

function fnValidateWhiteList(Chars, WhiteList) {
	var i;
	var j;
	var bolEncontro;
	var car;
	//WhiteList = WhiteList + " ";

	Chars = replaceAll(Chars, new RegExp("\\n", "g"), "");
	Chars = replaceAll(Chars, "\n", "");
	Chars = replaceAll(Chars, "\r", "");

	for (i = 1; i <= Chars.length; i++) {
		car = Chars.charAt(i - 1);
		bolEncontro = false;
		for (j = 1; j <= WhiteList.length; j++) {
			if (car == WhiteList.charAt(j - 1)) {
				bolEncontro = true;
				break;
			}
		}
		if (bolEncontro == false) {
			return car;
		}
	}
	return "OK";
}

function fnDateDiff(datepart, fromdate, todate) {
	datepart = datepart.toLowerCase();
	var diff = todate - fromdate;
	var divideBy = {
		w: 604800000,
		d: 86400000,
		h: 3600000,
		n: 60000,
		s: 1000
	};

	return Math.floor(diff / divideBy[datepart]);
}

//Change the color of a row onmouseover=fnOver(this,'#c6d8e6'); fnOut=fnFuera(this,'');
function fnRowOver(src, color_sobre) {
	if (!src.contains(event.fromElement)) {
		src.style.cursor = "default";
		src.bgColor = color_sobre;
		src.FontColor = "ff0000";
	}
}
function fnRowOut(src, color_fuera) {
	if (!src.contains(event.toElement)) {
		src.style.cursor = "default";
		src.bgColor = color_fuera;
	}
}

function viewportWidth() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return e[a + 'Width'];
}

function viewportHeight() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return e[a + 'Height'];
}

function viewportWidthParent() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = parent.document.documentElement || window.parent.document.body;
	}
	return e[a + 'Width'];
}

function viewportHeightParent() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = parent.document.documentElement || window.parent.document.body;
	}
	return e[a + 'Height'];
}

function getWidthJQ() {
	return $(window).width();
}

function getHeightJQ() {
	return $(window).height();
}

function getWidthParentJQ() {
	return $(parent.window).width();
}

function getHeightParentJQ() {
	return $(parent.window).height();
}

function getScreenProperties() {
	return {
		width: screen.width,
		height: screen.height,
		availWidth: screen.availWidth,
		availHeight: screen.availHeight
	}
}


function focusControl(objControl) {
	var value = objControl.value;

	try {
		objControl.focus();
		objControl.value = value;
	} catch (e) { }
}

function accordionNavigate(objAccordion, index) {
	try {
		objAccordion.accordion("option", "active", index);
	} catch (e) { }
}

function parseURL(url) {
	var e = /((http|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+\.[^#?\s]+)(#[\w\-]+)?/;

	if (url.match(e)) {
		return {
			url: RegExp['$&'],
			protocol: RegExp.$2,
			host: RegExp.$3,
			path: RegExp.$4,
			file: RegExp.$6,
			hash: RegExp.$7
		};
	}
	else {
		return { url: "", protocol: "", host: "", path: "", file: "", hash: "" };
	}
}

function fnLinkTAGs(url, parameters, externalpublickey, pageWidth, pageHeight) {
	var caseId;
	var customerId;
	var i;
	var originalUrl;
	var DataToSend;

	if (!pageWidth) {
		pageWidth = "0";
	}
	if (!pageHeight) {
		pageHeight = "0";
	}
	if (pageWidth.trim() == "") {
		pageWidth = "0";
	}
	if (pageHeight.trim() == "") {
		pageHeight = "0";
	}

	originalUrl = url;
	if (!parameters) {
		parameters = "";
	}
	parameters = replaceAll(parameters, "?", "");
	if (parameters.substring(0, 0) == "&") {
		parameters = parameters.substring(1);
		if (!parameters) {
			parameters = "";
		}
	}
	i = url.indexOf("?");
	if (parameters.trim() != "") {
		if (i != -1) {
			url = url + "&" + parameters + "&dummy=" + fnDummy();
		}
		else {
			url = url + "?" + parameters + "&dummy=" + fnDummy();
		}
	} else {
		if (i != -1) {
			url = url + "&dummy=" + fnDummy();
		}
		else {
			url = url + "?dummy=" + fnDummy();
		}
	}

	//Render
	caseId = 0;
	customerId = 0;
	try {
		caseId = document.getElementById("MasterBody_IdCaseTextBox").value;
	} catch (e) {
		try {
			caseId = document.getElementById("MasterBody_CaseIdHidden").value;
		} catch (e) {
			caseId = 0;
		}
	}
	try {
		customerId = parent.document.getElementById("MasterBody_IdSubsidiaryOrganizationTextBox").value;
		if (customerId.trim() == "") {
			customerId = parent.document.getElementById("MasterBody_IdSubsidiaryTextBox").value;
			if (customerId.trim() == "") {
				customerId = 0;
			} else {
				customerId = "SUBS|" + parent.document.getElementById("MasterBody_IdSubsidiaryTextBox").value;
			}
		} else {
			customerId = "SUOR|" + parent.document.getElementById("MasterBody_IdSubsidiaryOrganizationTextBox").value;
		}
	} catch (e) { }

	i = url.indexOf('[');
	if (i != -1) {
		if (customerId == 0) {
			try {
				customerId = document.getElementById("MasterBody_IdSubsidiaryOrganizationTextBox").value;
				if (customerId.trim() == "") {
					customerId = document.getElementById("MasterBody_IdSubsidiaryTextBox").value;
					if (customerId.trim() == "") {
						customerId = 0;
					} else {
						customerId = "SUBS|" + document.getElementById("MasterBody_IdSubsidiaryTextBox").value;
					}
				} else {
					customerId = "SUOR|" + document.getElementById("MasterBody_IdSubsidiaryOrganizationTextBox").value;
				}
			} catch (e) { }
		}

		DataToSend = "urlToParse=" + encodeToHex(url) + "&expk=" + externalpublickey + "&caseID=" + caseId + "&customerID=" + customerId + "&dummy=" + fnDummy();
		$.ajax({
			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
			cache: false,
			async: true,
			url: 'ADDA_ParseParameters.aspx',
			data: DataToSend,
			type: 'POST',
			datatype: 'html',
			success: function (msg) {
				if (msg == '') {
					window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
				}
				else {
					var result;
					try {
						result = msg.split("|");
						if (result[0] == '1') {
							url = decodeFromHex(result[1]);
							//Run
							fnRunLinkTAGs(url, pageWidth, pageHeight);
						}
						else {
							window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
						}

					}
					catch (e) {
						window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
					}
				}
			},
			error: function (msg) {
				window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
			},
			timeout: 10000
		});
	} else {
		//Run
		fnRunLinkTAGs(url, pageWidth, pageHeight);
	}
}

function fnGetValue(url, parameters, externalpublickey, indexControl) {
	var paramConfirm = new Array();
	paramConfirm.push(url);
	paramConfirm.push(parameters);
	paramConfirm.push(externalpublickey);
	paramConfirm.push(indexControl);
	window.top.TPClient.Commons.tpConfirm('.Êtes-vous certain de que vouloir obtenir la valeur ? ',
								window.top.fnGetGlobalResource('OkButton'),
								window.top.fnGetGlobalResource('CancelButton'),
								window.fnRealGetValue, paramConfirm, null, null
								);
}

function fnRealGetValue(paramConfirm) {
	var caseId;
	var customerId;
	var i;
	var originalUrl;
	var DataToSend;
	var r;
	var url = paramConfirm[0];
	var parameters = paramConfirm[1];
	var externalpublickey = paramConfirm[2];
	var indexControl = paramConfirm[3];

	if (!parameters) {
		parameters = "";
	}
	parameters = replaceAll(parameters, "?", "");
	if (parameters.substring(0, 0) == "&") {
		parameters = parameters.substring(1);
		if (!parameters) {
			parameters = "";
		}
	}

	//Render
	caseId = 0;
	customerId = 0;
	try {
		caseId = document.getElementById("MasterBody_IdCaseTextBox").value;
	} catch (e) {
		try {
			caseId = document.getElementById("MasterBody_CaseIdHidden").value;
		} catch (e) {
			caseId = 0;
		}
	}
	try {
		customerId = parent.document.getElementById("MasterBody_IdSubsidiaryOrganizationTextBox").value;
		if (customerId.trim() == "") {
			customerId = parent.document.getElementById("MasterBody_IdSubsidiaryTextBox").value;
			if (customerId.trim() == "") {
				customerId = 0;
			} else {
				customerId = "SUBS|" + parent.document.getElementById("MasterBody_IdSubsidiaryTextBox").value;
			}
		} else {
			customerId = "SUOR|" + parent.document.getElementById("MasterBody_IdSubsidiaryOrganizationTextBox").value;
		}
	} catch (e) { }

	i = parameters.indexOf('[');
	if (i != -1) {
		DataToSend = "urlToParse=" + encodeToHex(parameters) + "&expk=" + externalpublickey + "&caseID=" + caseId + "&customerID=" + customerId + "&dummy=" + fnDummy();
		$.ajax({
			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
			cache: false,
			async: true,
			url: 'ADDA_ParseParameters.aspx',
			data: DataToSend,
			type: 'POST',
			datatype: 'html',
			success: function (msg) {
				if (msg == '') {
					window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
				}
				else {
					var result;
					try {
						result = msg.split("|");
						if (result[0] == '1') {
							parameters = decodeFromHex(result[1]);
							fnRunGetValue(url, parameters, indexControl);
						}
						else {
							window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
						}

					}
					catch (e) {
						window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
					}
				}
			},
			error: function (msg) {
				window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
			},
			timeout: 10000
		});
	} else {
		fnRunGetValue(url, parameters, indexControl);
	}
}

function fnRunGetValue(url, parameters, indexControl) {
	var code;
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		cache: false,
		async: true,
		url: url,
		data: parameters,
		type: 'POST',
		datatype: 'html',
		success: function (msg) {
			if (msg == '') {
				window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
			}
			else {
				var obj = $.parseJSON(msg);
				code = obj[0].ResponseCode;
				if (code != "") {
					window.top.TPClient.Commons.tpAlertError(code + " - " + obj[0].ResponseDescription)
				} else {
					document.getElementById("MasterBody_LabelValueFromURL_" + indexControl).innerHTML = obj[0].Values[0].Value;
					document.getElementById("MasterBody_Data_" + indexControl).value = obj[0].Values[0].Value;
				}
			}
		},
		error: function (msg) {
			window.top.TPClient.Commons.tpAlertError('.Erreur de communication');
		},
		timeout: 10000
	});
}

function fnRunLinkTAGs(url, pageWidth, pageHeight) {
	var guidId = "";
	if (url.indexOf("CASE_Response_AddTask.aspx") != -1) {
		url = replaceAll(url, "idCase=[CaseNumber]", "idCase=");
		//Loading the case guid for insert the temporary task
		try {
			guidId = parent.document.getElementById("MasterBody_GuidAdditionalDataScriptTextBox").value;
		} catch (e) {
			guidId = "-999";
		}

		if (guidId.trim() !== "" && guidId.trim() !== "-999") {
			url = url + "&guid=" + guidId;
		}
	}

	try {
		if (!pageWidth || pageWidth == "") {
			pageWidth = "0";
		}
		if (!pageHeight || pageHeight == "") {
			pageHeight = "0";
		}

		if (pageWidth == "0" && pageHeight == "0") {
			pageWidth = screen.availWidth;
			pageHeight = screen.availHeight;
		}
	} catch (e) { }

	try {
		fnModalWindowAndNotModal(url, pageWidth, pageHeight, 0, 0, false);
	} catch (e) { }
}

function encodeToHex(str) {
	var r = "";
	var e = str.length;
	var c = 0;
	var h;
	while (c < e) {
		h = str.charCodeAt(c++).toString(16);
		while (h.length < 2) h = "0" + h;
		r += h;
	}
	return r;
}

function decodeFromHex(str) {
	var r = "";
	var e = str.length;
	var s;
	while (e > 0) {
		s = e - 2;
		r = String.fromCharCode("0x" + str.substring(s, e)) + r;
		e = s;
	}
	return r;
}

function toUpperCaseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function validateURL(url) {
	var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

	if (RegExp.test(url)) {
		return true;
	} else {
		return false;
	}
}

// ********Twitter********
function fnValidateTwitterAccount(account) {
	var RegExp = /^@(\w){1,15}$/;

	if (RegExp.test(account)) {
		return true;
	} else {
		return false;
	}
}

function fnViewTweetInTwitter(tweetId, sender) {
	var url;
	var W;
	var H;
	W = 700;
	H = 650;
	url = "https://twitter.com/" + sender + "/statuses/" + tweetId;
	fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnViewSenderInTwitter(sender) {
	var url;
	var W;
	var H;
	W = 950;
	H = 650;
	url = "https://twitter.com/" + sender;
	fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnViewTwitterMessageInTPClient(tweetId, senderId) {
	var myDummy;
	var url;

	myDummy = fnGetGuid();

	url = "Twitter_ViewConversation.aspx?tweetId=" + tweetId + "&senderId=" + senderId + "&dummy=" + myDummy;
	window.parent.parent.LoadingModal.Show();
	window.parent.parent.fnLoadTPModalDialogTPClient(url, "sm", "lg", '', myDummy, null);
}

// ********Facebook********
function fnViewPostInFacebook(PostId) {
	var myDummy;
	var url;
	var W;
	var H;

	myDummy = fnGetGuid();

	W = 950;
	H = 650;
	url = "Facebook_ViewPost.aspx?idPost=" + PostId + "&dummy=" + myDummy;
	fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnViewSenderInFacebook(UserName) {
	var url;
	var W;
	var H;
	W = 950;
	H = 650;
	url = "https://www.facebook.com/" + UserName;
	fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnViewFacebookMessageInTPClient(ThreadId, PageId) {
	var myDummy;
	var url;

	myDummy = fnGetGuid();

	url = "Facebook_ViewConversation.aspx?ThreadId=" + ThreadId + "&PageId=" + PageId + "&MessageSourceType=DB&dummy=" + myDummy;
	window.parent.parent.LoadingModal.Show();
	window.parent.parent.fnLoadTPModalDialogTPClient(url, "sm", "lg", '', myDummy, null);
}

function fnViewVideoInFacebook(link) {
	var url;
	var W;
	var H;
	W = 950;
	H = 650;    
	url = TPClient.Commons.fromUTF8Text(link);    
	fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnListenAudioInFacebook(link) {
    var url;
    var W;
    var H;
    W = 950;
    H = 650;
    url = TPClient.Commons.fromUTF8Text(link);
    fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

// ********Google+********
function fnViewPostGooglePlusInTPClient(PostId) {
	var myDummy;
	var url;

	myDummy = fnGetGuid();
	url = "GooglePlus_ViewConversation.aspx?PostId=" + PostId + "&dummy=" + myDummy;
	window.parent.parent.LoadingModal.Show();
	window.parent.parent.fnLoadTPModalDialogTPClient(url, "sm", "md", '', myDummy, null);
}

function fnViewSenderInGooglePlus(UserName) {
	var url;
	var W;
	var H;
	W = 950;
	H = 650;
	url = "https://plus.google.com/" + UserName + '/posts';
	fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}



// ********Instagram********
function fnViewPostInSocialMedia(parameters) {
    var myDummy;
    var url;
    var W;
    var H;

    myDummy = fnGetGuid();

    W = 950;
    H = 650;
    
    url = "SMVP_ViewPost.aspx?parameters=" + parameters + "&dummy=" + myDummy;
    fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnViewSenderInInstagram(parameters) {
    var url;
    var W;
    var H;
    var userName;

    W = 950;
    H = 650;
    userName = parameters.split("|")[2];
    url = "https://www.instagram.com/" + userName;
    fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnViewSenderInFacebookV2(parameters) {
    var url;
    var W;
    var H;
    var userName;

    W = 950;
    H = 650;
    userName = parameters.split("|")[2];
    url = "https://www.facebook.com/" + userName;
    fnRedirectTweetFacebookGooglePlusURL(url, W, H);
}

function fnRedirectTweetFacebookGooglePlusURL(URL, W, H) {
	var T;
	var L;
	L = (screen.availWidth / 2) - (W / 2);
	T = (screen.availHeight / 2) - (H / 2);
	fnModalWindowAndNotModal(URL, W, H, T, L, false);
}

function fnOpenCaseInCaseResponsePage(IdCase, IdCaseEncrypted) {
	window.top.TPClient.MainPage.fnOpenCaseInTab(IdCase, IdCaseEncrypted, "", window.top.TPClient.CaseResponseSourceType.GENERAL);
}

function fnViewKnowledgeBaseDocument(DocumentLanguageId, Hits, SourceType) {
	var url;
	var width;
	var height;
	if (DocumentLanguageId.trim() == '') {
		return;
	}
	width = (screen.availWidth - 20);
	height = (screen.availHeight - 70);

	url = 'DOCU_ViewDocument.aspx?DocumentLanguageId=' + DocumentLanguageId + "&Hits=" + Hits + "&SourceType=" + SourceType + "&dummy=" + fnDummy();
	fnModalWindowAndNotModal(url, width, height, 0, 0, false);
}

function fnViewBulkDataFull(BulkDataId) {
	var myDummy;
	var url;

	myDummy = fnGetGuid();

	url = "BUDA_Viewer.aspx?BulkDataId=" + BulkDataId + "&dummy=" + myDummy;
	window.parent.parent.LoadingModal.Show();
	window.parent.parent.fnLoadTPModalDialogTPClient(url, "md", "lg", '', myDummy, null);
}

function fnLoadToolTips() {
	var ID = "";
	$(".tooltip").each(function () {
		ID = $(this).attr("id");
		ID = "#" + ID;
		$(this).removeAttr("onmouseover");
		fnToolTipBRAN(ID, ID, '.Aide additionnelle ');
	});
}

function fnToolTipBRAN(IDControl, IdBranch, title) {
	try {
		$(IDControl).qtip({
			content: {
				text: 'Chargement...',
				title: {
					text: title,
					button: true
				},
				ajax: {
					url: 'BRAN_Tooltip.aspx?dummy=' + fnDummy(),
					type: 'POST',
					loading: false,
					data: 'id=' + IdBranch
				}
			},
			show: { solo: true, event: 'mouseover' }, // Show it on mouseover
			hide: {
				delay: 100,
				fixed: true // We'll let the user interact with it
			},
			position: {
				my: "left top",
				at: "top right"
			}
			/*,
			style: {
				classes: "qtip-tipped"
			}*/
		});
	} catch (e) {
	}

}

function fnClearQToolTip(idBranch, targetControl) {
	try {
		$('#' + targetControl).qtip('destroy', true);
		$('#' + targetControl).qtip("focus");
		$('#' + targetControl).removeAttr("title");
	} catch (e) { }
}

function setToolTipBRAN(idBranch, targetControl) {
	var ID = "";
	//Remove
	fnClearQToolTip(idBranch, targetControl);

	//Qtip
	if (idBranch.trim() == "") {
		return false;
	}
	ID = "#" + targetControl;
	fnToolTipBRAN(ID, idBranch, '.Aide additionnelle ');
}

function fnLoadBlackListServer(xblackListHEX) {
	blackListHEX = xblackListHEX;
}

function fnValidateBlackListString(strWord) {
	var blackList = "";
	var i;
	var j;
	var car;
	var bolEncontro;

	blackList = decodeFromHex(blackListHEX);
	if (blackList == "") {
		//Error
		return "-999";
	}

	blackList = blackList + ";" + "&";

	//Check word on black list
	for (i = 1; i <= strWord.length; i++) {
		car = strWord.charAt(i - 1);
		bolEncontro = false;
		for (j = 1; j <= blackList.length; j++) {
			if (car == blackList.charAt(j - 1)) {
				bolEncontro = true;
				break;
			}
		}
		if (bolEncontro == true) {
			return car;
		}
	}
	//Ok
	return "1";
}

//Validate Domain and User
function fnValidateDomainAndUser(text) {
	var index;
	index = text.indexOf('\\');

	if (index != -1) {
		if (index == 0 || index == text.length - 1) {
			return false;
		}
		index1 = text.indexOf('\\', index + 1);
		if (index1 != -1) {
			return false;
		}
		return true;
	}
	return false;
}

function Left(str, n) {
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else
		return String(str).substring(0, n);
}

function Right(str, n) {
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

function fnCheckContainsHTLMTags(text) {
	return text.match(/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/)
}

function htmlEncode(value) {
	//create a in-memory div, set it's inner text(which jQuery automatically encodes)
	//then grab the encoded contents back out.  The div never exists on the page.
	return $('<div/>').text(value).html();
}

function htmlDecode(value) {
	return $('<div/>').html(value).text();
}

function TPClientInsertAtCursor(myField, myValue) {
	myValue = myValue.replace(/TPENTER/ig, '\r\n')
	var caretPos = document.getElementById(myField).selectionStart;
	var textAreaTxt = $("#" + myField).val();
	var txtToAdd = myValue;

	if (!caretPos || caretPos == "") {
		caretPos = textAreaTxt.length;
	}

	$("#" + myField).val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos));
}

function insertAtCursorOld(myField, myValue) {
	myValue = myValue.replace(/TPENTER/ig, '\r\n')
	//IE support
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
		//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
					  + myValue
					  + myField.value.substring(endPos, myField.value.length);
	} else {
		myField.value += myValue;
	}
}

function fixConsoleObjectIEnotIncluded() {

	var methods = [
					'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
					'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
					'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
					'timeStamp', 'trace', 'warn'
	];
	var i;
	var console = (window.console = window.console || {});
	for (i = 0; i <= methods.length - 1; i++) {
		if (!console[methods[i]]) {
			console[methods[i]] = function () { };
		}
	}
}

fixConsoleObjectIEnotIncluded();

// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
$.fn._scrollable = function () {
	return this.map(function () {
		var elem = this,
			isWin = !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;

		if (!isWin)
			return elem;

		var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

		return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
			doc.body :
			doc.documentElement;
	});
};

function fnCreateNewTabADMIN(tabID, idEncrypted, tabTitle, parameters, bolSelectTab, bolTitleDescription, mode, tabClass, faColor, bolCloseButton, topic, bolActiveTAB) {
	var myReturn;

	if (topic == null || topic == undefined) {
		topic = "";
	}

	myReturn = fnCreateVerticalTAB(tabADMINMenuitem, tabID, idEncrypted, tabTitle, parameters, bolSelectTab, bolTitleDescription, mode, tabClass, faColor, bolCloseButton, topic, bolActiveTAB);

	if (topic == "OB_MANAGEMENT") {
		myReturn = window.top.TPClient.MainPage.fnCreateNewTabADMIN(tabADMINMenuitem, tabID, idEncrypted, tabTitle, parameters, bolSelectTab, bolTitleDescription, mode, tabClass, faColor, bolCloseButton, topic, bolActiveTAB);
	}

	return myReturn;
}

function fnCreateVerticalTAB(tabADMINMenuitem,tabID, idEncrypted, tabTitle, parameters, bolSelectTab, bolTitleDescription, mode, tabClass, faColor, bolCloseButton, topic, bolActiveClass) {
	var count;
	var tab_title;
	var existsdiv;
	var whichdiv;
	var controlName;
	var oldTitle = tabTitle;
	var myFaColor = "";
	var cssNoClose = "";
	var tpclientItemMenuActiveAdmin = "tpclientItemMenuInactiveAdmin";

	if (topic == null || topic == undefined) {
		topic = "";
	}

	if (bolActiveClass == null || bolActiveClass == undefined) {
		bolActiveClass = true;
	}

	if (bolActiveClass == true) {
		tpclientItemMenuActiveAdmin = "tpclientItemMenuActiveAdmin";
	}

	if (bolCloseButton == null || bolCloseButton == undefined) {
		bolCloseButton = true;
	}

	if (bolCloseButton == false) {
		cssNoClose = " cssNoClose ";
	}

	tab_title = tabTitle;
	tab_title = tab_title.replace(/\'/ig, "&apos;");
	tab_title = tab_title.replace(/\"/ig, "&quot;");
	tab_title = tab_title + " (" + tabID.replace(/\'/ig, "\'") + ")";

	tabID = tabID.trim();
	tabID = tabID.replace(/\_/ig, "TPTABS50PIPEREPLACE");
	count = 0;
	existsdiv = false;
	whichdiv = "";

	$(".tpalertlimenu").each(function (i, obj) {
		$(this).removeClass("alert");
		$(this).removeClass("alert-info");
	});

	$(".tabADMINDiv").each(function (i, obj) {
		if (obj.id.split('_')[2] == tabID) {
			existsdiv = true;
			whichdiv = obj.id.split('_')[1] + "_" + tabID;
		}
	});


	$(".tplimenuitemi").each(function (i, obj) {
		if ((obj.id.split('_')[2] == 'easyMenuNewButton') || (obj.id.split('_')[2] == 'easyMenuNewButtonItem')
			|| (obj.id.split('_')[2] == 'easyMenuCloneButton') || (obj.id.split('_')[2] == 'easyMenuMergeButton')
			|| (obj.id == "adminTabI") || (obj.id.indexOf("EXPORTCURRENT") != -1) || (obj.id.indexOf("EXPORTALL") != -1)
			|| (obj.id.indexOf("BULKLOAD") != -1) || (obj.id.indexOf("RUN") != -1)) {
			//nothing to do
		}
		else {
			count = parseInt($(obj).find("sub").html(), 10);
		}
	});

	if (!existsdiv) {
		//tab not exists
		controlName = tabADMINMenuitem + "_" + tabID;

		var newdiv;
		var newiframe;
		//var newClose;
		var html;
		newdiv = document.createElement("div");
		newdiv.id = "tabADMINDiv_" + controlName;
		newdiv.style.height = "750px"
		newdiv.style.display = "none";

		newiframe = document.createElement("iframe");

		newiframe.setAttribute("allowfullscreen", "true")
		newiframe.setAttribute("mozallowfullscreen", "true")
		newiframe.setAttribute("webkitallowfullscreen", "true")

		newiframe.src = "about:blank";
		newiframe.id = "tabADMINIframeMenuitem" + controlName;
		newiframe.name = "tabADMINIframeMenuitem" + controlName;
		newiframe.width = "100%";
		newiframe.height = "750px";
		newiframe.frameBorder = "0";

		newdiv.appendChild(newiframe);
		$("#otherDivs").append(newdiv);

		$("#tabADMINIframeMenuitem" + controlName).addClass("tpIframeVerticalContent");
		var elCount = tabADMINMenuitem;
		if (tabID == 'easyMenuNewButton') {
			if (tabClass == undefined || tabClass == "" || tabClass == null) {
				tabClass = "fa fa-file"
			}
			tabID = tabADMINMenuitem + "_" + tabID;

			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='" + tabClass + " " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose'  onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID == 'easyMenuNewButtonItem') {
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa fa-file " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose' onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID == 'easyMenuCloneButton') {
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa fa-files-o " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose' onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID == 'easyMenuMergeButton') {
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa fa-object-ungroup " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose' onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID.split("TPTABS50PIPEREPLACE")[0] == 'EXPORTCURRENT') {
			//Export Current
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa fa-sign-out " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose' onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID.split("TPTABS50PIPEREPLACE")[0] == 'EXPORTALL') {
			//Export All
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa fa-sign-out " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose' onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID.split("TPTABS50PIPEREPLACE")[0] == 'BULKLOAD') {
			//Export Current
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa fa-sign-in " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose' onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID.split("TPTABS50PIPEREPLACE")[0] == 'RUN') {
			//Export Current
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tabTitle + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa fa-play-circle-o " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'></i>";
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose' onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#adminTabLi").after(html);
		} else if (tabID.split("TPTABS50PIPEREPLACE")[0] == 'easyMenuOtherButton') {
			tab_title = oldTitle + " (" + tabID.split("TPTABS50PIPEREPLACE")[1] + ")";
			//Other tabs
			tabID = tabADMINMenuitem + "_" + tabID;

			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tab_title + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span>";
			if (parseInt(tabID.split("TPTABS50PIPEREPLACE")[1], 10) > 1000000) {
				html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'><span class='tpOtherTab1Admin'>" + tabID.split("TPTABS50PIPEREPLACE")[1] + "</span></i>";
			} else {
				//Normal
				html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" class='fa " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'><span class='tpOtherTab2Admin'>" + tabID.split("TPTABS50PIPEREPLACE")[1] + "</span></i>";
			}
			html = html + "&nbsp;&nbsp;&nbsp;";
			if (bolCloseButton == true) {
				html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose'  onclick=\"RemoveTabADMIN('" + tabID + "',true);\"  id='tabADMINliiclose_" + tabID + "' ></span>";
			}
			html = html + "</span>";
			html = html + "</a></li>";

			$("#menuList").append(html);
		} else {
			if (tabClass == undefined || tabClass == "" || tabClass == null) {
				tabClass = "fa fa-pencil-square-o"
			}
			if (mode == "DASHBOARD") {
				tabClass = "fa fa-line-chart"
				if (faColor != null && faColor != undefined) {
					if (faColor != "rgba(0,0,0,0)") {
						myFaColor = "color: " + faColor;
					}
				}
			}
			count = count + 1;
			tabID = tabADMINMenuitem + "_" + tabID;
			html = "<li mv-index='" + elCount + "' id='tabADMINli_" + tabID + "' class='" + tpclientItemMenuActiveAdmin + " tplimenuitem" + cssNoClose + "' title='" + tab_title + "'><a  href='javascript:void(0);' style='text-decoration: none;'>";
			html = html + "<span  >";
			html = html + "<i onclick=\"SelectTab('" + tabID + "','" + idEncrypted + "','" + parameters + "','" + mode + "');\" style='" + myFaColor + "' class='" + tabClass + " " + tpclientItemMenuActiveAdmin + "I tplimenuitemi' id='tabADMINlii_" + tabID + "'>";
			if (topic != "OB_MANAGEMENT") {
				html = html + " <sub class='badge-vertical-tab' style='background-color:#E74C3C;border-radius:6px;font-size:9px;padding:4px;color:white;'>" + count + "</sub>";
			}
			html = html + "     <span class='clsMyTimer'></span>";
			html = html + "</i>";

			if (topic == "OB_MANAGEMENT") {
				html = html + "<i id='pushIcon_" + tabID + "' class='icon-tabv' style='position: absolute;'></i>";
			}

			html = html + "&nbsp;&nbsp;&nbsp;";
			if (mode == "DASHBOARD") {
				html = html + "<span>&nbsp;</span>";
			} else {
				if (bolCloseButton == true) {
					html = html + "<span class='fa fa-times-circle " + tpclientItemMenuActiveAdmin + "Iclose tplimenuitemiclose'  onclick=\"RemoveTabADMIN('" + tabID + "');\"  id='tabADMINliiclose_" + tabID + "' ></span>";
				}
			}
			html = html + "</span>";

			html = html + "</a></li>";

			$("#menuList").append(html);
		}


		$("#tabADMINDiv_" + controlName).addClass("tabADMINDiv");

		tabADMINMenuitem++;
		if (topic == "") {
			SelectTab(tabID, idEncrypted, parameters, mode);
		}

		try {
			setTimeout('SetToolTip();', 100);
		} catch (e) { }


		return true;
	}
	if (topic == "") {
		SelectTab(whichdiv, idEncrypted, parameters, mode);
	}
	return false;

}

function RemoveTabADMIN(itemID, bolCaseViewer, bolCloseAutomaticTAB) {
	var bolOnlyOne = true;
	var myDefaultTabClick;

	if (bolCaseViewer == null || bolCaseViewer == undefined) {
		bolCaseViewer = false;
	}

	if (bolCloseAutomaticTAB == null || bolCloseAutomaticTAB == undefined) {
		bolCloseAutomaticTAB = false;
	}

	//remove tab
	$(".tabADMINDiv").each(function (i, obj) {
		if ("tabADMINDiv_" + itemID == obj.id) {
			document.getElementById("otherDivs").removeChild(obj);
			$("#tabADMINli_" + itemID).remove();
		}
	});

	//Contando la cantidad de tabs abiertos
	if ($(".tplimenuitem").length == 0) {
		//Close main tab
		try {
			window.top.fnCloseSelectedTab();
		} catch (e) { }
	}


	DismissToolTip();

	//Case viewer
	if (bolCaseViewer == true) {
		$('.tplimenuitemi').each(function () {
			if (bolOnlyOne == true) {
				myDefaultTabClick = $(this).attr("onclick");
				try {
					eval(myDefaultTabClick);
				} catch (e) { }
			}
		});
	} else {
		//First tab
		try {
			SelectTab('defaultTab');
		} catch (e) { }
	}
}

function AdjustDivSizeTabADMIN() {
	var newHeigth;

	try {
		newHeigth = viewportHeight() - 60;
		if (newHeigth >= 200) {
			try {
				document.getElementById('mainTabDIV').style.height = newHeigth + 'px';
			} catch (e) { }
			//change other tab divs
			$(".tabADMINDiv").each(function (i, obj) {
				try {
					//div
					obj.style.height = newHeigth + 'px';
				} catch (e) { }
			});

			$(".tabADMINDivIframe").each(function (i, obj) {
				try {
					obj.style.height = (newHeigth - 25) + 'px';
				} catch (e) { }
			});
		}
	} catch (e) { }
}

function fnValidateTabInArray(tabID) {
	var k;

	tabID = replaceAll(tabID, "TPTABS50PIPEREPLACE", "_");
	for (k = 0; k <= myTabsArr.length - 1; k++) {
		if (myTabsArr[k].tabID == tabID) {
			return k;
		}
	}
	return -1;
}

function fnSelectTabInArray(tabID) {
	var k;

	tabID = replaceAll(tabID, "TPTABS50PIPEREPLACE", "_");
	for (k = 0; k <= myTabsArr.length - 1; k++) {
		if (myTabsArr[k].tabID == tabID) {
			return myTabsArr[k];
		}
	}
	return null;
}

function fnViewText(textValue) {
	var html;
	textValue = replaceAll(textValue, '[Enter]', '<br />')
	html = ''
	html = html + "<div id='DetailDiv'>";
	html = html + "<table cellpadding='0' cellspacing='0' border='0' align='center'  > "
	html = html + "<tr>"
	html = html + "<td valign='top' align='left'>"
	html = html + textValue
	html = html + "</td>"
	html = html + "</tr>"
	html = html + "</table>"
	html = html + "</div>"
	window.parent.ModalDialogHTML.Title = '';
	window.parent.ModalDialogHTML.size = "sm";
	window.parent.ModalDialogHTML.ContentHTML = html;
	window.parent.ModalDialogHTML.Show();
}

function fnViewCaseComment(IdCase, EncryptCase) {
	var myDummy;
	var url;

	if (EncryptCase == "1") {
		//RSA Encrypt
		ExpRSATpCol = window.top.document.getElementById("expRSASessionTextbox").value;
		ModRSATpCol = window.top.document.getElementById("modRSASessionTextBox").value;
		fnInitKey();
		IdCase = encryptedString(rsakeyTPCOL, IdCase);
	}

	myDummy = fnGetGuid();

	url = "CASE_CommentViewer.aspx?idCase=" + IdCase + "&dummy=" + myDummy;

	window.parent.LoadingModal.Show();
	window.parent.fnLoadTPModalDialogTPClient(url, 'sm', 'md', '', myDummy, null);
}

function fnViewTextGeneric(Id, SourceType) {
	var myDummy;
	var url;

	myDummy = fnGetGuid();

	url = "TEXT_TextViewerGeneric.aspx?Id=" + Id + "&SourceType=" + SourceType + "&dummy=" + myDummy;

	LoadingModal.Show();
	fnLoadTPModalDialogTPClient(url, 'sm', 'md', '', myDummy, null);
}

function fnRemoveFormatClass(controlIndex) {
	$("#MasterBody_divTDLabel_" + controlIndex).find("input,span,label,a").removeClass("fontBold");
	$("#MasterBody_divTDLabel_" + controlIndex).find("input,span,label,a").removeClass("fontItalic");
	$("#MasterBody_divTDLabel_" + controlIndex).find("input,span,label,a").removeClass("fontUnderline");
}

function fnAddFormatClass(controlIndex, formatType) {
	fnRemoveFormatClass(controlIndex);

	if (formatType == undefined || formatType == null) {
		formatType = "Normal";
	}

	//Apply format
	if (formatType == "Bold") {
		$("#MasterBody_divTDLabel_" + controlIndex).find("input,span,label,a").addClass("fontBold");
		return true;
	}
	if (formatType == "Italic") {
		$("#MasterBody_divTDLabel_" + controlIndex).find("input,span,label,a").addClass("fontItalic");
		return true;
	}
	if (formatType == "Underline") {
		$("#MasterBody_divTDLabel_" + controlIndex).find("input,span,label,a").addClass("fontUnderline");
		return true;
	}
}

function cancelBubble(e) {
	var evt = e ? e : window.event;
	if (evt.stopPropagation) evt.stopPropagation();
	if (evt.cancelBubble != null) evt.cancelBubble = true;
}

function fnLoadSocialMedia(controlIndex, type) {
	var codeID = $("#MasterBody_Data_" + controlIndex).val();

	if (codeID.trim() == "") {
		window.top.TPClient.Commons.tpAlertError('.Veuillez saisir une valeur');
		try {
			document.getElementById("MasterBody_Data_" + controlIndex).focus();
		} catch (e) { }
		return;
	}
	//Type
	if (type.trim() == "F") {
		//Ok, go to facebook
		fnViewSenderInFacebook(codeID);
		return true;
	}
	if (type.trim() == "T") {
		//Ok, go to twitter
		codeID = replaceAll(codeID, "@", "");
		fnViewSenderInTwitter(codeID);
		return true;
	}
	if (type.trim() == "G") {
		//Ok, go to google +
		fnViewSenderInGooglePlus(codeID);
		return true;
	}
	return true;
}

function TPActiveNavPills(tab) {
	//$(".nav-pills").find("li").removeClass("active");

	//$("div").find(".tab-pane").removeClass("active");

	$('.nav-pills a[href="#' + tab + '"]').tab('show');
	// $("#" + tab).addClass("active");

}

function TPActiveNavMenu(tab) {
	$(".open").find(".submenu").hide();
	$(".nav-pills").find("li").removeClass("open");
	$("." + tab).addClass("open");
	$("." + tab + ".open").find(".submenu").show();
}

function SetToolTip(trigger, container, placement) {
	DismissToolTip();

	if (!trigger || trigger == undefined || trigger == "") {
		trigger = "hover";
	}
	if (!container || container == undefined || container == "") {
		container = "body";
	}
	if (!placement || placement == undefined || placement == "") {
		placement = "bottom";
	}

	$('[title]').each(function (index, el) {
		if ($(this).hasClass("noTitle") == false) {
			if (typeof $(el).attr('data-tptooltip-title') == 'undefined' && $(el).attr('title') != '') {
				$(el).attr("data-toggle", "popover");
				$(el).attr('data-tptooltip-title', $(el).attr('title'));
				$(el).attr('title', ' ');

				$(el).popover({
					html: true,
					trigger: trigger,
					container: container,
					placement: placement,
					content: $(el).attr('data-tptooltip-title')
				});
			}
		}
	});
}

function SetToolTipHTML(elementId, html, position) {
	DismissToolTip();

	$("#" + elementId).popover({
		html: true,
		trigger: "hover",
		placement: position,
		container: "body",
		content: html
	});
}

function SetToolTipHTMLHoverClick(elementId, html, position) {
	DismissToolTip();

	$("#" + elementId).popover({
		html: true,
		trigger: "hover click",
		placement: position,
		container: "body",
		content: html
	});
}

function DismissToolTip() {
	$('.popover').each(function () {
		$(this).popover('hide');
	});
}

function fixSideBarPosition(y) {
	$("#menuTabs").css("top", Math.floor(y) + "px");
}

function fixModalPosition(y) {
	$(".modal-dialog").css("top", Math.floor(y) + "px");
}

function tpActiveInactiveNavPills(tabID, bolActive) {
	if (!bolActive || bolActive == undefined) {
		bolActive = false;
	}

	if (bolActive == false) {
		//Inactive
		$('#' + tabID).find('a').removeAttr("data-toggle");
		$('#' + tabID).addClass('disabled');
	} else {
		//Active
		$('#' + tabID).removeClass('disabled');
		$('#' + tabID).find('a').attr("data-toggle", "pill");
	}
}

function fnSavePreferencesDB(topicGRID, tpTableID, columATTR) {
	LoadingModal.Show();
	fnSaveGridPreferencesDB(topicGRID, "1", tpTableID, columATTR);
}

function fnSaveAsDefault(topicGRID, tpTableID, columATTR) {
	LoadingModal.Show();
	fnSaveGridPreferencesDB(topicGRID, "2", tpTableID, columATTR);
}

function fnResetPreferences(topicGRID, tpTableID, columATTR) {
	LoadingModal.Show();
	fnSaveGridPreferencesDB(topicGRID, "3", tpTableID, columATTR);
}

function fnSaveGridPreferencesDB(Topic, saveAsDefaul, tpTableID, columATTR) {
	if (saveAsDefaul == null) {
		saveAsDefaul = "0";
	}
	if (saveAsDefaul == "") {
		saveAsDefaul = "0";
	}

	//UserPreferencesTextBox.Value = "{""pageLength"":5,""colReorder"":""0, 6, 2, 3, 4, 5, 1"",""never"":""5""}"
	//Load JSON information
	var table = $("#" + tpTableID).DataTable();
	var objGRID = {};
	objGRID.pageLength = table.page.len();
	if (columATTR.toLowerCase() == "data-code") {
		objGRID.colReorder = new Object();
		objGRID.colReorder.order = [];
		$(table.colReorder.order()).each(function (x, y) {
			var theIndex = x;
			$("#" + tpTableID + " > thead > tr > th").each(function () {
				if ($(this).attr("data-index") == theIndex) {
					objGRID.colReorder.order.push($(this).attr("data-code"));
				}
			});
		});

	} else {
		objGRID.colReorder = table.colReorder.order();
	}

	var never = "";
	var ID;

	$(".tpPreferenceCHK:not(:checked)").each(function () {
		if (columATTR.toLowerCase() == "data-code") {
			ID = $(this).attr("data-code");
		} else {
			ID = $(this).attr("data-index");
		}

		if (never != "") {
			never = never + ",";
		}
		never += ID;
	});

	objGRID.never = never;

	var json = JSON.stringify(objGRID);
	if (!columATTR.toLowerCase() == "data-code") {
		json = json.replace(/\[/ig, "\"").replace(/\]/ig, "\"");
	}

	gridInsertPreference(Topic, "columnsPreferencesDatatables", json, saveAsDefaul);
}

function gridInsertPreference(Topic_USPR, Key_USPR, Value_USPR, saveAsDefaul) {
	if (saveAsDefaul == null) {
		saveAsDefaul = "0";
	}
	if (saveAsDefaul == "") {
		saveAsDefaul = "0";
	}

	PageMethods.gridInsertUpdateUserPreference(Topic_USPR, Key_USPR, Value_USPR, saveAsDefaul, OngridInsertUpdateUserPreference, OnErrorAJAX);
}

function OngridInsertUpdateUserPreference(result, userContext, methodName) {
	LoadingModal.Hide();
	if (result == "-999") {
		window.top.TPClient.Commons.tpAlertError(window.top.fnGetGlobalResource('errorUpdatingPreferences'));
		return;
	}
	window.top.TPClient.Commons.tpAlertSuccessTimer(window.top.fnGetGlobalResource('savePreferencesOK'), window.fnReloadGrid);
}

function OnErrorAJAX(error, userContext, methodName) {
	LoadingModal.Hide();
	if (error !== null) {
		window.top.TPClient.Commons.tpAlertError(window.top.fnGetGlobalResource('ErrorMessage') + ': ' + error.get_message());
	}
}

function fnCollapsiblePanel(CollapsiblePanelHeader, CollapsiblePanelDetails, ClassUp, ClassDown) {
	if (!ClassUp || ClassUp == undefined || ClassUp == "") {
		ClassUp = "glyphicon-circle-arrow-up";
	}
	if (!ClassDown || ClassDown == undefined || ClassDown == "") {
		ClassDown = "glyphicon-circle-arrow-down";
	}
	if ($("#" + CollapsiblePanelHeader).hasClass(ClassUp)) {
		HideCollapsiblePanel(CollapsiblePanelHeader, CollapsiblePanelDetails, ClassUp, ClassDown);
	}
	else {
		ShowCollapsiblePanel(CollapsiblePanelHeader, CollapsiblePanelDetails, ClassUp, ClassDown);
	}
}

function HideCollapsiblePanel(CollapsiblePanelHeader, CollapsiblePanelDetails, ClassUp, ClassDown) {
	//Hide details
	$("#" + CollapsiblePanelDetails).removeClass("hidden");
	$("#" + CollapsiblePanelDetails).addClass("hidden");

	$("#" + CollapsiblePanelHeader).removeClass(ClassUp);
	$("#" + CollapsiblePanelHeader).addClass(ClassDown);
	//$("#" + CollapsiblePanelHeader).attr("title", window.top.fnGetGlobalResource('ShowCollapsiblePanelExtender'));
	$("#" + CollapsiblePanelDetails).slideUp("slow");
}

function ShowCollapsiblePanel(CollapsiblePanelHeader, CollapsiblePanelDetails, ClassUp, ClassDown) {
	$("#" + CollapsiblePanelDetails).removeClass("hidden");

	$("#" + CollapsiblePanelHeader).removeClass(ClassDown);
	$("#" + CollapsiblePanelHeader).addClass(ClassUp);
	//$("#" + CollapsiblePanelHeader).attr("title", window.top.fnGetGlobalResource('HideCollapsiblePanelExtender'))
	$("#" + CollapsiblePanelDetails).slideDown("slow");
	//$("#" + CollapsiblePanelDetails).fadeIn("slow")

}

//Counts the chars in a textbox
//e.g.:
//CountChars(TextBox, 6000, Label);
function CountCharsFromTinyMCE(TextBox, MaxCharsTextBox, Label) {
	var body;
	var content;
	var myLength;
	var html;

	MaxChars = parseInt($("#" + MaxCharsTextBox).val(), 10);
	try {
		body = tinymce.get(TextBox).getBody();
		content = tinymce.trim(body.innerText || body.textContent);
		content = content.trim();
	} catch (e) {
		content = $("#" + TextBox).val();
	}
	if (content == null || content == undefined) {
		content = "";
	}
	myLength = MaxChars - parseInt(content.length, 10);
	if (parseInt(myLength, 10) >= 0) {
		html = "<span style='color:black;font-weight:normal'>" + myLength.toString() + "</span>"
	} else {
		html = "<span style='color:red;font-weight:600'>" + myLength.toString() + "</span>"
	}
	if ($("#" + Label).is(":visible")) {
		$("#" + Label).html(html + "<span style='color:black;font-weight:normal'> / " + MaxChars.toString() + "</span>");
	}
}

function GetCountCharsFromTinyMCE(TextBox) {
	var body;
	var content;

	try {
		body = tinymce.get(TextBox).getBody();
		content = tinymce.trim(body.innerText || body.textContent);
		content = content.trim();
	} catch (e) {
		content = $("#" + TextBox).val();
	}
	if (content == null || content == undefined) {
		content = "";
	}
	return parseInt(content.length, 10);
}

function fnMenuNavigate(type, url, width, height, parameters, functionName, tabTitle, tabImage, externalpublickey, bolNoValidateOpenTab) {
	var DataToSend;
	var i;
	var myDummy;

	if (bolNoValidateOpenTab == null || bolNoValidateOpenTab == undefined) {
		bolNoValidateOpenTab = true;
	}

	myDummy = fnGetGuid();
	if (!parameters) {
		parameters = '';
	}
	parameters = replaceAll(parameters, "?", "");
	if (parameters.substring(0, 0) == '&') {
		parameters = parameters.substring(1);
		if (!parameters) {
			parameters = '';
		}
	}
	i = url.indexOf('?');
	if (parameters.trim() != '') {
		if (i != -1) {
			url = url + '&' + parameters + "&dummy=" + myDummy;
		}
		else {
			url = url + '?' + parameters + "&dummy=" + myDummy;
		}
	} else {
		if (i != -1) {
			url = url + "&dummy=" + myDummy;
		}
		else {
			url = url + "?dummy=" + myDummy;
		}
	}

	i = url.indexOf('[');
	if (i != -1) {
		DataToSend = "urlToParse=" + encodeToHex(url) + "&expk=" + externalpublickey + "&dummy=" + fnDummy();
		$.ajax({
			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
			cache: false,
			async: true,
			url: 'MEIT_ParseParameters.aspx',
			data: DataToSend,
			type: 'POST',
			datatype: 'html',
			success: function (msg) {
				if (msg == '') {
					window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
				}
				else {
					var result;
					try {
						result = msg.split("|");
						if (result[0] == '1') {
							url = decodeFromHex(result[1]);
							fnRunMenuNavigate(type, url, width, height, parameters, functionName, tabTitle, tabImage, myDummy, bolNoValidateOpenTab);
						}
						else {
							window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
						}

					}
					catch (e) {
						window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
					}
				}
			},
			error: function (msg) {
				window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
			},
			timeout: 10000
		});
	}
	else {
		fnRunMenuNavigate(type, url, width, height, parameters, functionName, tabTitle, tabImage, myDummy, bolNoValidateOpenTab);
	}

}

function fnRunMenuNavigate(type, url, width, height, parameters, functionName, tabTitle, tabImage, myDummy, bolNoValidateOpenTab) {
	var functionJS;

	if (bolNoValidateOpenTab == null || bolNoValidateOpenTab == undefined) {
		bolNoValidateOpenTab = true;
	}

	switch (type) {
		case "FUJS":
			{
				try {
					functionJS = eval(functionName);
					functionJS;
				} catch (e) {				    
					window.top.TPClient.Commons.tpAlertError('Erreur exécution fonction Javascript, peut être inexistante !');
					setTimeout('HideWaiting();', 500);
				}
				setTimeout('HideWaiting();', 500);
				return;
			}
		case "MOWI":
			{
				try {
					if (fnIsNumeric(width)) {
						if (width <= 750) {
							width = "xs";
						} else if (width > 750 && width <= 970) {
							width = "sm";
						} else if ((width > 970 && width <= 1170)) {
							width = "md";
						} else {
							width = "lg";
						}
					}

					if (fnIsNumeric(height)) {
						height = "md";
					}
					window.top.LoadingModal.MaxTimeLoadingModalHide = 240000;
					window.top.LoadingModal.Show();
					window.top.fnLoadTPModalDialogTPClient(url, width, height, tabTitle, myDummy, null);
					return;
				} catch (e) {				    
					window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
					setTimeout('HideWaiting();', 500);
				}
				return;
			}
		case "NAVIG":
			{
				try {
					window.top.LoadingModal.MaxTimeLoadingModalHide = 240000;
					window.top.LoadingModal.Show();
					window.top.fnNewTabFrame(url, tabTitle, tabImage, bolNoValidateOpenTab);
				} catch (e) {				    
					window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
					setTimeout('HideWaiting();', 500);
				}
				return;
			}
		case "NEWI":
			{
				try {
					window.top.LoadingModal.MaxTimeLoadingModalHide = 240000;
					window.top.LoadingModal.Show();
					fnModalWindowAndNotModal(url, width, height, 0, 0, false);
				} catch (e) {				    
					window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
					setTimeout('HideWaiting();', 500);
				}
				setTimeout('HideWaiting();', 500);
				return;
			}
		case "IF":
			{
				try {
					window.top.LoadingModal.MaxTimeLoadingModalHide = 240000;
					window.top.LoadingModal.Show();
					window.top.fnNewTabFrame(url, tabTitle, tabImage, bolNoValidateOpenTab);
				} catch (e) {				    
					window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
					setTimeout('HideWaiting();', 500);
					return;
				}
				return;
			}
	}
}

function fnToolBar(type, title, url, functionJS, height, width, tabImage, parameters, firstTime) {
	var functionJS;
	var myDummy;
	var i;
	var myDummy;
	var bolExecItem = false;

	myDummy = fnGetGuid();

	if (!parameters) {
		parameters = '';
	}
	parameters = replaceAll(parameters, "?", "");
	if (parameters.substring(0, 0) == '&') {
		parameters = parameters.substring(1);
		if (!parameters) {
			parameters = '';
		}
	}
	i = url.indexOf('?');
	if (firstTime == true) {
		if (parameters.trim() != '') {
			if (i != -1) {
				url = url + '&' + parameters + "&dummy=" + myDummy;
			}
			else {
				url = url + '?' + parameters + "&dummy=" + myDummy;
			}
		} else {
			if (i != -1) {
				url = url + "&dummy=" + myDummy;
			}
			else {
				url = url + "?dummy=" + myDummy;
			}
		}
	}

	i = url.indexOf('[');
	if (i != -1) {
		if (firstTime == true) {
			DataToSend = "urlToParse=" + encodeToHex(url) + "&expk=&dummy=" + fnDummy();
			$.ajax({
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				cache: false,
				async: true,
				url: 'MEIT_ParseParameters.aspx',
				data: DataToSend,
				type: 'POST',
				datatype: 'html',
				success: function (msg) {
					if (msg == '') {
						window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
					}
					else {
						var result;
						try {
							result = msg.split("|");
							if (result[0] == '1') {
								url = decodeFromHex(result[1]);
								fnToolBar(type, title, url, functionJS, height, width, tabImage, parameters, false);
							}
							else {
								window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
							}
						}
						catch (e) {
							window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
						}
					}
				},
				error: function (msg) {
					window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
				},
				timeout: 10000
			});
		} else {
			bolExecItem = true;
		}
	} else {
		bolExecItem = true;
	}

	if (bolExecItem == true) {
		switch (type) {
			case "FunctionJS":
				{
					try {
						functionJS = eval(functionJS);
						functionJS;
					} catch (e) {
						window.top.TPClient.Commons.tpAlertError('Erreur exécution fonction Javascript, peut être inexistante !');
						setTimeout('HideWaiting();', 500);
					}
					return;
				}
			case "NewWindow":
				{
					try {
						fnModalWindowAndNotModal(url, width, height, 0, 0, false);
					} catch (e) {
						setTimeout('HideWaiting();', 500);
						window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
					}
					return;
				}
			case "ModalWindowJQ":
				{
					if (fnIsNumeric(width)) {
						if (width <= 750) {
							width = "xs";
						} else if (width > 750 && width <= 970) {
							width = "sm";
						} else if ((width > 970 && width <= 1170)) {
							width = "md";
						} else {
							width = "lg";
						}
					}

					if (fnIsNumeric(height)) {
						height = "md";
					}
					window.top.LoadingModal.MaxTimeLoadingModalHide = 240000;
					window.top.LoadingModal.Show();
					window.top.fnLoadTPModalDialogTPClient(url, width, height, title, myDummy, null);
					return;
				}
			case "NavigatePage":
				{
					try {
						window.top.LoadingModal.MaxTimeLoadingModalHide = 240000;
						window.top.LoadingModal.Show();
						window.top.fnNewTabFrame(url, title, tabImage);
					} catch (e) {
						setTimeout('HideWaiting();', 500);
						window.top.TPClient.Commons.tpAlertError('Erreur ouverture fenêtre, Valider configuration boite à outils');
					}
					return;
				}
		}
	}

}

function HideWaiting() {
	try {
		window.top.LoadingModal.Hide();
	} catch (e) { }
	try {
		LoadingModal.Hide();
	} catch (e) { }
}

function getDocHeight(doc) {
	doc = doc || document;
	// stackoverflow.com/questions/1145850/
	var body = doc.body, html = doc.documentElement;
	var height = Math.max(body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight);
	return height;
}

function setIframeHeight(id) {
	var ifrm = window.top.document.getElementById(id);
	var doc = ifrm.contentDocument ? ifrm.contentDocument :
		ifrm.contentWindow.document;
	ifrm.style.visibility = 'hidden';
	ifrm.style.height = "10px"; // reset to minimal height ...
	// IE opt. for bing/msn needs a bit added or scrollbar appears
	ifrm.style.height = getDocHeight(doc) + 4 + "px";
	ifrm.style.visibility = 'visible';
}

function fnShowTabKey(e, NextControl, ControlTinyMCE) {
	if ((e.which || e.keyCode) == 9) {
		// tab key was pressed, do stuff
		if (!ControlTinyMCE) {
			setTimeout(function () {
				$("#" + NextControl).focus();
			}, 100);
		} else {
			try {
				setTimeout(function () {
					tinymce.execCommand('mceFocus', false, NextControl);
				}, 100);
			} catch (e) { }
		}
	}
}

function fnChangeWidthSelectControls() {
	var myID;
	var myLength;
	var myTemp;

	try {
		$(".AddaRenderDIV").find("select").each(function (key, value) {
			myID = this.id;
			myLength = 0;
			$("#" + myID + " option").each(function (k, v) {
				myTemp = v.text.length;
				myTemp = myTemp * 1;
				if (myTemp > myLength) {
					myLength = myTemp * 1;
				}
			});

			//Check properties
			var myWidth;
			myWidth = Math.round((myLength / 10) + 0.5);
			myWidth = myWidth * 1;
			if (myWidth < 50) {
				myWidth = myWidth * 100;

				myWidth = myWidth + "px";
				$("#" + myID).css("width", myWidth);
			}
		});
	} catch (e) { }
}

function fnCopytoClipboard(ControlTexttoCopy, answerSpan) {
	if (ControlTexttoCopy == null || ControlTexttoCopy == undefined || ControlTexttoCopy == "") {
		return;
	}
	if ($("#" + ControlTexttoCopy).val() == "") {
		return;
	}
	$("#" + ControlTexttoCopy).select();
	try {
		// The important part (copy selected text)
		var successful = document.execCommand('copy');

		if (successful) $("#" + answerSpan).html(window.top.fnGetGlobalResource('CopiedtoClipboardMessage'));
		else $("#" + answerSpan).html(window.top.fnGetGlobalResource('UnabletoCopyClipboardMessage'));
	} catch (e) {
		$("#" + answerSpan).html(window.top.fnGetGlobalResource('UnsupportedBrowserCopytoClipboardMessage'));
	}
}

function JSONSyntaxHighlight(json) {
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}

function validateBeforeGenerateCode(textboxControl, saveMode) {
	//savemode is update or insert or clone
	if (saveMode.indexOf("Insert") !== -1 || saveMode.indexOf("Clone") !== -1) {
		if ($(textboxControl).val().trim() != null && $(textboxControl).val().trim() != undefined && $(textboxControl).val().trim() != "" && $(textboxControl).val().trim() != "..") {
			return true;
		} else {
			window.top.TPClient.Commons.tpAlertError('.Impossible de générer le ID de description vide');
		}
	} else {
		//window.top.TPClient.Commons.tpAlertError('Erreur d´analyse des paramètres d´URL');
		$("#tpRepeatGenerateCode").parent().remove();
	}
}

function fnRegenerateCode(idDescriptionTextbox, idModeTextbox) {
	var text1 = "";
	var text3 = $("#" + idModeTextbox).val();

	try {
		text3 = text3.trim();
	} catch (ddx) { };

	if (text3 == undefined) {
		text3 = "";
	}

	if (!validateBeforeGenerateCode($("#" + idDescriptionTextbox), text3)) {
		return;
	}
	bolGenerateCode = false;
	TPClient.Commons.clearScreenErrors();
	fnCode();
}

//============================   Draft   ==================================================

function SaveTinyDraft(myTopic, tinyMCEID, prefixDraftButton) {
	var myDescription;
	var StartDescription;
	var bolConfirm = false;

	//myDescription = tinymce.get('MasterBody_DocumentKBTextBox').getContent();
	myDescription = tinymce.get(tinyMCEID).getContent();
	if (myDescription.trim() == "") {
		bolConfirm = true;
	}

	StartDescription = myDescription.substring(0, 2);
	if (StartDescription.toUpperCase().trim() != "<P") {
		myDescription = "<p> " + myDescription + "</p>";
	}

	myDescription = myDescription.replace(/<p>|<P>/ig, '<p style="margin-top:0px; white-space: normal;">');

	if (bolConfirm == true) {
		//Confirm
		var paramConfirm = new Array();
		paramConfirm.push(myDescription);
		paramConfirm.push(myTopic);
		paramConfirm.push(prefixDraftButton);

		var confirmLabel = window.top.fnGetGlobalResource('confirmDraftLabel');

		window.top.TPClient.Commons.tpConfirm(confirmLabel,
									window.top.fnGetGlobalResource('OkButton'),
									window.top.fnGetGlobalResource('CancelButton'),
									window.RealSaveTinyDraft, paramConfirm, null, null
									);
	} else {
		fnSaveDraftTinyMCE(myDescription, myTopic, prefixDraftButton);
	}
}

function RealSaveTinyDraft(paramConfirm) {
	fnSaveDraftTinyMCE(paramConfirm[0], paramConfirm[1], paramConfirm[2]);
}

function fnSaveDraftTinyMCE(infoToSave, fileName, prefixDraftButton) {
	if (infoToSave.trim() == "") {
		return;
	}

	//Convert to UTF8
	infoToSave = TPClient.Commons.toUTF8Text(infoToSave);

    if (window.top.$("#EnableSaveDraftTinyMCETextBox").val() == "0" ) {
        return;
    }
	//Saving information
	PageMethods.SaveDraftTinyMCE(infoToSave, fileName, OnSaveDraftTinyMCE, OnErrorAJAX, prefixDraftButton);
}

function OnSaveDraftTinyMCE(result, context, method) {
	var html;
	var ControlName;

	if (result == "-999") {
		window.top.TPClient.Commons.tpAlertSuccessTimer(window.top.fnGetGlobalResource("errorSavingDraft"));
	} else {
		window.top.TPClient.Commons.tpAlertSuccessTimer(window.top.fnGetGlobalResource("InsertSuccessDraft"));
		$("#" + context + "_LoadDraft").removeClass("hide");
		$("#" + context + "_LoadDraft").find("span").css("color", "red");
	}
}

function LoadTinyDraft(Key_TKEV, tinyMCEID, btnPrefix) {
    if (window.top.$("#EnableSaveDraftTinyMCETextBox").val() == "0") {
        return;
    }
	PageMethods.LoadDraftByKEY(Key_TKEV, OnLoadDraftByKEY, OnErrorAJAX, tinyMCEID + "|" + btnPrefix);
}

function OnLoadDraftByKEY(result, userContext, methodName) {
	var arrTMP = new Array();
	var btnPrefix;
	var tinyMCEID;
	var myTinyValue;

	if (result == "-999") {
		window.top.TPClient.Commons.tpAlertError(window.top.fnGetGlobalResource('errorLoadingDraft'));
	} else {
		arrTMP = userContext.split("|");
		tinyMCEID = arrTMP[0];
		btnPrefix = arrTMP[1];
		if (result == "0") {
			//Clear tiny
			$("#" + tinyMCEID).val("");
			try {
				tinyMCE.get(tinyMCEID).setContent("");
			} catch (e) { }
			try {
				tinymce.get(tinyMCEID).setContent("");
			} catch (e) { }

			$("#" + btnPrefix + "_LoadDraft").find("span").css("color", "black");
			$("#" + btnPrefix + "_LoadDraft").addClass("hide");
		} else {
			//No exists
			result = JSON.parse(result);
			myTinyValue = TPClient.Commons.fromUTF8Text(result.Value_TKEV);

			try {
				tinyMCE.get(tinyMCEID).setContent(myTinyValue);
			} catch (e) { }
			try {
				tinymce.get(tinyMCEID).setContent(myTinyValue);
			} catch (e) { }
		}
	}
}

function fnCheckDraftByKey(Key_TKEV, btnPrefix) {
    if (window.top.$("#EnableSaveDraftTinyMCETextBox").val() == "0") {
        return;
    }
	PageMethods.CheckDraftByKEY(Key_TKEV, OnCheckDraftByKEY, OnErrorCheckDraftByKEY, btnPrefix);
}

function OnCheckDraftByKEY(result, userContext, methodName) {
	if (result == "-999") {
		window.top.TPClient.Commons.tpAlertError(window.top.fnGetGlobalResource('errorCheckingDraft'));
	} else {
		if (result == "1") {
			//Exists
			$("#" + userContext + "_LoadDraft").removeClass("hide");
			$("#" + userContext + "_LoadDraft").find("span").css("color", "red");
		} else {
			//No exists
			$("#" + userContext + "_LoadDraft").removeClass("hide");
			$("#" + userContext + "_LoadDraft").addClass("hide");
			$("#" + userContext + "_LoadDraft").find("span").css("color", "black");
		}
	}
}

function OnErrorCheckDraftByKEY(error, userContext, methodName) {
	LoadingModal.Hide();
	//if (error !== null) {
	//    window.top.TPClient.Commons.tpAlertError(window.top.fnGetGlobalResource('ErrorMessage') + ': ' + error.get_message());
	//}
}

//============================   End Draft   ==================================================

function fnOpenInitialHTMLDoc(url) {
	fnModalWindowAndNotModal(url, 0, 0, 0, 0, false);
}

function AddActiveRowClickDataTable(tpTableID) {
	$('#' + tpTableID + ' tbody tr').click(function (e) {
		if (!$(this).hasClass('activerow')) {
			$(this).addClass("activerow");
		}
	});
}

function fnValidateTextOnlyOpenParenthesis(e) {
	var key = (document.all) ? e.keyCode : e.which;
	if (key == 8 || key == 9 || key == 0) return true;
	patron = /[(\s]/; //  ( \s
	te = String.fromCharCode(key);
	return patron.test(te);
}

function fnValidateTextOnlyCloseParenthesis(e) {
	var key = (document.all) ? e.keyCode : e.which;
	if (key == 8 || key == 9 || key == 0) return true;
	patron = /[)\s]/; //  ) \s
	te = String.fromCharCode(key);
	return patron.test(te);
}

function fnRenderTILEExternalURL(theTruthId, elPITA) {
	var arrParam = new Array();

	arrParam.push(theTruthId);
	arrParam.push(elPITA);

	window.top.fnRenderPITAurl(elPITA.ExternalURL_PITA, elPITA.ExternalPublicKey_PITA, "", OnfnRenderTILEExternalURL, arrParam);
}

function OnfnRenderTILEExternalURL(result, userContext, methodName) {
	var theTruthId;
	var elPITA;

	try {
		LoadingModal.Hide();
	} catch (e) { }

	if (result == "-999") {
		window.top.TPClient.Commons.tpAlertError('.Erreur de génération d’URL externe');
		return;
	}

	result = TPClient.Commons.fromUTF8Text(result);

	theTruthId = userContext[0];
	elPITA = userContext[1];

	$(theTruthId).html("<iframe src='" + result + "' frameborder='0' width='100%' height='600px'></iframe>");

	if (myFunctionDashboardRender) {
		try {
			eval(myFunctionDashboardRender);
		} catch (e) { }
	}

	myFunctionDashboardRender = null;
}

function fnConfigureClipboard() {
	try {
		var clipboard = new Clipboard('.TPClipboard');
		clipboard.on('success', function (e) {
			var CopytoClipboardAnswer;
			var currentE = e;
			CopytoClipboardAnswer = $(e.trigger).attr("data-clipboard-message");
			if ($(CopytoClipboardAnswer).length) {
				$(CopytoClipboardAnswer).html(window.top.fnGetGlobalResource('CopiedtoClipboardMessage'));
				setTimeout(function () {
					try {
						currentE.clearSelection();
					} catch (e) { }
					$(CopytoClipboardAnswer).html("");
				}, 5000)
			}
		});

		clipboard.on('error', function (e) {
			var CopytoClipboardAnswer;
			CopytoClipboardAnswer = $(e.trigger).attr("data-clipboard-message");
			if ($(CopytoClipboardAnswer).length) {
				$(CopytoClipboardAnswer).html(window.top.fnGetGlobalResource('UnsupportedBrowserCopytoClipboardMessage'));
				setTimeout(function () {
					$(CopytoClipboardAnswer).html("");
				}, 5000)
			}
		});
	} catch (e) { }
}

function fnKeyExistsInJSON(obj, key) {
	return (obj[key]) ? true : false;
}

function hexToRgbaString(hex, opacity) {
	var rgb = hexToRgb(hex);
	var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + opacity / 100 + ")";
	return rgba;
}

function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function fnViewCommonTOPSimulation(Id_SIRE, Id_Encrypted, Main_Id_SIMU, Name) {
	var url = "";
	var myImage = "";
	var myTitle = "";
	try {
		url = window.top.document.getElementById("PageSimulationViewerTextBox").value;
	} catch (e) { }
	try {
		myImage = window.top.document.getElementById("TabImageSimulationViewerTextBox").value;
	} catch (e) { }
	try {
		myTitle = window.top.document.getElementById("TabTitleSimulationViewerTextBox").value;
	} catch (e) { }

	fnMenuNavigate('NAVIG', url, '', '', '', '', myTitle, myImage, '', false);
	try {
		RecentMenu('S_SIFOAD');
	} catch (e) { }

	setTimeout(function () {
		var myTabId = window.top.TPClient.MainPage.ExistsIndexOfTabAndReturnTabId(url);
		window.top.fnOpenSimulationInTab(myTabId, Main_Id_SIMU, Name);
	}, 1000);
}


function fnIsFloat(val) {
	if (!val || (typeof val != "string" || val.constructor != String)) {
		return (false);
	}
	var isNumber = !isNaN(new Number(val));
	if (isNumber) {
		if (val.indexOf(',') != -1) {
			return (false);
		}
		else {
			return (true);
		}
	}
	else {
		return (false);
	}
}

function FormatNumber(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function fnCheckGenerateCode() {
	try {
		if ($("#MasterBody_ModeTextBox").val() == "Update" || $("#MasterBody_Mode2TextBox").val() == "Update") {
			$("#tpRepeatGenerateCode").parent().remove();
		} else {
			$("#tpRepeatGenerateCode").parent().show();
		}
	} catch (ex) { }
}

function SplitMultivalues(inputValue) {
	inputValue = inputValue.trim()
	return inputValue.split(/;\s*/);
}

function ShortCutsCreatorForFrequentAnswers(selector, callbackFunction) {
	var strMousetrap = [];
	for (var i = 0; i <= 99; i++) {
		var valMousetrap = i;
		var val1;
		var val2;

		if (i < 10)
			valMousetrap = "ctrl+alt+0 ctrl+alt+" + i;
		else {
			val1 = i.toString().substring(0, 1);
			val2 = i.toString().substring(1, 2);
			valMousetrap = "ctrl+alt+" + val1 + " ctrl+alt+" + val2;
		}
		strMousetrap.push(valMousetrap);
	}

	Mousetrap(selector).bind(strMousetrap, function (e, x) {
		x = replaceAll(x, " ", "");
		x = replaceAll(x, "ctrl+alt+", "");
		x = Number(x);

		callbackFunction(x);
	});
}

function JSONtoTable(json, tableid, classes) {
	var cols = Object.keys(json[0]);

	var headerRow = '';
	var bodyRows = '';

	classes = classes || '';

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	cols.map(function (col) {
		headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
	});

	json.map(function (row) {
		bodyRows += '<tr>';

		cols.map(function (colName) {
			bodyRows += '<td>' + row[colName] + '</td>';
		})

		bodyRows += '</tr>';
	});

	return '<table id="' +
		   tableid +
		   '" width="99%" class="' +
		   classes +
		   '"><thead><tr>' +
		   headerRow +
		   '</tr></thead><tbody>' +
		   bodyRows +
		   '</tbody></table>';
}

function fnMergeArray(array1, array2) {
	var result_array = [];
	var arr = array1.concat(array2);
	var len = arr.length;
	var assoc = {};

	while (len--) {
		var item = arr[len].toLowerCase().trim();

		if (!assoc[item]) {
			result_array.unshift(item);
			assoc[item] = true;
		}
	}
	return result_array;
}

function fnOutboundValidatePhones(onePhone, PhoneNumberValidDigits) {
	var arrayTemp = new Array();
	var phoneLength;
	var uniqueValues;

	//Check if is empty
	if (onePhone == undefined || onePhone == "" || onePhone == null) {
		return false;
	}
	//Check if is numeric
	if (isNaN(new Number(onePhone))) {
		return false;
	}

	if (PhoneNumberValidDigits == undefined || PhoneNumberValidDigits == "" || PhoneNumberValidDigits == null) {
		return false;
	}    
	arrayTemp = PhoneNumberValidDigits.split(";");
	if (arrayTemp == undefined || arrayTemp == "") {
		return false;
	}

	phoneLength = onePhone.length.toString();
	//Check Number Valid Digits
	if ($.inArray(phoneLength, arrayTemp) == -1) {
		return false;
	}
	
	//Check Different Digits
	uniqueValues = fnGetUniqueChar(onePhone)
	if (uniqueValues == undefined || uniqueValues == "" || uniqueValues == null) {
		return false;
	}
	if (uniqueValues.length == 1) {
		return false;
	}
	return true;
}

function fnGetUniqueChar(textInput) {
	var uniqueText;
	//Check if is empty
	if (textInput == undefined || textInput == "" || textInput == null) {
		return "";
	}
	uniqueText = "";
	for (var x = 0; x < textInput.length; x++) {
		if (uniqueText.indexOf(textInput.charAt(x)) == -1) {
			uniqueText += textInput[x];
		}
	}
	return uniqueText;
}

function TPCronometro(pHours, pMinutes, pSeconds, pSign, pID_SPAN, pstrFunctionZeroExecution, verticalLIID, pOBJSemaphore) {
	var tmpReturn = "";
	var execSTR = "";
	//Los minutos y segundos no pueden ser superiores a 60
	if (pHours == null) {
		pHours = 0;
	}
	if (pMinutes == null) {
		pMinutes = 0;
	}
	if (pSeconds == null) {
		pSeconds = 0;
	}

	if (pSign == null) {
		pSign = "+";
	}

	if (pstrFunctionZeroExecution == null || pstrFunctionZeroExecution == undefined) {
		pstrFunctionZeroExecution = "";
	}

	this.myTimerID = 0;
	this.Hours = pHours;
	this.Minutes = pMinutes;
	this.Seconds = pSeconds;
	this.objSPAN = pID_SPAN;
	this.FunctionZeroExecution = pstrFunctionZeroExecution;
	this.Sign = pSign;
	this.Prefix = "";
	this.Status = "";
	this.Semaphore = pOBJSemaphore;

	this.Start = function () {
		var self;
		self = this;

		clearInterval(self.myTimerID);

		self.Status = "START";

		self.myTimerID = setInterval(function () {
			if (self.Sign == "+") {
				//Sumar
				self.Seconds++;
				if (self.Seconds >= 60) {
					self.Seconds = 0;
					self.Minutes++;
					if (self.Minutes >= 60) {
						self.Minutes = 0;
						self.Hours++;
					}
				}
			} else {
				//Restar
				self.Prefix = "-";
				self.Seconds--;
				if (self.Seconds < 0) {
					self.Seconds = 59;
					self.Minutes--;
					if (self.Minutes < 0) {
						self.Minutes = 59;
						self.Hours--;
					}
				}
				if (self.Hours == 0 && self.Minutes == 0 && self.Seconds == 0) {
					self.Sign = "+";
					self.Prefix = "";
					if (self.FunctionZeroExecution != "") {
						try {
							eval(self.FunctionZeroExecution);
						} catch (e) { }
					}
				}
			}

			tmpReturn = self.Prefix;
			if (self.Hours != 0) {
				tmpReturn += self.Hours + ":";
			}
			tmpReturn += Right("00" + self.Minutes, 2) + ":" + Right("00" + self.Seconds, 2);

			//ACA VOY: verificar los valores para alterar el semáforo
			var TotalSeconds = 0;
			var newSemaphoreClass = "green";
			if (self.Semaphore) {
				if (self.Sign == "+") {
					TotalSeconds = self.Minutes * 60;
					TotalSeconds = TotalSeconds + self.Seconds;
					if (TotalSeconds <= self.Semaphore.Green) {
						//Green
						newSemaphoreClass = "green";
					} else if (TotalSeconds > self.Semaphore.Green && TotalSeconds <= self.Semaphore.Yellow) {
						//Yellow
						newSemaphoreClass = "yellow";
					} else {
						//Red
						newSemaphoreClass = "red";
					}
					if (verticalLIID) {
						window.parent.fnChangeSemaphoreCLASS(verticalLIID, newSemaphoreClass);
					}
				}
			}

			try {
				execSTR = self.objSPAN + ".innerHTML = " + "\"" + tmpReturn + "\"";
				eval(execSTR);
				self.objSPAN.innerHTML = tmpReturn;
			} catch (e) { }
		}, 1000);
	}

	this.Stop = function () {
		var self;
		self = this;

		self.Status = "STOP";
		clearInterval(self.myTimerID);
	}
}

function fnCheckExportToExcel(ActionType) {
	var dataReturn = new CheckExportToExcelStructure();
	var dataToSend;
	try {

		dataToSend = { "ActionType": ActionType };

		$.ajax({
			contentType: 'application/json; charset=utf-8',
			cache: false,
			async: false,
			url: "CheckExportToExcelHandler.ashx",
			data: JSON.stringify(dataToSend),
			type: 'POST',
			datatype: 'json',
			success: function (result) {
				dataReturn = result;
			},
			error: function (error, xhr) {
				dataReturn.ResultCode = "-999";
				dataReturn.ResultMessage = xhr.status;
			},
			timeout: 60000
		});
	} catch (e) {
		window.top.TPClient.Commons.tpAlertError(window.top.fnGetGlobalResource('ErrorMessage') + ': ' + e.message);
		return false;
	}
	if (dataReturn.ResultCode == "-999") {
		window.top.TPClient.Commons.tpAlertError(window.top.fnGetGlobalResource('ErrorMessage') + ': ' + dataReturn.ResultMessage);
		return false;
	}

	var resultJSON = $.parseJSON(dataReturn);
	if (resultJSON && resultJSON.ResultCode == "1") {
		return true;
	}
	return false;
}

function CheckExportToExcelStructure() {
	this.ResultCode = "";
	this.ResultMessage = "";
}