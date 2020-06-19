function fnCloseTPModalDialogTPClient(Guid, ExecuteFunction, CloseModal, Parameter1, Parameter2, Parameter3, Parameter4, Parameter5, Parameter6, Parameter7, Parameter8, Parameter9, Parameter10) {
    var fnNameToReturn;
    if (ExecuteFunction == true) {
        fnNameToReturn = window.top.TPClient.Modal.GetExecuteReturnFunction(Guid);
        if (fnNameToReturn != null) {
            fnNameToReturn(Parameter1, Parameter2, Parameter3, Parameter4, Parameter5, Parameter6, Parameter7, Parameter8, Parameter9, Parameter10);
        }
    }
    if (CloseModal == true) {
        window.top.TPClient.Modal.CloseModal(Guid);
    }
}

//Loading modal
var LoadingModal = new Object();
LoadingModal.Hide = function () {
    $("#overlayTPClient").css("visibility", "hidden");
    clearTimeout(LoadingModal.TimerLoading);
}
LoadingModal.Show = function () {
    var screenwidth = getWidthJQ();
    var screenHeight = getHeightJQ();
    var myMaxTimeLoadingModalHide;

    myMaxTimeLoadingModalHide = parseInt(60000);
    if (LoadingModal.MaxTimeLoadingModalHide) {
        myMaxTimeLoadingModalHide = parseInt(LoadingModal.MaxTimeLoadingModalHide);
    }

    document.getElementById("inneroverlayTPClient").style.left = parseInt((screenwidth - 150) / 2) + "px";
    document.getElementById("inneroverlayTPClient").style.top = "250px";
    $("#overlayTPClient").css("visibility", "visible");
    LoadingModal.TimerLoading = setTimeout("LoadingModal.Hide();", myMaxTimeLoadingModalHide);
    LoadingModal.MaxTimeLoadingModalHide = parseInt(60000);
}

function fnLoad() {
    document.getElementById("LoginTextBox").focus();
    setPlaceholder();
}

function fnChangeLanguage() {
    document.getElementById("LoginTextBox").value = "";
    document.getElementById("PasswordTextBox").value = "";

    __doPostBack('', '');
}

function setPlaceholder() {
    var usernameText = '.Entrez votre nom d’utilisateur';
    var passwordText = '.Entrez votre mot de passe';

    document.getElementById("LoginTextBox").placeholder = ((usernameText == "UserName" || usernameText == "") ? "Enter your username" : '.Entrez votre nom d’utilisateur');
    document.getElementById("PasswordTextBox").placeholder = ((passwordText == "Password" || passwordText == "") ? "Enter your password" : '.Entrez votre mot de passe');
}

function fnChangePassword() {
    var myDummy;
    var url;

    myDummy = fnGetGuid();
    url = "USER_ChangePassword.aspx?dummy=" + myDummy;
    LoadingModal.Show();
    fnLoadTPModalDialogTPClient(url, "xs", "sm", '', myDummy, null);
}

function fnOkButton() {
    if (document.getElementById("LoginTextBox").value.trim() == "") {
        window.top.TPClient.Commons.tpAlertWarning('Vous devez saisir l´identifiant', null, null, document.getElementById("OkButtonResourceTextBox").value);
        document.getElementById("LoginTextBox").focus();
        return false;
    }
    if (document.getElementById("PasswordTextBox").value.trim() == "") {
        window.top.TPClient.Commons.tpAlertWarning('Vous devez saisir un mot de passe', null, null, document.getElementById("OkButtonResourceTextBox").value);
        document.getElementById("PasswordTextBox").focus();
        return false;
    }
    fnCreateSession();
}

function fnEncrypt() {
    fnInitKey();
    var Login = document.getElementById("LoginTextBox").value.trim();
    var Password = document.getElementById("PasswordTextBox").value.trim();
    document.getElementById("DataTextBox").value = encryptedString(rsakeyTPCOL,
        Base64.encode(Login) + "|"
        + Base64.encode(Password));
}

function fnRedirectURL(URL) {
    window.self.location.href = URL;
}

function fnCreateSession() {
    var language;
    language = document.getElementById("LanguageDropDownList").value;
    PageMethods.CreateSessionVariables(language, OnCreateSessionSucceeded, OnCreateSessionFailure);
}

function OnCreateSessionSucceeded(result, userContext, methodName) {
    if (result.ReturnState == 'SUCCESS') {
        document.getElementById("ChallengeTextBox").value = result.Challenge;
        ExpRSATpCol = result.ExpRSA;
        ModRSATpCol = result.ModRSA;
        ChallengeRSATpCol = result.Challenge;
        fnEncrypt();
        fnValidateFailedAttempts();
    }
    else {
        window.top.TPClient.Commons.tpAlertError('Erreur création variables de session', null, null, document.getElementById("OkButtonResourceTextBox").value);
    }

}

function OnCreateSessionFailure(error, userContext, methodName) {
    if (error !== null) {
        window.top.TPClient.Commons.tpAlertError('Erreur création variables de session' + ' error:' + error.get_message(), null, null, document.getElementById("OkButtonResourceTextBox").value);
    }
}

function fnValidateFailedAttempts() {
    var Login = document.getElementById("LoginTextBox").value.trim();
    if (Login.trim() == "") {
        return;
    }
    LoadingModal.Show();
    PageMethods.ValidateFailedAttempts(Login, OnValidateFailedAttemptsSucceeded, OnValidateFailedAttemptsFailure);
}

function fnHideMessage() {
    $("#successP").html('');
    $('#successP').css('display', 'none');

    $("#errorP").html('');
    $('#errorP').css('display', 'none');
}

function OnValidateFailedAttemptsSucceeded(result, userContext, methodName) {
    var arrResult;
    var UserBlockedMessage;

    fnHideMessage();

    arrResult = result.split("|");
    if (arrResult[0] == '-999') {
        window.top.TPClient.Commons.tpAlertError('ErrorValidatingUser', null, null, document.getElementById("OkButtonResourceTextBox").value);
        LoadingModal.Hide();
        return;
    }
    UserBlockedMessage = arrResult[4];
    if (arrResult[0] == '0') {
        UserBlockedMessage = String.format(UserBlockedMessage, arrResult[2]);
        $("#errorP").html(UserBlockedMessage);
        $('#errorP').css('display', 'block');
        document.getElementById('LoginTextBox').focus();
        LoadingModal.Hide();
        return;
    }

    document.getElementById("LoginTextBox").value = "";
    document.getElementById("PasswordTextBox").value = "";
    __doPostBack('OkButton', '');

}

function OnValidateFailedAttemptsFailure(error, userContext, methodName) {
    var UserBlockedMessage;
    LoadingModal.Hide();
    if (error !== null) {
        if (error.get_statusCode() == "401") {
            fnHideMessage();
            UserBlockedMessage = document.getElementById("ValidationUserBlockedGreaterThanThreeAttemptsTextbox").value.trim();
            UserBlockedMessage = String.format(UserBlockedMessage, '>3');
            $("#errorP").html(UserBlockedMessage);
            $('#errorP').css('display', 'block');
            document.getElementById('LoginTextBox').focus();
            return;
        }
        window.top.TPClient.Commons.tpAlertError(document.getElementById("ErrorMessageResourceTextBox").value + ': ' + error.get_message(), null, null, document.getElementById("OkButtonResourceTextBox").value);
    }
}


