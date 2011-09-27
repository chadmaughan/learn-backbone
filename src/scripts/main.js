require.config({
    paths: {
        'jquery': 'lib/jquery-1.6.4',
        'underscore': 'lib/underscore-1.1.7',
        'handlebars': 'lib/handlebars.1.0.0.beta.3',
        'backbone': 'lib/backbone',
        'backbone-localstorage': 'lib/backbone-localstorage'
    }
});

require(['require','lib/order!jquery','lib/order!underscore','lib/order!backbone','lib/order!backbone-localstorage','handlebars'], function(require) {

    require(['app/app-view'], function(AppView) {

        var app = new AppView();
        $('#todoapp').append(app.render().el);

//        var item = new Item();
//        var itemView = new ItemView({'model':item});
//
//        $('#todoapp').append(itemView.render().el);
//
//        var stats = new Stats();
//        var statsView = new StatsView({'model':stats});
//        console.log(StatsView.template);
//        var statsEl = statsView.render();
//
//        alert(statsEl.el.innerHTML);
//        $('#todoapp').append(statsEl.el);

    });
});