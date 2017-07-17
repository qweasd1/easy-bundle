/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Bundle = require('./lib/Bundle');
const Utils = require('./lib/Utils');
const Visitor = require('./lib/Visitor');

function createBundle(obj) {
  return new Bundle(obj)
}


createBundle.contentOf = Utils.contentOfFile
createBundle.fromFile = Utils.bundleFromFile
createBundle.utils = Utils
createBundle.Visitor = Visitor


module.exports = createBundle