define(function(List) {

    var Item = Backbone.Model.extend({

        // defaults can be either an object, or a function returning an object
        defaults: {
            done: false
        },

        // Toggle the `done` state of this item.
        toggle: function() {
            this.save({done: !this.get("done")});
        },

        // failed validations trigger an 'error' event
        validate: function(attrs) {
            if(attrs.text == 'read slashdot') {
                alert('Come on, really?');
                return 'No reading Slashdot. Only Hacker News';
            }
        }
    });

    return Item;
});