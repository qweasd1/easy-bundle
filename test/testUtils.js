/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Utils = require('../lib/Utils');

let bundle = Utils.bundleFromFile("./tbundle")
console.log(bundle.value);