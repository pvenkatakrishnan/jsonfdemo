'use strict';

var adaro = require('adaro'),
    rules = require('./specialization'),
    specializer = require('karka').create(rules),
    dust = require('dustjs-linkedin'),
    engine = 'dust',
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    extend = require('util-extend');

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
    "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
    }
}));

app.use(express.static(__dirname + '/public'));
app.set('views','public/templates');
app.set('view engine', engine);


//Step 1: Decorate the engine that you feed into
//express app to first do the specialization map generation



function specialize(engine) {

    return function(name, context, callback) {
        //Step 2: Generate the specialization map on each render
        //for that context
        context._specialization = specializer.resolveAll(context);
        engine.apply(null, arguments);
    };
}


app.engine('dust', specialize(adaro[engine]({cache:false})));
//app.engine('dust', specialize(consolidate[engine]));


//Step 3: Use the hook in the rendering engine to switch
// the templates that are present in the map

dust.onLoad = function(name, context, cb) {

    var specialization = context.get('_specialization');
    fs.readFile(constructFilePath( specialization && specialization[name] || name), 'utf8', cb);
};

app.listen(8000, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, 8000);
});


app.get('/', function(req, res){
    res.render('index', req.session && req.session.custom);
});


app.get('/setCustom', function(req, res) {
    if(!req.session.custom) {
        req.session.custom = {};
    }
    extend(req.session.custom, req.query);
    res.redirect('/');
});

function constructFilePath(name) {
    var p;
    if (name.indexOf(app.get('views')) === -1) {
        p = path.join(app.get('views'), name);
    }
    return p + '.' + engine;
}