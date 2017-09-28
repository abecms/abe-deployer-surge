'use strict';
var path = require('path');
var fs = require('fs');
var Surge = require('surge');

var surgeHooks = {}

var hooks = {
  afterPublish: function (postPath, result, abe) {
    if(abe.config.deployers && abe.config.deployers.surge && abe.config.deployers.surge.active === true){

      var elt = abe.config.deployers.surge
      var surge = new Surge
      var baseDir = path.join(abe.config.root, abe.config.publish.url);
      var defaultDomainName = path.basename(abe.config.root.replace(/\/+$/, "")) + '.surge.sh'
      var domain = (elt.hasOwnProperty("domain"))?elt.domain:defaultDomainName

      surgeHooks.postPublish = function (req, next) {
        console.log('Nice, it worked! 🚀  Published to Surge on ' + req.domain)
        next()
      }

      surge.publish(surgeHooks)({project:baseDir, domain:domain})
    }

    return result;
  },
  afterUnpublish: function (pathFile, json, abe) {
    if(abe.config.deployers && abe.config.deployers.surge && abe.config.deployers.surge.active === true){

      var elt = abe.config.deployers.surge
      var surge = new Surge
      var baseDir = path.join(abe.config.root, abe.config.publish.url);
      var defaultDomainName = path.basename(abe.config.root.replace(/\/+$/, "")) + '.surge.sh'
      var domain = (elt.hasOwnProperty("domain"))?elt.domain:defaultDomainName

      surgeHooks.postPublish = function (req, next) {
        console.log('Nice, it worked! 🚀  Published to Surge on ' + req.domain)
        next()
      }
      surge.publish(surgeHooks)({project:baseDir, domain:domain})
    }

    return pathFile;
  }
};

exports.default = hooks;