var express = require('express'),
    app = express.createServer(),
    jadeBrowser = require('jade-browser'),
    mirror = require('mirror'),
    _ = require('underscore')._;

app.set('view engine', 'jade');
app.set('view options', {
    layout: false
});
app.helpers({ _:_ });


app.use(express.static(__dirname + '/assets'));
app.use(jadeBrowser('/js/templates.js', '**', {
    root: __dirname + '/views',
    minify: true,
    reinherit: { 'layout': 'layout.client' }
}));

app.get('/js/jade.runtime.js', new mirror([
    require.resolve('jade/runtime'),
], { type: '.js' }).handler);

app.get('/', function(req, res, next) {
    var posts = _(_.range(0, 51)).map(function(i) {
        return {
            url: "/post/" + i,
            hasMore: i % 2 ? true : false,
        title: "Hello world " + i, 
        html: "hello world body " + i 
        };
    });
    res.render('test', {contents: {posts: posts}});
});

app.listen(8000);
