(function () {
    'use strict';
    // this function is strict...
 }());

var _ = require('lodash');
var async = require('async');
var linkCheck = require('link-check');
var asciidocLinkExtractor = require('asciidoc-link-extractor');
var ProgressBar = require('progress');

module.exports = function asciidocLinkCheck(asciidoc, opts, callback) {
    if (arguments.length === 2 && typeof opts === 'function') {
        // optional 'opts' not supplied.
        callback = opts;
        opts = {};
    }

    var bar;
    var linksCollection = _.uniq(asciidocLinkExtractor(asciidoc));
    if (opts.showProgressBar) {
        bar = new ProgressBar('Checking... [:bar] :percent', {
            complete: '=',
            incomplete: ' ',
            width: 25,
            total: linksCollection.length
        });
    }

    async.mapLimit(linksCollection, 2, function (link, callback) {
        if (opts.ignorePatterns) {
            let shouldIgnore = opts.ignorePatterns.some(function(ignorePattern) {
                return ignorePattern.pattern instanceof RegExp ? ignorePattern.pattern.test(link) : (new RegExp(ignorePattern.pattern)).test(link) ? true : false;
            });
        
            if (shouldIgnore) {
                let linkCheckResult = {};

                linkCheckResult.link = link;
                linkCheckResult.statusCode = 0;
                linkCheckResult.status = 'ignored';
                if (opts.showProgressBar) {
                    bar.tick();
                }
                callback(null, linkCheckResult);
                return;
            }
        }
        
        linkCheck(link, opts, function (err, result) {
            if (opts.showProgressBar) {
                bar.tick();
            }
            callback(err, result);
        });
    }, callback);
};
