'use strict';

var _ = require('lodash');
var async = require('async');
var linkCheck = require('link-check');
var asciidocLinkExtractor = require('asciidoc-link-extractor');

module.exports = function asciidocLinkCheck(asciidoc, opts, callback) {
    if (arguments.length === 2 && typeof opts === 'function') {
        // optional 'opts' not supplied.
        callback = opts;
        opts = {};
    }

    async.mapLimit(_.uniq(asciidocLinkExtractor(asciidoc)), 2, function (link, callback) {
        linkCheck(link, opts, callback);
    }, callback);
};
