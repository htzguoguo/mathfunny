/**
 * Created by Administrator on 2017/7/3.
 */

var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
    port : process.env.EXPRESS_PORT || 8180,
    ip : '127.0.0.1'
};

config.mongodb = {
    port : process.env.MONGODB_PORT || 27017,
    host : process.env.MONGODB_HOST || 'localhost'
};

config.path = {

};

if ( PRODUCTION ) {
    config.express.ip = '0.0.0.0'
}

// config.db same deal
// config.email etc
// config.log





