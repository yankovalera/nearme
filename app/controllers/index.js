if (Alloy.Globals.user) {
    Alloy.Globals.parse.validToken(function (e) {
        console.log('valid token');
        console.log(e);
        if (e && e.objectId) {
            Alloy.Globals.goHome(e);
        } else {
            Alloy.createController("login").getView().open();
        }
    });
} else {
    Alloy.createController("login").getView().open();
}
