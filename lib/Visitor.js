/**
 * Created by tony on 7/16/17.
 */
'use strict'

const anymatch = require('anymatch');

class Visitor{
  constructor(options){
    this.handlers = []
    for (let key of Object.keys(options)) {
      let matcher
      //TODO: this is a bug in anymatch, if a pattern startswith "**" and endswith "/" it won't match path like "*/", remove if anymatch fix this bug
      if (key.startsWith("**") && key.endsWith("/")) {
        let _innerMatcher = anymatch(key)
        matcher = (path)=>{
          return _innerMatcher("/" + path)
        }
      }
      else{
        matcher = anymatch(key)
      }
      
      this.handlers.push({
        matcher,
        handler:options[key]
      })
    }
  }
  
  visit(path, obj,key,value){
    this.handlers.forEach(h=>{
      if (h.matcher(path)) {
        h.handler(obj,key,value)
      }
    })
  }
}

module.exports = Visitor