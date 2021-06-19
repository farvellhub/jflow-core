
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./jflow-core.cjs.production.min.js')
} else {
  module.exports = require('./jflow-core.cjs.development.js')
}
