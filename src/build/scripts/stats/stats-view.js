define(['lib/text!stats/stats.html'], function(html) {

    var StatsView = Backbone.View.extend({

        initialize: function() {
        },

        render: function() {

            var templateHtml = StatsView.template(this.model.toJSON());
            $(this.el).html(templateHtml);

            return this;
        }
    });

    Handlebars.registerHelper("plural", function(count) {
        return count == 1 ? 'item' : 'items';
    });

    StatsView.template = Handlebars.compile(html);

    return StatsView;
});