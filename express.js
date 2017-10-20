/**
 * Created by Administrator on 2016/12/23.
 */

var express = require( 'express' ),
    path = require( 'path' ),
    staticPath = path.join( __dirname + 'public' ),
    viewsPath = path.join( __dirname + 'views' ),
    defaultRouter = require( './lib/routers/default' ),
    errorHandler = require( './lib/controller/error' ),
    app;

app = express();

app.set( 'views', viewsPath );
app.set( 'view engine', '' );

app.use( express.static( staticPath ) );

app.use(defaultRouter);
app.use( errorHandler );

module.exports = app;






