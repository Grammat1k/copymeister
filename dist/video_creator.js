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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/VideoCreator/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/VideoCreator/index.js":
/*!***********************************!*\
  !*** ./src/VideoCreator/index.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_Crawler_Crawler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Crawler/Crawler */ \"./src/VideoCreator/lib/Crawler/Crawler.js\");\n/* harmony import */ var _lib_Downloader_VideoDownloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Downloader/VideoDownloader */ \"./src/VideoCreator/lib/Downloader/VideoDownloader.js\");\n/* harmony import */ var _lib_Merger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/Merger */ \"./src/VideoCreator/lib/Merger/index.js\");\n/* harmony import */ var _common_Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/Config */ \"./src/common/Config/index.js\");\n/* harmony import */ var _common_Support_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Support/Logger */ \"./src/common/Support/Logger.js\");\n\n\n\n\n\n\nconst logger = _common_Support_Logger__WEBPACK_IMPORTED_MODULE_4__[\"default\"].scope('Main');\n\nconst seriesId = process.argv[2];\nconst seriesConfig = _common_Config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].series[seriesId];\n\nif (!seriesConfig) {\n  throw new TypeError(`Invalid seriesId [${seriesId}]`);\n}\n\nconst crawler = new _lib_Crawler_Crawler__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_common_Config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].crawler.reddit);\n\nconst sources = seriesConfig.sources || [];\n\nif (!sources.length) {\n  throw new TypeError(`No source found!`);\n}\n\nPromise.all(sources.map(source =>\n  crawler.getVideoPosts(\n    source.source,\n    source.timespan,\n    seriesConfig.duration,\n    source.sort,\n  )\n)).then(posts => _lib_Downloader_VideoDownloader__WEBPACK_IMPORTED_MODULE_1__[\"default\"].download([].concat(...posts)))\n  .then(_lib_Merger__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mergeVideos)\n\n// scheduler.js => every day 0:00 am\n// nedb purges (write)\n// -> config\n// --> which videos to be produced\n// ---> index.js (child process)\n//      -> nedb (reads)\n// wait for all child process to finish\n\n\n//# sourceURL=webpack:///./src/VideoCreator/index.js?");

/***/ }),

/***/ "./src/VideoCreator/lib/Crawler/Crawler.js":
/*!*************************************************!*\
  !*** ./src/VideoCreator/lib/Crawler/Crawler.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Crawler; });\n/* harmony import */ var reddit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reddit */ \"reddit\");\n/* harmony import */ var reddit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reddit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var url_exist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url-exist */ \"url-exist\");\n/* harmony import */ var url_exist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url_exist__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass Crawler {\n  constructor({username, password, app_id: appId, app_secret: appSecret}) {\n    this.reddit = new reddit__WEBPACK_IMPORTED_MODULE_0___default.a({\n      username,\n      password,\n      appId,\n      appSecret\n    });\n  }\n\n  getVideoPosts(subreddit, time = 'day', durationLimit = 40, sort = 'top', limit = 100) {\n    if (!Array.isArray(subreddit)) subreddit = [subreddit];\n\n    return Promise.all(subreddit.map(subreddit => {\n      return this.reddit.get(`/r/${subreddit}/${sort}`, {\n        t: time,\n        limit,\n      }).then(async ({ data }) => {\n        const posts = [];\n\n        for (const { data: post } of data.children) {\n          if (post.crosspost_parent_list) continue; // no xposts\n          if (!post.is_video) continue; // only videos\n          if (post.media.reddit_video.is_gif) continue; // only real videos\n          if (post.media.reddit_video.duration > durationLimit) continue;\n          if (post.over_18) continue;\n          if (!await this.videoContainsAudio(post.media.reddit_video.fallback_url)) continue; // only videos with sound\n          // @todo duplication check\n\n          posts.push({\n            subreddit: post.subreddit,\n            name: post.name,\n            url: post.url,\n            reddit_video: {\n              fallback_url: post.media.reddit_video.fallback_url,\n              scrubber_media_url: post.media.reddit_video.scrubber_media_url,\n              duration: post.media.reddit_video.duration,\n            }\n          });\n        }\n\n\n        return posts;\n      });\n    })).then(results => [].concat(...results));\n  }\n\n  async videoContainsAudio(video_url) {\n    const audio_url = video_url.split('DASH_')[0] + `DASH_audio.mp4`;\n    return await url_exist__WEBPACK_IMPORTED_MODULE_1___default()(audio_url);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/VideoCreator/lib/Crawler/Crawler.js?");

/***/ }),

/***/ "./src/VideoCreator/lib/Downloader/VideoDownloader.js":
/*!************************************************************!*\
  !*** ./src/VideoCreator/lib/Downloader/VideoDownloader.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VideoDownloader; });\n/* harmony import */ var slash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! slash */ \"slash\");\n/* harmony import */ var slash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(slash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ffmpeg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ffmpeg */ \"./src/VideoCreator/lib/ffmpeg/index.js\");\n/* harmony import */ var tmp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tmp */ \"tmp\");\n/* harmony import */ var tmp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tmp__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var download__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! download */ \"download\");\n/* harmony import */ var download__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(download__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _common_Support_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/Support/Logger */ \"./src/common/Support/Logger.js\");\n\n\n\n\n\n\n\nconst logger = _common_Support_Logger__WEBPACK_IMPORTED_MODULE_5__[\"default\"].scope('Downloader/Reddit-V');\n\nclass VideoDownloader {\n  static async download(post) {\n    if (Array.isArray(post)) {\n      return await Promise.all(post.map(VideoDownloader.download))\n    }\n\n    const video_url = post.reddit_video.fallback_url;\n    const audio_url = video_url.split('DASH_')[0] + `DASH_audio.mp4`;\n\n    // Video\n    logger.await({prefix: `[#${post.name}]`, message: `Downloading video ...`});\n\n    const video_buffer = await download__WEBPACK_IMPORTED_MODULE_3___default()(video_url);\n\n    logger.complete({prefix: `[#${post.name}]`, message: `Successfully downloaded video.`});\n\n    // Audio\n    logger.await({prefix: `[#${post.name}]`, message: `Downloading audio tracks ...`});\n\n    const audio_buffer = await download__WEBPACK_IMPORTED_MODULE_3___default()(audio_url);\n\n    logger.complete({prefix: `[#${post.name}]`, message: `Successfully downloaded audio tracks.`});\n\n    const video_path = tmp__WEBPACK_IMPORTED_MODULE_2___default.a.tmpNameSync({\n      postfix: '.mp4'\n    });\n\n    const audio_path = tmp__WEBPACK_IMPORTED_MODULE_2___default.a.tmpNameSync({\n      postfix: '.mp4'\n    });\n\n    fs__WEBPACK_IMPORTED_MODULE_4___default.a.writeFileSync(video_path, video_buffer);\n    fs__WEBPACK_IMPORTED_MODULE_4___default.a.writeFileSync(audio_path, audio_buffer);\n\n    const merged_video_path = tmp__WEBPACK_IMPORTED_MODULE_2___default.a.tmpNameSync({\n      postfix: '.mp4'\n    });\n\n    logger.await({prefix: `[#${post.name}]`, message: `Merging audio and video tracks ...`});\n\n    await VideoDownloader.mergeAudioAndVideo(video_path, audio_path, merged_video_path);\n\n    logger.complete({prefix: `[#${post.name}]`, message: `Merging finished.`});\n\n    logger.await({prefix: `[#${post.name}]`, message: `Cleaning up...`});\n\n    fs__WEBPACK_IMPORTED_MODULE_4___default.a.unlinkSync(video_path);\n    fs__WEBPACK_IMPORTED_MODULE_4___default.a.unlinkSync(audio_path);\n\n    logger.complete({prefix: `[#${post.name}]`, message: `Finished cleaning up...`});\n\n    return {\n      ...post,\n      video_path: slash__WEBPACK_IMPORTED_MODULE_0___default()(merged_video_path)\n    };\n  }\n\n  static mergeAudioAndVideo(video_path, audio_path, output_path) {\n    return new Promise(ok => {\n      Object(_ffmpeg__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(video_path)\n        .on('end', () => ok())\n        .videoCodec('libx264')\n        .size('1920x1080')\n        .aspect('16:9')\n        .autopad()\n        .fps(30)\n        .addInput(audio_path)\n        .audioCodec('aac')\n        .audioBitrate('128k')\n        .audioChannels(2)\n        .save(output_path)\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/VideoCreator/lib/Downloader/VideoDownloader.js?");

/***/ }),

/***/ "./src/VideoCreator/lib/Merger/index.js":
/*!**********************************************!*\
  !*** ./src/VideoCreator/lib/Merger/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Merger; });\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! child_process */ \"child_process\");\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var tmp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tmp */ \"tmp\");\n/* harmony import */ var tmp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tmp__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _common_Support_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/Support/Logger */ \"./src/common/Support/Logger.js\");\n\n\n\n\n\nconst logger = _common_Support_Logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"].scope('Merger');\n\nclass Merger {\n  static mergeVideos(posts) {\n    return new Promise((ok, fail) => {\n      const merged_video_path = tmp__WEBPACK_IMPORTED_MODULE_1___default.a.tmpNameSync({\n        postfix: '.mp4'\n      });\n\n      const fileListFilename = tmp__WEBPACK_IMPORTED_MODULE_1___default.a.tmpNameSync({\n        postfix: '.txt'\n      });\n\n      fs__WEBPACK_IMPORTED_MODULE_2___default.a.writeFileSync(fileListFilename, posts.map(p => `file ${p.video_path}`).join('\\n'), 'utf8');\n\n      logger.await('Merging clips...');\n\n      const cp = Object(child_process__WEBPACK_IMPORTED_MODULE_0__[\"exec\"])(`${__webpack_require__(/*! ffmpeg-static */ \"ffmpeg-static\")} -f concat -safe 0 -i ${fileListFilename} -c copy ${merged_video_path} -y`);\n\n      cp.on('close', (exitCode) => {\n        if(exitCode === 0) {\n          logger.complete('Finished merging.');\n          logger.await('Cleaning up...');\n\n          posts.forEach(({video_path}) => {\n            fs__WEBPACK_IMPORTED_MODULE_2___default.a.unlinkSync(video_path);\n          });\n\n          fs__WEBPACK_IMPORTED_MODULE_2___default.a.unlinkSync(fileListFilename);\n\n          logger.complete('Finished cleaning up.')\n          ok();\n        }\n      });\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/VideoCreator/lib/Merger/index.js?");

/***/ }),

/***/ "./src/VideoCreator/lib/ffmpeg/index.js":
/*!**********************************************!*\
  !*** ./src/VideoCreator/lib/ffmpeg/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fluent_ffmpeg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fluent-ffmpeg */ \"fluent-ffmpeg\");\n/* harmony import */ var fluent_ffmpeg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fluent_ffmpeg__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ffmpeg_static__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ffmpeg-static */ \"ffmpeg-static\");\n/* harmony import */ var ffmpeg_static__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ffmpeg_static__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ffprobe_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ffprobe-static */ \"ffprobe-static\");\n/* harmony import */ var ffprobe_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ffprobe_static__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nfluent_ffmpeg__WEBPACK_IMPORTED_MODULE_0___default.a.setFfmpegPath(ffmpeg_static__WEBPACK_IMPORTED_MODULE_1___default.a);\nfluent_ffmpeg__WEBPACK_IMPORTED_MODULE_0___default.a.setFfprobePath(ffprobe_static__WEBPACK_IMPORTED_MODULE_2__[\"path\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (fluent_ffmpeg__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n\n//# sourceURL=webpack:///./src/VideoCreator/lib/ffmpeg/index.js?");

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

/***/ "download":
/*!***************************!*\
  !*** external "download" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"download\");\n\n//# sourceURL=webpack:///external_%22download%22?");

/***/ }),

/***/ "ffmpeg-static":
/*!********************************!*\
  !*** external "ffmpeg-static" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ffmpeg-static\");\n\n//# sourceURL=webpack:///external_%22ffmpeg-static%22?");

/***/ }),

/***/ "ffprobe-static":
/*!*********************************!*\
  !*** external "ffprobe-static" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ffprobe-static\");\n\n//# sourceURL=webpack:///external_%22ffprobe-static%22?");

/***/ }),

/***/ "figures":
/*!**************************!*\
  !*** external "figures" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"figures\");\n\n//# sourceURL=webpack:///external_%22figures%22?");

/***/ }),

/***/ "fluent-ffmpeg":
/*!********************************!*\
  !*** external "fluent-ffmpeg" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fluent-ffmpeg\");\n\n//# sourceURL=webpack:///external_%22fluent-ffmpeg%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "reddit":
/*!*************************!*\
  !*** external "reddit" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reddit\");\n\n//# sourceURL=webpack:///external_%22reddit%22?");

/***/ }),

/***/ "signale":
/*!**************************!*\
  !*** external "signale" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"signale\");\n\n//# sourceURL=webpack:///external_%22signale%22?");

/***/ }),

/***/ "slash":
/*!************************!*\
  !*** external "slash" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"slash\");\n\n//# sourceURL=webpack:///external_%22slash%22?");

/***/ }),

/***/ "tmp":
/*!**********************!*\
  !*** external "tmp" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"tmp\");\n\n//# sourceURL=webpack:///external_%22tmp%22?");

/***/ }),

/***/ "url-exist":
/*!****************************!*\
  !*** external "url-exist" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url-exist\");\n\n//# sourceURL=webpack:///external_%22url-exist%22?");

/***/ })

/******/ });