/**
 * Created by Administrator on 2017-10-18.
 */

var express = require('express'),
    path = require( 'path' );
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile( path.join(__dirname, '../build', 'evolution-of-numbers.html') ) ;
});

module.exports = router;
