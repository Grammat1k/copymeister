/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Scheduler/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Scheduler/index.js":
/*!********************************!*\
  !*** ./src/Scheduler/index.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Config */ \"./src/common/Config/index.js\");\n/* harmony import */ var _common_Support_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Support/Logger */ \"./src/common/Support/Logger.js\");\n/* harmony import */ var locutus_php_datetime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! locutus/php/datetime */ \"locutus/php/datetime\");\n/* harmony import */ var locutus_php_datetime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(locutus_php_datetime__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! child_process */ \"child_process\");\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nconst logger = _common_Support_Logger__WEBPACK_IMPORTED_MODULE_1__[\"default\"].scope('Scheduler');\n\nlogger.info(`Checking scheduled videos for today: ${Object(locutus_php_datetime__WEBPACK_IMPORTED_MODULE_2__[\"date\"])('l, d. F Y')}.`)\n\nlet toBeProcessed = 0;\n\nfor (const seriesId in _common_Config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].series) {\n  const { publish } = _common_Config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].series[seriesId];\n\n  if (\n    !(\n      publish.frequency === 'daily' ||\n      publish.frequency === 'weekly' && publish.weekday.toLowerCase() === Object(locutus_php_datetime__WEBPACK_IMPORTED_MODULE_2__[\"date\"])('l').toLowerCase()\n    )\n  ) {\n    continue;\n  }\n\n  logger.info(`Found a scheduled video for the series [${seriesId}]. Planned release time: ${publish.time} ${publish.timezone}.`);\n\n  logger.start({prefix: `[${seriesId}]`, message: `Starting VideoCreator.`});\n\n  const cp = Object(child_process__WEBPACK_IMPORTED_MODULE_3__[\"exec\"])(`node ${path__WEBPACK_IMPORTED_MODULE_4___default.a.resolve(__dirname, 'video_creator.js')} \"${seriesId}\"`);\n\n  cp.on('close', (number) => {\n    if (number === 0) {\n      logger.success({prefix: `[${seriesId}]`, message: `Videocreator finished.`});\n    } else {\n      logger.error({prefix: `[${seriesId}]`, message: `VideoCreator exited with an error :-/.`});\n    }\n  });\n\n  if (true) {\n    cp.stdout.on('data', (data) => {\n      logger.debug({prefix: `VideoCreator/${seriesId}`, message: `Stdout: \\n    ${data.trim()}`});\n    });\n  }\n\n  cp.stderr.on('data', (data) => {\n    logger.scope(`VideoCreator/${seriesId}`).error(data.trim());\n  });\n\n  toBeProcessed++;\n}\n\nif (!toBeProcessed) {\n  logger.complete('No videos today, bye!');\n  process.exit(0);\n}\n\n\n//# sourceURL=webpack:///./src/Scheduler/index.js?");

/***/ }),

/***/ "./src/common/Config/index.js":
/*!************************************!*\
  !*** ./src/common/Config/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Support_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Support/Logger */ \"./src/common/Support/Logger.js\");\n\n\nconst logger = _Support_Logger__WEBPACK_IMPORTED_MODULE_0__[\"default\"].scope('Config');\n\nlogger.await('Loading config...');\n\nlet config = {};\n\ntry {\n  config = eval('require')('../config.json');\n  logger.complete('Config loaded.');\n} catch {\n  logger.error('Failed to load config!');\n  process.exit(1);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\n\n\n//# sourceURL=webpack:///./src/common/Config/index.js?");

/***/ }),

/***/ "./src/common/Support/Logger.js":
/*!**************************************!*\
  !*** ./src/common/Support/Logger.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var signale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! signale */ \"signale\");\n/* harmony import */ var signale__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(signale__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var figures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! figures */ \"figures\");\n/* harmony import */ var figures__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(figures__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction _formatScopeName()\n{\n    let scopeString = `[${this._scopeName}]`;\n    if (Array.isArray(this._scopeName)) {\n        const scopes = this._scopeName.filter(x => x.length !== 0);\n        scopeString = `${scopes.map(x => `[${x.trim()}]`).join(' ')}`;\n    }\n\n    return `${' '.repeat(this._config.longestScopeName - (scopeString.length - 2))}${scopeString}`;\n}\n\nsignale__WEBPACK_IMPORTED_MODULE_0__[\"_formatScopeName\"] = _formatScopeName;\nsignale__WEBPACK_IMPORTED_MODULE_0__[\"Signale\"].prototype._formatScopeName = _formatScopeName;\n\nsignale__WEBPACK_IMPORTED_MODULE_0__[\"config\"]({\n    displayTimestamp: true,\n    displayDate: false,\n    displayBadge: process.platform !== 'win32',\n\n    longestScopeName: 35,\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (signale__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./src/common/Support/Logger.js?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "figures":
/*!**************************!*\
  !*** external "figures" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"figures\");\n\n//# sourceURL=webpack:///external_%22figures%22?");

/***/ }),

/***/ "locutus/php/datetime":
/*!***************************************!*\
  !*** external "locutus/php/datetime" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"locutus/php/datetime\");\n\n//# sourceURL=webpack:///external_%22locutus/php/datetime%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "signale":
/*!**************************!*\
  !*** external "signale" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"signale\");\n\n//# sourceURL=webpack:///external_%22signale%22?");

/***/ })

/******/ });