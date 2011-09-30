define(function() {

    var Stats = Backbone.Model.extend({
        defaults: function() {
            return {
                total: 1,
                done: 1,
                remaining: 1
            };
        }
    });

    return Stats;
});