/**
 * Created by Administrator on 2017/7/3.
 */
var path = require( 'path' );

module.exports = function ( req, res ) {
   // res.status( 404 ).render('404.html');
    res.status(404).sendFile( path.join(__dirname, '../../build', '404.html') ) ;
};
