// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.loading.show('Loading...', false);

Alloy.Collections.services.fetch({
    success: function () {
        Alloy.Globals.loading.hide();
    },
    error: function (e) {
        console.log(e);

        Alloy.Globals.loading.hide();
    }
});

function doItemClick(e) {
    var service = Alloy.Collections.services.get(e.itemId);

    service.transform();

    $.navWindow.openWindow(Alloy.createController("screens/service", { "$model": service }).getView());
}

function transformService(model) {
    var modelJSON = model.toJSON();

    if (modelJSON.images.length > 0) {
        modelJSON.thumbnail = modelJSON.images[0].url;
    }

    modelJSON.search = modelJSON.title + " " + modelJSON.description;

    return modelJSON;
}
