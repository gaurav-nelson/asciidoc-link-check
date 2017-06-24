'use strict';

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
        linkCheck(link, opts, function (err, result) {
            if (opts.showProgressBar) {
                bar.tick();
            }
            callback(err, result);
        });
    }, callback);
};