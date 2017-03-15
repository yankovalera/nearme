// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.user = Ti.App.Properties.getObject('user', false);

Alloy.Globals.parse = require("reste")();
Alloy.Globals.parse.config({
    debug: true,
    timeout: 10000,
    url: Alloy.CFG.PARSE.URL,
    requestHeaders: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": Alloy.CFG.PARSE.APPLICATION_ID,
        "X-Parse-REST-API-Key": Alloy.CFG.PARSE.REST_API_KEY,
        "X-Parse-Session-Token": function() {
            return Alloy.Globals.user ? Alloy.Globals.user.sessionToken : '';
        }
    },
    models: [],
    methods: [{
        name: "login",
        get: 'login?username=<email>&password=<password>'
    }, {
        name: "resetPassword",
        post: 'requestPasswordReset',
    }, {
        name: "validToken",
        get: "users/me"
    }],
    onLoad: function(e, callback) {
        if (callback) {
            callback(e);
        }
    }
});

Alloy.Globals.goHome = function (user) {
    Alloy.Globals.user = user;

    Ti.App.Properties.setObject("user", user);

    Alloy.createController("home").getView().open();
};
