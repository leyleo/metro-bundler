/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 */

'use strict';
const crypto = require('crypto');
import type Module from '../node-haste/Module';

function createStableModuleIdFactory(): (module: Module) => string {
  const fileToIdMap = new Map();
  return (module: Module) => {    
    if (!fileToIdMap.has(module.path)) {
      fileToIdMap.set(
        module.path, 
        crypto.createHash('md5')
              .update(module.localPath)
              .update(module._readSourceCode())
              .digest('hex')
      );    
    }
    return fileToIdMap.get(module.path);
  };
}

module.exports = createStableModuleIdFactory;