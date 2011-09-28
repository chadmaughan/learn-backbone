define(function(List) {

    var Item = Backbone.Model.extend({

        // defaults can be either an object, or a function returning an object
        defaults: {
            done: false
        },

        // Toggle the `done` state of this item.
        toggle: function() {
            this.save({done: !this.get("done")});
        }
    });

    return Item;
});