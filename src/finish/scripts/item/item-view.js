// remember that RequireJS pulls all dependent text files asynchronously
// if you serve it from a CDN your application will be cached and fast
define(['lib/text!item/item.html', 'item/item'], function(html, Item) {

    var ItemView = Backbone.View.extend({

        // you can also bind to an existing element in an HTML page with
        // el: $('body'),
        
        tagName: "li",

        // remove the item, destroy the model
        clear: function() {
            this.model.destroy();
        },

        // switch this view into "editing" mode, displaying the input field
        edit: function() {
            var text = this.model.get('text');

            this.input = this.$('.todo-input');
            this.input.focus();
            this.input.val(text);

            $(this.el).addClass("editing");
        },

        // can be defined as a function that returns an events hash, allows
        // programmatic definition of events, or inherit them from parent views
        events: {
            // format { "event selector": "callback" }
            "click .check"              : "toggleDone",
            "dblclick div.todo-text"    : "edit",
            "click span.todo-destroy"   : "clear",
            "keypress .todo-input"      : "updateOnEnter"
        },

        // called as a constructor (if exists)
        initialize: function() {

            this.input = this.$('.todo-input');

            // optional third argument 'this' that will be used when the callback is later invoked
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);

            // TODO look into this
            // underscore.js call to bind 'this' to all functions that call it
            // possible replacement to passing 'this' as 3rd arg above?
            // _.bindAll(this, 'render');

        },

        // remove this view from the DOM
        remove: function() {
            $(this.el).remove();
        },

        // ahh, no HTML in your Javascript code.  Refreshing
        render: function() {
            
            // all views have a DOM element (via the el property) at all times
            //      this.el is created from the view's tagName, className, and id properties, if specified.
            //      If not, el is an empty div
            var templateHtml = ItemView.template(this.model.toJSON());
            $(this.el).html(templateHtml);

            // enables chained calls (ie obj.render().el)
            return this;
        },

        // To avoid XSS (not that it would be harmful in this particular app),
        // we use `jQuery.text` to set the contents of the to do item.
        setText: function() {
            var text = this.model.get('text');
            this.$('.todo-text').text(text);
            this.input = this.$('.todo-input');
            this.input.bind('blur', _.bind(this.close, this)).val(text);
        },

        // Toggle the "done" state of the model.
        toggleDone: function() {
            this.model.toggle();
        },
        
        // 'enter' finishes editing the item
        updateOnEnter: function(e) {
            if (e.keyCode == 13) {
                $(this.el).removeClass("editing");
                this.close;
            }
        }
    });

    // make the template static so you can access it elsewhere (if you need to)
    ItemView.template = Handlebars.compile(html);

    return ItemView;
});