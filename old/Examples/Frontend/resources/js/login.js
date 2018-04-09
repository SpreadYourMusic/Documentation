$(document).ready(
	function(){
		$('#login-button').click(function(){
			var user = $('input[id="user-login"]').val();
			var pass = $('input[id="pass-login"]').val();
      
      		resetLoginInputs();
      
			if(user === "" || pass === ""){
				if(user === ""){
					$('div[id="user-login-container"]').addClass("has-error");
          			$('span[id="user-login-icon"]').removeClass("hidden");
				}
				
				if(pass === ""){
					$('div[id="pass-login-container"]').addClass("has-error");
          			$('span[id="pass-login-icon"]').removeClass("hidden");
				}

                $('div[id=loading-icon-login]').addClass('hidden');
			}else{
                performAsyncPostRequest("/users/"+user+"/login", {user: user, pass: pass}, login_callback);
			}
		});
		
		$('#register-button').click(function(){
			var user = $('input[id="user-signup"]').val();
			var pass0 = $('input[id="pass1-signup"]').val();
			var pass1 = $('input[id="pass2-signup"]').val();
			var mail = $('input[id="mail-signup"]').val();

            resetSignupInputs();

			if(user === "" || pass0 === "" || pass1 === "" || mail === ""){
				if(user === ""){
                    $('div[id="user-signup-container"]').addClass("has-error");
                    $('span[id="user-signup-icon"]').removeClass("hidden");
				}
				
				if(pass0 === ""){
                    $('div[id="pass1-signup-container"]').addClass("has-error");
                    $('span[id="pass1-signup-icon"]').removeClass("hidden");
				}
				
				if(pass1 === ""){
                    $('div[id="pass2-signup-container"]').addClass("has-error");
                    $('span[id="pass2-signup-icon"]').removeClass("hidden");
				}
				
				if(mail === ""){
                    $('div[id="mail-signup-container"]').addClass("has-error");
                    $('span[id="mail-signup-icon"]').removeClass("hidden");
				}

                $('div[id=loading-icon-signup]').addClass('hidden');
			}else{
			    if(validateMail(mail)){
                    performAsyncPostRequest("/users/"+user+"/signup", {user:user, pass0:pass0, pass1:pass1, mail:mail}, register_callback);
                }else{
                    $('div[id="mail-signup-container"]').addClass("has-error");
                    $('span[id="mail-signup-icon"]').removeClass("hidden");
                    $('div[id=loading-icon-signup]').addClass('hidden');
                }
			}
		});
    
    /*
    $.getScript("/resources/js/request.js")
      .done(function( script, textStatus ) {
        console.log( "Dinamically loaded requests" );
      })
      .fail(function( jqxhr, settings, exception ) {
        console.log( jqxhr );
        console.log( settings );
        console.log( exception );
        $( "div.log" ).text( "Triggered ajaxError handler." );
      });*/
	}
);

function resetSignupInputs(){
    $('div[id="user-signup-container"]').removeClass("has-error");
    $('span[id="user-signup-icon"]').addClass("hidden");
    $('div[id="mail-signup-container"]').removeClass("has-error");
    $('span[id="mail-signup-icon"]').addClass("hidden");
    $('div[id="pass1-signup-container"]').removeClass("has-error");
    $('span[id="pass1-signup-icon"]').addClass("hidden");
    $('div[id="pass2-signup-container"]').removeClass("has-error");
    $('span[id="pass2-signup-icon"]').addClass("hidden");

    var alert =$('div[id=signup-alert]');
    alert.removeClass("alert-danger");
    alert.removeClass("alert-success");
    alert.addClass("hidden");
    $('div[id=loading-icon-signup]').removeClass('hidden');
}

function resetLoginInputs(){
  $('div[id="user-login-container"]').removeClass("has-error");
  $('span[id="user-login-icon"]').addClass("hidden");
  $('div[id="pass-login-container"]').removeClass("has-error");
  $('span[id="pass-login-icon"]').addClass("hidden");

    var alert =$('div[id=login-alert]');
    alert.removeClass("alert-danger");
    alert.removeClass("alert-success");
    alert.addClass("hidden");
    $('div[id=loading-icon-login]').removeClass('hidden');
}

function validateMail(mail){
	var exp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return exp.test(mail);
}

function login_callback(json, textStatus, jqXHR){
    console.log(json);
    var error = json['error'];
    var user = json['user'];
    var token = json['token'];

    var alert = $('div[id=login-alert]');
    alert.html(error);
    alert.removeClass("hidden");
    $('div[id=loading-icon-login]').addClass('hidden');
    if(error === "ok"){
        document.cookie = "username=" + user + ";token=" + token;
        setCookie("username", user);
        setCookie("token", token);
        //window.location.replace("/ucode2017/busqueda.html");
        alert.addClass("alert-success");
    }else{
        alert.addClass("alert-danger");
    }
}

function register_callback(json, textStatus, jqXHR){
    console.log(json);
    var error = json['error'];
    var user = json['user'];
    var token = json['token'];

    var alert = $('div[id=signup-alert]');
    alert.html(error);
    alert.removeClass("hidden");
    $('div[id=loading-icon-signup]').addClass('hidden');
    if(error === "ok"){
        document.cookie = "username=" + user + ";token=" + token;
        setCookie("username", user);
        setCookie("token", token);
        //window.location.replace("/ucode2017/busqueda.html");
        alert.addClass("alert-success");
    }else{
        alert.addClass("alert-danger");
    }
}
