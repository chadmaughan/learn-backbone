define(['item/item'], function(Item) {

    var List = Backbone.Collection.extend({

        model: Item,

        localStorage: new Store("todos"),

        initialize: function() {
            this.model.bind('error', this.error, this);
        },

        error: function(model, error) {
            alert(error);
        },

        done: function() {
            return this.filter(function(todo) {
                return todo.get('done');
            });
        },

        remaining: function() {
            return this.without.apply(this, this.done());
        },

        nextOrder: function() {
            if (!this.length)
                return 1;
            return this.last().get('order') + 1;
        },

        comparator: function(todo) {
            return todo.get('order');
        }

    });

    return List;
});