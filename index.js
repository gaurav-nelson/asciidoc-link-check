'use strict';

var _ = require('lodash');
var async = require('async');
var linkCheck = require('link-check');
var asciidocLinkExtractor = require('asciidoc-link-extractor');
var ProgressBar = require('progress');
var bar;
var showProgressBar = false;

if (_.includes(process.argv, "--progress") || _.includes(process.argv, "-p")) {
    showProgressBar = true;
}

module.exports = function asciidocLinkCheck(asciidoc, opts, callback) {
    if (arguments.length === 2 && typeof opts === 'function') {
        // optional 'opts' not supplied.
        callback = opts;
        opts = {};
    }

    var linksCollection = _.uniq(asciidocLinkExtractor(asciidoc))
    if (showProgressBar) {
        bar = bar || new ProgressBar('Checking... [:bar] :percent', {
            complete: '=',
            incomplete: ' ',
            width: 25,
            total: linksCollection.length
        });
    }

    async.mapLimit(linksCollection, 2, function (link, callback) {
        linkCheck(link, opts, callback)
        if (showProgressBar) {
            bar.tick();
        }
    }, callback);
};