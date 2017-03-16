// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Collections.images.reset($model.get("images"));

function doOpenWeb(e) {
    Ti.Platform.openURL($model.get("website"));
}

function doCall(e) {
    if (OS_ANDROID) {
        Ti.Platform.openURL('tel:' + $model.get("phone"));
    } else {
        Ti.Platform.openURL('telprompt:' + $model.get("phone"));
    }
}
