var useragent = require('express-useragent');

module.exports = {
    onPhantomPageCreate: function(phantom, req, res, next) {

        var source = req.headers['user-agent'];
        if(!source)
            source = req.headers['User-Agent'];
        var ua = useragent.parse(source);
        console.log(ua.isMobile);
        if(!ua.isMobile) {
            next();
            return;
        }

        req.prerender.page.run(function(resolve) {

            var customHeaders = this.customHeaders;

            customHeaders['X-Prerender'] = 1;

            customHeaders['User-Agent'] = "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1  iPhone";

            this.customHeaders = customHeaders;

            resolve();

        }).then(function() {

            next();
        }).catch(function() {

            next();
        });
    }
}
