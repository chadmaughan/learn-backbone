define(['item/item-list'], function(List) {

    var Item = Backbone.Model.extend({

        // defaults can be either an object, or a function returning an object
        defaults: {
            done: true
        },

        // Toggle the `done` state of this item.
        toggle: function() {
            this.save({done: !this.get("done")});
        }
    });

    return Item;
});