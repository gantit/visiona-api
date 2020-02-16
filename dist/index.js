"use strict";

require("core-js/modules/es.promise");

var _consola = require("consola");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const main = async () => {
  await _app.default.listen(4000);
  (0, _consola.success)('Server on port 4000');
};

main();