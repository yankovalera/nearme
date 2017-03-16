// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function doRecover(e) {
    var email = $.email.getValue();

    if (!email) {
        alert('Please enter your email address.');
    } else {
        Alloy.Globals.loading.show('Loading...', false);

        Alloy.Globals.parse.resetPassword({
            body: {
                email: email.trim().toLowerCase()
            }
        }, function (e) {
            console.log(e);

            Alloy.Globals.loading.hide();

            if (_.isEmpty(e)) {
                alert('Password reset email will be sent. Please check your inbox.');
            } else if (e.error){
                alert(e.error);
            }
        });
    }
}
