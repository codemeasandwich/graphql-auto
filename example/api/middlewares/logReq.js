'use strict';

module.exports = function ({source, args, session, ast},next) {
     console.log("logReq.js")
     next(true)
}

