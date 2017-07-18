/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Bundle = require('../lib/Bundle');
const Utils = require('../lib/Utils');

let b = new Bundle({
  "component":{
    "js.tpl":"`${name}`",
    "css.tpl":"",
    "html.tpl":""
  }
})


let b4 = b.pipe((bundleValue)=>{
  return Utils.visitBundleValue({
    "**/*.tpl":(obj,key,value)=>{
      obj[key] = "changed"
    },
    "component/":(obj,key,value)=>{
      delete obj[key]
      obj["newName"] = value
    }
  },bundleValue)
})
console.log(b4.value);
console.log(b.value);
// console.log(b.mergeWith(b2).value);
