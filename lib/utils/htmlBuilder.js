/**
 * Created by Administrator on 2017/7/6.
 */

var fs = require( 'fs' ),
    HandleBars = require( 'handlebars' ),
    Swag = require('swag'),
    BUILD_PATH = './build';
Swag.registerHelpers(HandleBars);

module.exports = function ( templatefile, jsonfile ) {
    var template = HandleBars.compile(fs.readFileSync( templatefile, 'utf8' )),
        json = require( '../../articles/' + jsonfile );

    var outputString = template(json);
    var filePath  = generateFileName( jsonfile );
    removeFile( filePath );
    wstream = fs.createWriteStream( filePath );
    wstream.write( outputString );
    wstream.end();
    console.log( filePath + '' );
};

function generateFileName( title ) {
    return BUILD_PATH + '/' +  title + '.html';
}

function removeFile( filepath ) {
    if ( fs.existsSync( filepath ) ) {
        fs.unlinkSync( filepath );
    }
}




