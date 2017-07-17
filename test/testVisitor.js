/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Utils = require('../lib/Utils');

let b = {
  "a.js":"a",
  "b.js":"b",
  "dir":{
    "a.js":"nested a"
  },
  "dir2":{
    "ndir2":{}
  }
}


Utils.visitBundle({
  "**/*.js":(obj,key,value)=>{
    obj[key] = value + "!"
  },
  "**/*/":(obj,key,value)=>{
    console.log(value);
  }
},b)

// console.log(b);