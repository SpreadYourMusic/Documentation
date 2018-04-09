
function redirectToPage(url){
    window.location.replace(url);
}

function setCookie(cname, cvalue, exdays) {

    if(exdays === undefined || exdays <= 0) exdays = 5;

    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function unsetCookie(cname) {
    document.cookie = cname + "=;";
}