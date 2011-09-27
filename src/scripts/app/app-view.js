define(['lib/text!./app.html','stats/stats','stats/stats-view', 'item/item', 'item/item-view', 'item/item-list'],
    function(html, Stats, StatsView, Item, ItemView, ItemList) {

    var AppView = Backbone.View.extend({

        // delegated events for creating new items, and clearing completed ones.
        events: {
            "keypress #new-todo": "createOnEnter",
            "keyup #new-todo": "showTooltip",
            "click .todo-clear a": "clearCompleted"
        },

        initialize: function() {

            // initialize the item collection
            this.itemList = new ItemList();
            
            // bind collection changes to functions
            this.itemList.bind('add',   this.addOne, this);
            this.itemList.bind('reset', this.addAll, this);
            this.itemList.bind('all',   this.render, this);

            // load pre-existing items from *localStorage*
            this.itemList.fetch();
        },

        render: function() {

            // render the full app
            $(this.el).html(AppView.template());

            // once the app-view template is built, we can access the #new-todo element
            this.input = this.$("#new-todo");

            // add the stats bar
            var stats = new Stats();
            stats.set({'total' : this.itemList.length, 'done': this.itemList.done().length, 'remaining': this.itemList.remaining().length});

            var statsView = new StatsView({'model':stats});
            this.$('#todo-stats').html(statsView.render().el);

            // allows for chaining
            return this;
        },

        // Add a single to do item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(item) {

            // add the order before we append it
            item['order'] = this.itemList.nextOrder();

            var view = new ItemView({model: item});
            this.$("#todo-list").html(view.render().el);
        },

        // Add all items in the **to dos** collection at once.
        addAll: function() {
            this.itemList.each(this.addOne);
        },

        createOnEnter: function(e) {

            // return if they are hitting any key except enter
            var text = this.input.val();
            if (!text || e.keyCode != 13) {
                return;
            }

            alert('createOnEnter');
            this.itemList.create({text: text});
            this.input.val('');

            var view = new ItemView({text: text});
            this.$("#todo-list").html(view.render().el);
        },

        // Clear all done to do items, destroying their models.
        clearCompleted: function() {
            alert('clearCompleted');
            _.each(this.itemList.done(), function(item) {
                item.destroy();
            });
            return false;
        },

        // Lazily show the tooltip that tells you to press `enter` to save
        // a new to do item, after one second.
        showTooltip: function(e) {
            var tooltip = this.$(".ui-tooltip-top");
            var val = this.input.val();
            tooltip.fadeOut();
            if (this.tooltipTimeout)
                clearTimeout(this.tooltipTimeout);
            if (val == '' || val == this.input.attr('placeholder'))
                return;
            var show = function() {
                tooltip.show().fadeIn();
            };
            this.tooltipTimeout = _.delay(show, 1000);
        }
    });

    AppView.template = Handlebars.compile(html);
    
    return AppView;
});