/**
 * Created by Administrator on 2017/7/3.
 */

var express = require( 'express' ),
    path = require( 'path' ),
    router = express.Router();

function home( req, res ) {
    //res.render( 'home.html' );
    res.sendFile( path.join(__dirname, '../../build', 'home.html') ) ;
}

router.get( '/', home );

module.exports = router;
