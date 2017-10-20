/**
 * Created by Administrator on 2017/7/6.
 */

var htmlBuilder = require( './lib/utils/htmlBuilder' ),
    Path = require( 'path' ),
    fs = require( 'fs' ),
    templateFile = Path.join( __dirname + '/views/article_template.html' ),
    jsonFiles =  Path.join( __dirname + '/articles' )
    ;

fs.readdir(jsonFiles, function(err, files) {
    if (err) return;
    files.forEach(function (f) {
        var ss = f.split( '.' );
        htmlBuilder( templateFile, ss[0] );
    });
});


