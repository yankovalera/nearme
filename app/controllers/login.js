// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;



function doLogin(e) {
    var error = '', email = $.email.getValue(), password = $.password.getValue();

    if (!email) {
        error += 'Please enter your email.' + "\r\n";
    }

    if (!password) {
        error += 'Please enter your password.' + "\r\n";
    }

    if (error) {
        alert(error);
    } else {
        Alloy.Globals.loading.show('Loading...', false);

        Alloy.Globals.parse.login({
            email: email.trim().toLowerCase(),
            password: password
        }, function(e) {
            Alloy.Globals.loading.hide();

            if (e && e.objectId) {
                Alloy.Globals.goHome(e);

                if (OS_IOS) {
                    $.navWindow.close();
                }
            } else if (e && e.error) {
                alert(e.error);
            } else {
                alert(L('connection_error'));
            }
        });
    }
}

function doForgot(e) {
    $.navWindow.openWindow(Alloy.createController("recover").getView());
}
