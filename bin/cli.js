#!/usr/bin/env node
'use strict';

var _path = require('path');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _getPort = require('get-port');

var _getPort2 = _interopRequireDefault(_getPort);

var _zeroLang = require('zero-lang');

var _index = require('../lib/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require((0, _path.resolve)(__dirname, '../package.json'));

_commander2.default.version(pkg.version).description('to visualize the dependencies of your project.').option('-a, --analyser <analyser>', 'define a npm module as a analyser(which will be passed to require() function)').option('-c, --config <config>', 'config file (js or json file)').option('-e, --entry <entry>', 'define the entry file for analyser').option('-o, --open', 'open /visualize in a browser').option('-p, --port <port>', 'define a port for the running server(default is a random port)').option('-s, --separator <separator>', 'separator for modules').parse(process.argv);

if (process.argv.length === 2) {
    _commander2.default.outputHelp();
} else {
    (function () {
        var config = {};
        var overrideConfigs = ['analyser', 'entry', 'port', 'separator'];

        try {
            _commander2.default.config && (config = require(path.resolve(process.cwd(), _commander2.default.config)));
        } catch (e) {
            console.error('cannot locate the configuration file', e);
        }

        (0, _zeroLang.each)(overrideConfigs, function (c) {
            _commander2.default[c] && (config[c] = _commander2.default[c]);
        });

        config.open = true;

        (0, _index2.default)(config);
    })();
}