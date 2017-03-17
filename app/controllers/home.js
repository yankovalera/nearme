// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


Alloy.Collections.services.comparator = function (a, b) {
    if (a.get('distance') < b.get('distance')) {
        return -1;
    } else if (a.get('distance') > b.get('distance')) {
        return 1;
    }

    return 0;
};


function doItemClick(e) {
    var service = Alloy.Collections.services.get(e.itemId);

    service.transform();

    $.navWindow.openWindow(Alloy.createController("screens/service", {
        "$model": service
    }).getView());
}

function transformService(model) {
    var modelJSON = model.toJSON();

    if (modelJSON.images.length > 0) {
        modelJSON.thumbnail = modelJSON.images[0].url;
    }

    modelJSON.distance = Math.round(modelJSON.distance * 100) / 100 + "km";

    modelJSON.search = modelJSON.title + " " + modelJSON.description;

    return modelJSON;
}

function doOpen(e) {
    if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {
        locationPermissionsReady();
    } else {
        Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
            if (e.success) {
                locationPermissionsReady();
            } else {
                fetchRemoteData({});
            }
        });
    }
}

function fetchRemoteData(data) {
    Alloy.Globals.loading.show('Loading...', false);

    Alloy.Collections.services.fetch({
        body: data,
        success: function() {
            Alloy.Globals.loading.hide();
        },
        error: function(e) {
            Alloy.Globals.loading.hide();
        }
    });

}

function locationPermissionsReady() {
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (!e.success || e.error) {
            fetchRemoteData({});
        } else {
            fetchRemoteData({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude
            });
        }
    });
}
