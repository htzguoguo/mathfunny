/**
 * Created by Administrator on 2017/7/31.
 */

var https = require( 'https' ),           // http 网路
    http = require( 'http' ),
    request = require( 'request' ),
    fs = require( 'fs' );                // 流

var PATH = './upload/topic1/';

module.exports.getHtml1 = function ( href, callback ) {
    request(href , function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        callback( body );
    });
};

 module.exports.getHtml =  function getHtml( href, callback ) {
    console.log( '正在获取地址为： ' +  href + ' 网页内容' );
    var pageData = '';
    var req = https.request( href , function ( res ) {
        res.setEncoding( 'utf8' );
        res.on( 'data', function ( chunk ) {
            pageData += chunk;
        } );
        res.on( 'end', function () {
            callback( pageData );
        } );
    } );
    req.end();
    req.on('error', function(e) {
         console.error(e);
     });
};

module.exports.downloadImg = function downloadImg( path, imgUrl ) {
    var narr = imgUrl.split( '/' );
    var filename = path + narr[ narr.length - 1 ];
    fs.exists( filename, function ( b ) {
        if ( !b ) {
            https.get( imgUrl, function ( res ) {
                var imgData = '';
                res.setEncoding( 'binary' );
                res.on( 'data', function ( chunk ) {
                    imgData += chunk;
                } );
                res.on( 'end', function () {
                     fs.writeFile( filename, imgData, 'binary', function ( err ) {
                         console.log( err );
                     } );
                } );
            } );
        }
    } );
} ;

module.exports.saveJsonFile = function ( fileName, content ) {
    fs.writeFile( fileName, JSON.stringify( content ), 'utf8', function ( err ) {
        console.log( err );
    } );
};






