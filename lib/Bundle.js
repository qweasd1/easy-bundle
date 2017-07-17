/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Utils = require('./Utils');
const deepBundleCopy = Utils.deepBundleCopy
const deepBundleMerge = Utils.deepBundleMerge

class Bundle {
  constructor(bundleObj){
    this.value = bundleObj
  }
  mergeWith(...bundles){
    let mergedValue = bundles.reduce((target,bundle)=>{
      if (bundle instanceof Bundle) {
        return deepBundleMerge(target,bundle.value)
      }
      else {
        // also support pass in plain object
        return deepBundleMerge(target,bundle)
      }
    }, deepBundleCopy(this.value))
    return new Bundle(mergedValue)
  }
  
  pipe(...transforms){
    let copiedValue = deepBundleCopy(this.value)
    let transformedBundleValue = transforms.reduce((bundleValue,transform)=>{
      return transform(bundleValue)
    },copiedValue)
    return new Bundle(transformedBundleValue)
  }
  
}

module.exports = Bundle