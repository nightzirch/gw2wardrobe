$(document).ready(function() {

})

function validate() {
    var form = document.querySelector("#registerForm");
    var username = form.username.value;
    var email = form.email.value;
    var password = form.password.value;
    var password2 = form.password2.value;
    var token = form.token.value;

    if (username && email && password && password2 && token) {
        if (username.length > 3) {
            if (validateEmail(email)) {
                if ((password == password2) && (password.length > 2)) {
                    if (validateToken(token)) {
                        // Validated
                        console.log("Validated");
                        $.ajax({
                        	type: "POST",
                        	url: "/register/post"
                        });

                        return true;
                    }
                }
            }
        }
    }

    // Validation failed
    console.log("Validation failed");
    wardrobe.alert("error", "Some error message", "<p>You did something wrong, but I'm not sure what. Try not do that again, maybe?</p>", "registerError")
    return false;
}

function validateEmail(email) {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email);
}

function validateToken(token) {
    var regex = /^([A-F]|[0-9]){8}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){20}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){4}-([A-F]|[0-9]){12}\b/i;
    return regex.test(token);
}
