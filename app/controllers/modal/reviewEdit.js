// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var editing = $model.id ? true : false;

console.log("edit" + editing);

function doAccept(e) {
    var review = $.review.getValue();

    if (!review) {
        alert(L('review_error'));
    } else {
        Alloy.Globals.loading.show('Saving...', false);

        $model.save({
            "review": review
        }, {
            patch: true,
            success: function () {
                Alloy.Globals.loading.hide();

                Alloy.Collections.reviews.add($model);

                $.reviewEdit.close();
            },
            error: function (e) {
                Alloy.Globals.loading.hide();

                alert('Connection error');
            }
        });
    }

}

function doCancel(e) {
    $.reviewEdit.close();
}

$.cleanup = function () {
    // let Alloy clean up listeners to global collections for data-binding
    // always call it since it'll just be empty if there are none
    $.destroy();

    // remove all event listeners on the controller
    $.off();
};
