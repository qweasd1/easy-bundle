/**
 * Created by tony on 7/16/17.
 */
'use strict'

const fs = require('fs');
const path = require('path');
const Visitor = require('./Visitor');
const Bundle = require('./Bundle');


function isBundleDirectory(obj) {
  return typeof obj === "object" && !(obj instanceof fs.ReadStream)
}

function deepBundleCopy(obj) {
  if (isBundleDirectory(obj)) {
    let copy = {}
    for (let key in obj) {
      copy[key] = deepBundleCopy(obj[key])
    }
    return copy
  }
  else {
    return obj
  }
}

function deepBundleMerge(obj1, obj2) {
  for (let key in obj2) {
    let obj1Value = obj1[key]
    if (typeof obj1Value === 'undefined') {
      obj1[key] = deepBundleCopy(obj2[key])
    }
    else {
      if (isBundleDirectory(obj1[key])) {
        deepBundleMerge(obj1[key], obj2[key])
      }
      else {
        obj1[key] = obj2[key]
      }
    }
  }
  return obj1
}

function visitBundle(visitor, bundleValue) {
  if (!(visitor instanceof Visitor)) {
    visitor = new Visitor(visitor)
  }
  _recursiveVisitBundleValue(visitor,"",bundleValue)
  return bundleValue
}


function _recursiveVisitBundleValue(visitor, path, bundleValue) {
  for (let key in bundleValue) {
    let childBundleValue = bundleValue[key]
    let childPath
    if (isBundleDirectory(childBundleValue)) {
      childPath = path + key + "/"
      _recursiveVisitBundleValue(visitor,childPath,childBundleValue)
    }
    else {
      childPath = path + key
    }
    visitor.visit(childPath, bundleValue, key, childBundleValue)
  }
}



function bundleFromFile(rootPath) {
  rootPath = path.resolve(rootPath)
  return new Bundle(_recursiveGetBundleFromFile(rootPath))
}

function _recursiveGetBundleFromFile(_path) {
  let bundleValue = {}
  let children = fs.readdirSync(_path)
  children.forEach((name)=>{
    let abosultePath =  path.join(_path,name)
    if (fs.lstatSync(abosultePath).isDirectory()) {
      bundleValue[name] = _recursiveGetBundleFromFile(abosultePath)
    }
    else {
      bundleValue[name] = fs.readFileSync(abosultePath).toString()
    }
  })
  
  return bundleValue
}

function contentOfFile(path) {
  return fs.readFileSync(path).toString()
}


module.exports = {
  deepBundleCopy,
  deepBundleMerge,
  isBundleDirectory,
  visitBundle,
  bundleFromFile,
  contentOfFile
}