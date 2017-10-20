/**
 * Created by Administrator on 2017/7/31.
 */

var $ = require( 'cheerio' ),
     helper = require( './lib/utils/crawler_helper' );
var query_href = 'https://www.mathsisfun.com/numbers/pi.html';
var BASE_URL = 'https://www.mathsisfun.com/';
var IMG_PATH = './public/images/';


function start( url ) {
    var $page, $body, $content, result;
    result = {
        "title" : "数字的进化历史",
        "keywords" : "数学,学习,数字的历史",
        "description" : "简述了从自然数,整数,分数,有理数,无理数,实数,虚数,到复数的变化过程",
        "author" : "",
        "createtime" : "",
        "content" : []
    };
    helper.getHtml( url, function ( pageData ) {
        $page = $.load( pageData );
        $body = $page( 'body' );
        $content = $body.find( '#content' );
        $content.children().each( function (  ) {
            if ( validateElement( $(this) ) ) {
                parseElement( $(this), result.content );
            }
        } );
        helper.saveJsonFile( './articles/' + getJsonFileName( url ) + '.json', result   );

        console.log( ' The result is :  ', result );
    } );
}

function validateElement( $element ) {
    var result = true, id;
    if ( $element.is( 'div' ) ) {
        if ( $element.is( '.fun,.questions,.related' ) ) {
            result = false;
        }
        id = $element.attr( 'id' );
        if ( id === 'adend' || id === 'footer' || id === 'copyrt' ) {
            result = false;
        }
    }
    return result;
}

function parseElement($element, data) {
    parseTitle( $element, data );
    parseSecondTitle( $element, data );
    parseThirditle( $element, data );
    parseParagraph( $element, data );
    parseSpan( $element, data );
    parseExample( $element, data );
    parseTable( $element, data );
}

function parseTitle( $element, data ) {
   if ( $element.is( 'h1' ) ) {
       data.push( {
           "type" : "title",
           "content" : $element.html()
       } );
   }
}

function parseSecondTitle( $element, data ) {
    if ( $element.is( 'h2' ) ) {
        data.push( {
            "type" : "subheading",
            "content" : $element.html()
        } );
    }
}

function parseThirditle( $element, data ) {
    if ( $element.is( 'h3' ) ) {
        data.push( {
            "type" : "threeheading",
            "content" : $element.html()
        } );
    }
}

function parseParagraph( $element, data ) {
    var node = {};
    if ( $element.is( 'p' ) ) {
        node[ 'type' ] = "paragraph";
        parseElementProperty( $element, node, [ 'align', 'class', 'style' ] );
        preprocessImg( $element );
        propreccHref( $element );
        node[ 'content' ] = $element.html();
        data.push( node );
    }
}

function parseSpan( $element, data ) {
    var node = {};
    if ( $element.is( 'span' ) ) {
        node[ 'type' ] = "span";
        parseElementProperty( $element, node, [ 'align', 'class', 'style' ] );
        preprocessImg( $element );
        propreccHref( $element );
        node[ 'content' ] = $element.html();
        data.push( node );
    }
}

function preprocessImg( $element ) {
    var src;
    if ( $element.children( 'img' ).length > 0 ) {
        src = $element.children( 'img' ).attr( 'src' );
        helper.downloadImg( IMG_PATH, BASE_URL+   src );
        $element.children( 'img' ).attr( 'src', '../public/images/' + getImageName(src) );
    }
}

function propreccHref( $element ) {
    var href;
    if ( $element.children( 'a' ).length > 0 ) {
        href = $element.children( 'a' ).attr( 'href' );
        $element.children( 'a' ).attr( 'href', getImageName(href) );
    }
}

function parseTable( $element, data ) {
    var node = {}, items, nn;
    if ( $element.is( 'table' ) ) {
        node[ 'type' ] = "table";
        parseElementProperty( $element, node, [ 'border', 'width', 'align' ] );
        node[ 'content' ] = [];
        $element.children( 'tr' ).each( function (  ) {
            items = [];
            $( this ).children().each( function () {
                preprocessImg( $(this) );
                propreccHref( $(this) );
                nn = {
                    "type" : $(this).prop( 'nodeName' ) ,
                    "content" : $(this).html()
                };
                parseElementProperty( $(this), nn, [ 'style' ] );
                items.push( nn );
            } );
            node['content'].push( items );
        } );
        data.push( node );
    }
}

function parseExample( $element, data ) {
    var node = {}, content, src, href;
    if ( $element.is( 'div' ) ) {
        node[ 'type' ] = "example";
        parseElementProperty( $element, node, [ 'class' ] );
        node[ 'content' ] = [];
        $element.children().each( function (  ) {
            parseElement( $(this), node.content );
        } );
        data.push( node );
    }
}

function parseElementProperty( $element, node, properties ) {
    properties.forEach( function ( property, index  ) {
        if ( $element.attr( property ) ) {
            node[ property ] = $element.attr( property );
        }
    } );
}

function getImageName( src ) {
    var narr = src.split( '/' );
    var filename = narr[ narr.length - 1 ];
    return filename;
}

function getJsonFileName( url ) {
    var narr = url.split( '/' );
    var filename = narr[ narr.length - 1 ];
    return filename.split( '.' )[0];
}


start( query_href );









