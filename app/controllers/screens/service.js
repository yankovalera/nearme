// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.loading.show('Loading...', false);

Alloy.Collections.images.reset($model.get("images"));

Alloy.Collections.reviews.fetch({
    serviceId: $model.id,
    success: function () {
        Alloy.Globals.loading.hide();
    },
    error: function () {
        Alloy.Globals.loading.hide();
    }
});

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

function doReview(e) {
    Alloy.createController("modal/reviewEdit", { "$model" : transformReview() }).getView().open();
}

function doTabClick(e) {
    $.infoScrollable.scrollToView(e.source.index);
}

function doItemClick(e) {
    Alloy.createController("modal/reviewEdit", { "$model" : transformReview(e.itemId) }).getView().open();
}

function transformReview(id) {
    var review = id ? Alloy.Collections.reviews.get(id) : Alloy.Globals.parse.createModel("review");

    review.__transform = review.toJSON();

    if (!id) {
        review.set("service", {
            "__type": "Pointer",
            "className": "Service",
            "objectId": $model.id
        });

        review.set("user", {
            "__type": "Pointer",
            "className": "_User",
            "objectId": Alloy.Globals.user.objectId
        });
    }

    return review;
}
