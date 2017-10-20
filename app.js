/**
 * Created by Administrator on 2017-10-18.
 */
const express = require('express');
const path = require('path');
const app = express();
const defaultRoute = require( './routes/default' );
const htmlPath = path.join( __dirname, 'build' );
const assertPath = path.join( __dirname, 'public' );

app.set('port', process.env.PORT || 3005);
app.use( '/', defaultRoute );
app.use('/public',express.static(assertPath));
app.use(express.static(htmlPath));





app.listen(app.get('port'), () => console.log('App started on port:', app.get('port')));
module.exports = app;