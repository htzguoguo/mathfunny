/**
 * Created by Administrator on 2017/7/31.
 */

var phantom;
var phridge = require( 'phridge' );

// spawn a new PhantomJS process
phridge.spawn()
    .then(function (ph) {
        phantom = ph;
        return phantom.openPage("https://t66y.com/thread0806.php?fid=16&search=&page=1");
    })
    .then(function (page) {
        return page.run(function () {
            // this function runs inside PhantomJS with this bound to a webpage instance
            return this.title;
        });
    })
    .then(function (title) {
        console.log('Page title is ' + title);
        // terminates the process cleanly
        phantom.dispose();
    });





