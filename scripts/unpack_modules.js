'use strict'
const fs = require('fs')
const path = require('path')

// this is a script to unpack modules in the main-unminified module.
function main () {
  const allModules = require('../jsapp/_old_main_packed_modules')
  let moduleNameToNumberMap = buildNameToNumberMap(allModules)
  let moduleNumberToNameMapOld = buildNumberToNameMap(moduleNameToNumberMap)
  let moduleNumberToNameMap = {}
  for (let k in moduleNumberToNameMapOld) {
    moduleNumberToNameMap[k] = filterPreferredModuleNames(moduleNumberToNameMapOld[k])
  }
  //Object.entries(moduleNumberToNameMap).map(kv => kv[1].length > 1 && console.log(kv[0], '=', kv[1]))
  const unpacked_modules = 'unpacked_modules'
  if (fs.existsSync(unpacked_modules))
    rmdir(unpacked_modules)
  fs.mkdirSync(unpacked_modules)

  for (let moduleNumber in moduleNumberToNameMap) {
    let fileNames = moduleNumberToNameMap[moduleNumber]
    console.log(`writing module ${moduleNumber} to names: ${fileNames}`)
    let code = allModules[moduleNumber][0].toString()
    code = removeModuleWrapper(code)
    let commentPrefix = `/* This module was module number ${moduleNumber} in the old packed code and referenced in the old code by all of the following module names:\n`
    commentPrefix += moduleNumberToNameMapOld[moduleNumber].map(name => '* ' + name).join('\n')
    commentPrefix += '\n*/\n'
    code = commentPrefix + code
    for (let fname of fileNames) {
      if (!fname.endsWith('.js')) {
        fname = fname + '.js'
      }
      let dirname = path.dirname(path.join(unpacked_modules, fname))
      mkdir(dirname)
      fs.writeFileSync(path.join(unpacked_modules, fname), code)
    }
  }
}

function removeModuleWrapper (code) {
  let lines = code.split('\n')
  lines = lines.slice(1) // remove: function (require, module, exports) {
  lines.pop() // remove: }
  removeLeadingWhitespace(lines)
  return lines.join('\n')
}

function removeLeadingWhitespace (lines) {
  
  let wsMatches = /^(\s+)/.exec(lines[0])
  if (wsMatches && wsMatches.length > 0) {
    let ws = wsMatches[1]
    for (let i=0; i < lines.length - 1; i++) {
      if (lines[i].startsWith(ws))
        lines[i] = lines[i].slice(ws.length)
    }
  }
}

function mkdir (dirname) {
  let dirs = dirname.split(path.sep)
  for (let i = 0; i < dirs.length; i++) {
    let dir = dirs.slice(0, i+1).join(path.sep)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  }
}

function rmdir (dir) {
	var list = fs.readdirSync(dir);
	for(var i = 0; i < list.length; i++) {
		var filename = path.join(dir, list[i]);
		var stat = fs.statSync(filename);
		
		if(filename == "." || filename == "..") {
			// pass these files
		} else if(stat.isDirectory()) {
			// rmdir recursively
			rmdir(filename);
		} else {
			// rm fiilename
			fs.unlinkSync(filename);
		}
	}
	fs.rmdirSync(dir);
}

/**
 * Returns the set of names that are the most likely detailed names of the module given a set of all names used in the require statements
 */
function filterPreferredModuleNames (allModuleNames) {
  allModuleNames = allModuleNames.map(name => {
    // if node_modules is in the name, trim everything before node_modules:
    let nmi = name.indexOf('node_modules')
    if (nmi >= 0)
      name = name.slice(nmi)
    
    // remove ./ and ../ prefix
    for (let p of ['./../', '../../', '../', './']) {
      if (name.startsWith(p)) {
        //console.log('name:', p, name)
        name = name.slice(p.length)
      }
    }
    return name
  })

  allModuleNames = removeDuplicates(allModuleNames)
  allModuleNames = removePartialPaths(allModuleNames)
  allModuleNames = removePartialPaths(allModuleNames)
  return allModuleNames
}

function isPartialPathOf (a, b) {
  if (a == null || b == null)
    return false
  a = trimJs(a)
  b = trimJs(b)
  return b.length > a.length && b.endsWith(a)
}

function removePartialPaths (arr) {
  // remember to ignore a '.js' postfix when comparing as some require()'s include the js and some don't
  for (let i = arr.length-1; i >= 0; i--) {
    let current = arr[i]
    let others = arr.slice()
    others.splice(i, 1)
    for (let other of others) {
      if (isPartialPathOf(current, other)) {
        arr.splice(i, 1)
        break
      }
    }
  }
  return arr
}

function trimJs (s) {
  return s == null ? '' : s.endsWith('.js') ? s.slice(0, s.length - '.js'.length) : s
}

function sameName (a, b) {
  return trimJs(a) === trimJs(b)
}

function removeDuplicates (arr) {
  // note their might be some that like ['des.js', 'des'], so we use trimJs to account for that
  for (let i = arr.length-1; i >= 0; i--) {
    for (let i2 = i-1; i2 >= 0; i2--) {
      if (sameName(arr[i], arr[i2]))
        arr.splice(i2, 1)
    }
  }
  return arr
}

function buildNameToNumberMap (allModules) {
  // build module name => ID map from dependencies
  let moduleNameToNumberMap = {}
  for (let k in allModules) {
    let moduleDependencies = allModules[k][1]
    // moduleDependencies is an object with keys as module names and values as module numbers (which are keys in allModules:
    moduleNameToNumberMap = Object.assign(moduleNameToNumberMap, moduleDependencies)
  }
  moduleNameToNumberMap['main.js'] = 555 // because main.js was never referenced so we have to hack it in here
  return moduleNameToNumberMap
}

function buildNumberToNameMap (moduleNameToNumberMap) {
  let moduleNumberToNameMap = {}
  for (let k in moduleNameToNumberMap) {
    let newKey = moduleNameToNumberMap[k]
    let newValue = k
    if (!(newKey in moduleNumberToNameMap))
      moduleNumberToNameMap[newKey] = new Array()
    moduleNumberToNameMap[newKey].push(newValue)
  }
  return moduleNumberToNameMap
}

main()