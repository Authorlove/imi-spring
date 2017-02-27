/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	addEventListener('DOMContentLoaded', function () {
		var opt = __webpack_require__(2);
	
		var app = new Vue(opt).$mount('#app');
		window.app = app;
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(3)
	
	var Component = __webpack_require__(9)(
	  /* script */
	  __webpack_require__(10),
	  /* template */
	  __webpack_require__(11),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/melonzhang/Desktop/project/first-wide/src/anima.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] anima.vue: functional components are not supported with templates, they should use render functions.")}
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2d91be94", Component.options)
	  } else {
	    hotAPI.reload("data-v-2d91be94", Component.options)
	  }
	})()}
	
	module.exports = Component.exports


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(7)("daa7e226", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2d91be94!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./anima.vue", function() {
	     var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2d91be94!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./anima.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	exports.i(__webpack_require__(6), "");
	
	// module
	exports.push([module.id, "\nhtml {\n\tbackground-color: #fff;\n}\nbody {\n\tposition: relative;\n}\nhtml,\nbody,\n.container,\n.header {\n\tdisplay: -webkit-box;\n\tdisplay: flex;\n\tposition: fixed;\n\tmin-width: 980px;\n\twidth: 100%;\n\theight: 100%;\n\t-webkit-box-pack: center;\n\t        justify-content: center;\n\t-webkit-box-align: center;\n\t        align-items: center;\n\tbackground-color: #fff;\n}\n.logo {\n\tposition: relative;\n\twidth: 246px;\n\theight: 70px;\n\tmargin-right: 150px;\n}\n.logo img {\n\twidth: 100%;\n}\n.text {\n\tfont-size: 40px;\n\tmargin-bottom: 15px;\n}\n@-webkit-keyframes fadeInDown {\n0% {\n\t\topacity: 0;\n\t\t-webkit-transform: translateY(-20px)\n}\n100% {\n\t\topacity: 1;\n\t\t-webkit-transform: translateY(0)\n}\n}\n#animation_logo {\n\t-webkit-animation: fadeInDown 1s 1.5s ease both,pulse 2s 2.5s ease both infinite;\n\t-moz-animation: fadeInDown 1s 1.5s ease both,pulse 2s 2.5s ease both infinite;\n}\n@-webkit-keyframes pulse {\n0% {\n\t\t-webkit-transform: scale(1)\n}\n50% {\n\t\t-webkit-transform: scale(1.1)\n}\n100% {\n\t\t-webkit-transform: scale(1)\n}\n}\n.logo_a {\n\tposition: absolute;\n\theight: 70px;\n\ttop: 0;\n}\n.logo_a__left {\n\twidth: 112px;\n\tleft: 0;\n}\n.logo_a__right {\n\twidth: 134px;\n\tright: 0;\n}\n#animation_top {\n\t-webkit-animation: fadeInLeftBig 1s .5s ease-in-out both;\n\t-moz-animation: fadeInLeftBig 1s .5s ease-in-out both;\n}\n#animation_body {\n\t-webkit-animation: fadeInLeftBig 1s 1.5s ease-in-out both;\n\t-moz-animation: fadeInLeftBig 1s 1.5s ease-in-out both;\n}\n#animation_bot {\n\t-webkit-animation: fadeInLeftBig 1s 2.5s ease-in-out both;\n\t-moz-animation: fadeInLeftBig 1s 2.5s ease-in-out both;\n}\n@-webkit-keyframes fadeInLeftBig {\n0% {\n\t\topacity: 0;\n\t\t-webkit-transform: translateX(-2000px)\n}\n100% {\n\t\topacity: 1;\n\t\t-webkit-transform: translateX(0)\n}\n}\n#animation_line__top {\n\t-webkit-animation: fadeOutUpBig 1s .2s ease both;\n\t-moz-animation: fadeOutUpBig 1s .2s ease both;\n}\n#animation_line__left {\n\t-webkit-animation: fadeOutLeftBig 1s .2s ease both;\n\t-moz-animation: fadeOutLeftBig 1s .2s ease both;\n}\n@-webkit-keyframes fadeOutUpBig {\n0% {\n\t\t-webkit-transform: translateY(-2000px)\n}\n100% {\n\t\t-webkit-transform: translateY(0)\n}\n}\n@-webkit-keyframes fadeOutLeftBig {\n0% {\n\t\t-webkit-transform: translateX(-2000px)\n}\n100% {\n\t\t-webkit-transform: translateX(0)\n}\n}\n.line_one {\n\theight: 200px;\n\twidth: 5px;\n\tposition: absolute;\n\tmargin-left: -2.5px;\n\tleft: 50%;\n\tbackground-color: #000;\n\tbottom: -200px;\n}\n.line_two {\n\twidth: 200px;\n\theight: 5px;\n\tposition: absolute;\n\tmargin-top: -2.5px;\n\ttop: 50%;\n\tbackground-color: #000;\n\tright: -200px;\n}\n", "", {"version":3,"sources":["/./src/anima.vue?ccc89142"],"names":[],"mappings":";AAEA;CACA,uBAAA;CACA;AAEA;CACA,mBAAA;CACA;AAEA;;;;CAIA,qBAAA;CAAA,cAAA;CACA,gBAAA;CACA,iBAAA;CACA,YAAA;CACA,aAAA;CACA,yBAAA;SAAA,wBAAA;CACA,0BAAA;SAAA,oBAAA;CACA,uBAAA;CACA;AAEA;CACA,mBAAA;CACA,aAAA;CACA,aAAA;CACA,oBAAA;CACA;AAEA;CACA,YAAA;CACA;AAEA;CACA,gBAAA;CACA,oBAAA;CACA;AAEA;AACA;EACA,WAAA;EACA,oCAAA;CACA;AACA;EACA,WAAA;EACA,gCAAA;CACA;CACA;AAaA;CACA,iFAAA;CACA,8EAAA;CACA;AAEA;AACA;EACA,2BAAA;CACA;AACA;EACA,6BAAA;CACA;AACA;EACA,2BAAA;CACA;CACA;AAcA;CACA,mBAAA;CACA,aAAA;CACA,OAAA;CACA;AAEA;CACA,aAAA;CACA,QAAA;CACA;AAEA;CACA,aAAA;CACA,SAAA;CACA;AAEA;CACA,yDAAA;CACA,sDAAA;CACA;AAEA;CACA,0DAAA;CACA,uDAAA;CACA;AAEA;CACA,0DAAA;CACA,uDAAA;CACA;AAEA;AACA;EACA,WAAA;EACA,sCAAA;CACA;AACA;EACA,WAAA;EACA,gCAAA;CACA;CACA;AAaA;CACA,iDAAA;CACA,8CAAA;CACA;AAEA;CACA,mDAAA;CACA,gDAAA;CACA;AAEA;AACA;EACA,sCAAA;CACA;AACA;EACA,gCAAA;CACA;CACA;AAWA;AACA;EACA,sCAAA;CACA;AACA;EACA,gCAAA;CACA;CACA;AAWA;CACA,cAAA;CACA,WAAA;CACA,mBAAA;CACA,oBAAA;CACA,UAAA;CACA,uBAAA;CACA,eAAA;CACA;AAEA;CACA,aAAA;CACA,YAAA;CACA,mBAAA;CACA,mBAAA;CACA,SAAA;CACA,uBAAA;CACA,cAAA;CACA","file":"anima.vue","sourcesContent":["<style>\n\t@import \"../common/css/_reset.css\";\n\thtml {\n\t\tbackground-color: #fff;\n\t}\n\t\n\tbody {\n\t\tposition: relative;\n\t}\n\t\n\thtml,\n\tbody,\n\t.container,\n\t.header {\n\t\tdisplay: flex;\n\t\tposition: fixed;\n\t\tmin-width: 980px;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tbackground-color: #fff;\n\t}\n\t\n\t.logo {\n\t\tposition: relative;\n\t\twidth: 246px;\n\t\theight: 70px;\n\t\tmargin-right: 150px;\n\t}\n\t\n\t.logo img {\n\t\twidth: 100%;\n\t}\n\t\n\t.text {\n\t\tfont-size: 40px;\n\t\tmargin-bottom: 15px;\n\t}\n\t\n\t@-webkit-keyframes fadeInDown {\n\t\t0% {\n\t\t\topacity: 0;\n\t\t\t-webkit-transform: translateY(-20px)\n\t\t}\n\t\t100% {\n\t\t\topacity: 1;\n\t\t\t-webkit-transform: translateY(0)\n\t\t}\n\t}\n\t\n\t@-moz-keyframes fadeInDown {\n\t\t0% {\n\t\t\topacity: 0;\n\t\t\t-moz-transform: translateY(-20px)\n\t\t}\n\t\t100% {\n\t\t\topacity: 1;\n\t\t\t-moz-transform: translateY(0)\n\t\t}\n\t}\n\t\n\t#animation_logo {\n\t\t-webkit-animation: fadeInDown 1s 1.5s ease both,pulse 2s 2.5s ease both infinite;\n\t\t-moz-animation: fadeInDown 1s 1.5s ease both,pulse 2s 2.5s ease both infinite;\n\t}\n\t\n\t@-webkit-keyframes pulse {\n\t\t0% {\n\t\t\t-webkit-transform: scale(1)\n\t\t}\n\t\t50% {\n\t\t\t-webkit-transform: scale(1.1)\n\t\t}\n\t\t100% {\n\t\t\t-webkit-transform: scale(1)\n\t\t}\n\t}\n\t\n\t@-moz-keyframes pulse {\n\t\t0% {\n\t\t\t-moz-transform: scale(1)\n\t\t}\n\t\t50% {\n\t\t\t-moz-transform: scale(1.1)\n\t\t}\n\t\t100% {\n\t\t\t-moz-transform: scale(1)\n\t\t}\n\t}\n\t\n\t.logo_a {\n\t\tposition: absolute;\n\t\theight: 70px;\n\t\ttop: 0;\n\t}\n\t\n\t.logo_a__left {\n\t\twidth: 112px;\n\t\tleft: 0;\n\t}\n\t\n\t.logo_a__right {\n\t\twidth: 134px;\n\t\tright: 0;\n\t}\n\t\n\t#animation_top {\n\t\t-webkit-animation: fadeInLeftBig 1s .5s ease-in-out both;\n\t\t-moz-animation: fadeInLeftBig 1s .5s ease-in-out both;\n\t}\n\t\n\t#animation_body {\n\t\t-webkit-animation: fadeInLeftBig 1s 1.5s ease-in-out both;\n\t\t-moz-animation: fadeInLeftBig 1s 1.5s ease-in-out both;\n\t}\n\t\n\t#animation_bot {\n\t\t-webkit-animation: fadeInLeftBig 1s 2.5s ease-in-out both;\n\t\t-moz-animation: fadeInLeftBig 1s 2.5s ease-in-out both;\n\t}\n\t\n\t@-webkit-keyframes fadeInLeftBig {\n\t\t0% {\n\t\t\topacity: 0;\n\t\t\t-webkit-transform: translateX(-2000px)\n\t\t}\n\t\t100% {\n\t\t\topacity: 1;\n\t\t\t-webkit-transform: translateX(0)\n\t\t}\n\t}\n\t\n\t@-moz-keyframes fadeInLeftBig {\n\t\t0% {\n\t\t\topacity: 0;\n\t\t\t-moz-transform: translateX(-2000px)\n\t\t}\n\t\t100% {\n\t\t\topacity: 1;\n\t\t\t-moz-transform: translateX(0)\n\t\t}\n\t}\n\t\n\t#animation_line__top {\n\t\t-webkit-animation: fadeOutUpBig 1s .2s ease both;\n\t\t-moz-animation: fadeOutUpBig 1s .2s ease both;\n\t}\n\t\n\t#animation_line__left {\n\t\t-webkit-animation: fadeOutLeftBig 1s .2s ease both;\n\t\t-moz-animation: fadeOutLeftBig 1s .2s ease both;\n\t}\n\t\n\t@-webkit-keyframes fadeOutUpBig {\n\t\t0% {\n\t\t\t-webkit-transform: translateY(-2000px)\n\t\t}\n\t\t100% {\n\t\t\t-webkit-transform: translateY(0)\n\t\t}\n\t}\n\t\n\t@-moz-keyframes fadeOutUpBig {\n\t\t0% {\n\t\t\t-moz-transform: translateY(0)\n\t\t}\n\t\t100% {\n\t\t\t-moz-transform: translateY(-2000px)\n\t\t}\n\t}\n\t\n\t@-webkit-keyframes fadeOutLeftBig {\n\t\t0% {\n\t\t\t-webkit-transform: translateX(-2000px)\n\t\t}\n\t\t100% {\n\t\t\t-webkit-transform: translateX(0)\n\t\t}\n\t}\n\t\n\t@-moz-keyframes fadeOutLeftBig {\n\t\t0% {\n\t\t\t-moz-transform: translateX(0)\n\t\t}\n\t\t100% {\n\t\t\t-moz-transform: translateX(-2000px)\n\t\t}\n\t}\n\t\n\t.line_one {\n\t\theight: 200px;\n\t\twidth: 5px;\n\t\tposition: absolute;\n\t\tmargin-left: -2.5px;\n\t\tleft: 50%;\n\t\tbackground-color: #000;\n\t\tbottom: -200px;\n\t}\n\t\n\t.line_two {\n\t\twidth: 200px;\n\t\theight: 5px;\n\t\tposition: absolute;\n\t\tmargin-top: -2.5px;\n\t\ttop: 50%;\n\t\tbackground-color: #000;\n\t\tright: -200px;\n\t}\n</style>\n<template>\n\n\t<div class=\"container\" id=\"container\">\n\t\t<div class=\"logo\" id=\"animation_logo\">\n\t\t\t<img src=\"../images/minilogo2.png\" />\n\t\t\t<a href=\"javascript:\" class=\"logo_a logo_a__left\"></a>\n\t\t\t<a href=\"javascript:\" class=\"logo_a logo_a__right\"></a>\n\t\t</div>\n\t\t<div class=\"text\">\n\t\t\t<div class=\"text\" id=\"animation_top\">THE</div>\n\t\t\t<div class=\"text\" id=\"animation_body\">BESPOKE</div>\n\t\t\t<div class=\"text\" id=\"animation_bot\">EXPERIENCE</div>\n\t\t</div>\n\t\t<div class=\"line_one\" id=\"animation_line__top\"></div>\n\t\t<div class=\"line_two\" id=\"animation_line__left\"></div>\n\t</div>\n\n</template>\n\n<script>\n\tmodule.exports = {\n\t\tcomponents: {\n\n\t\t},\n\t\tdata: {\n\n\t\t},\n\t\twatch: {\n\n\t\t},\n\t\tcomputed: {\n\n\t\t},\n\t\tmethods: {\n\n\t\t},\n\t\tcreated() {\n\n\t\t},\n\t\tmounted() {\n\n\t\t}\n\n\t}\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, "html, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em,  img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb,  i, dl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\toutline: 0;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tbackground: transparent;\n}\nbody {\n\tline-height: 1;\n\tfont-family: \"Gotham Rounded Book\",\"HelveticaLight\", Helvetica, sans-serif;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\n\n/* remember to define focus styles! */\n:focus {\n\toutline: 0;\n}\n\n/* remember to highlight inserts somehow! */\nins {\n\ttext-decoration: none;\n}\ndel {\n\ttext-decoration: line-through;\n}\n\n/* tables still need 'cellspacing=\"0\"' in the markup */\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* Resetting HTML5! */\nsection, article, aside, header, footer, nav, dialog, figure { display:block; }", "", {"version":3,"sources":["/./common/css/_reset.css"],"names":[],"mappings":"AAAA;;;;;;;;CAQC,UAAU;CACV,WAAW;CACX,UAAU;CACV,WAAW;CACX,gBAAgB;CAChB,yBAAyB;CACzB,wBAAwB;CACxB;AACD;CACC,eAAe;CACf,2EAA2E;CAC3E;AACD;CACC,iBAAiB;CACjB;AACD;CACC,aAAa;CACb;AACD;;CAEC,YAAY;CACZ,cAAc;CACd;;AAED,sCAAsC;AACtC;CACC,WAAW;CACX;;AAED,4CAA4C;AAC5C;CACC,sBAAsB;CACtB;AACD;CACC,8BAA8B;CAC9B;;AAED,uDAAuD;AACvD;CACC,0BAA0B;CAC1B,kBAAkB;CAClB;;AAED,sBAAsB;AACtB,+DAA+D,cAAc,EAAE","file":"_reset.css","sourcesContent":["html, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em,  img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb,  i, dl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\toutline: 0;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tbackground: transparent;\n}\nbody {\n\tline-height: 1;\n\tfont-family: \"Gotham Rounded Book\",\"HelveticaLight\", Helvetica, sans-serif;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\n\n/* remember to define focus styles! */\n:focus {\n\toutline: 0;\n}\n\n/* remember to highlight inserts somehow! */\nins {\n\ttext-decoration: none;\n}\ndel {\n\ttext-decoration: line-through;\n}\n\n/* tables still need 'cellspacing=\"0\"' in the markup */\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\n/* Resetting HTML5! */\nsection, article, aside, header, footer, nav, dialog, figure { display:block; }"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/
	
	var hasDocument = typeof document !== 'undefined'
	
	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}
	
	var listToStyles = __webpack_require__(8)
	
	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}
	
	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/
	
	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}
	
	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}
	
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())
	
	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction
	
	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)
	
	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}
	
	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}
	
	function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = { css: css, media: media, sourceMap: sourceMap }
	    if (!newStyles[id]) {
	      part.id = parentId + ':0'
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      part.id = parentId + ':' + newStyles[id].parts.length
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}
	
	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}
	
	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
	  var hasSSR = styleElement != null
	
	  // if in production mode and style is already provided by SSR,
	  // simply do nothing.
	  if (hasSSR && isProduction) {
	    return noop
	  }
	
	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = styleElement || createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }
	
	  if (!hasSSR) {
	    update(obj)
	  }
	
	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}
	
	var replaceText = (function () {
	  var textStore = []
	
	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()
	
	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}
	
	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap
	
	  if (media) {
	    styleElement.setAttribute('media', media)
	  }
	
	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}
	
	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }
	
	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports
	
	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }
	
	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }
	
	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }
	
	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
		components: {},
		data: {},
		watch: {},
		computed: {},
		methods: {},
		created: function created() {},
		mounted: function mounted() {}
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _vm._m(0)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container",
	    attrs: {
	      "id": "container"
	    }
	  }, [_c('div', {
	    staticClass: "logo",
	    attrs: {
	      "id": "animation_logo"
	    }
	  }, [_c('img', {
	    attrs: {
	      "src": __webpack_require__(12)
	    }
	  }), _vm._v(" "), _c('a', {
	    staticClass: "logo_a logo_a__left",
	    attrs: {
	      "href": "javascript:"
	    }
	  }), _vm._v(" "), _c('a', {
	    staticClass: "logo_a logo_a__right",
	    attrs: {
	      "href": "javascript:"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "text"
	  }, [_c('div', {
	    staticClass: "text",
	    attrs: {
	      "id": "animation_top"
	    }
	  }, [_vm._v("THE")]), _vm._v(" "), _c('div', {
	    staticClass: "text",
	    attrs: {
	      "id": "animation_body"
	    }
	  }, [_vm._v("BESPOKE")]), _vm._v(" "), _c('div', {
	    staticClass: "text",
	    attrs: {
	      "id": "animation_bot"
	    }
	  }, [_vm._v("EXPERIENCE")])]), _vm._v(" "), _c('div', {
	    staticClass: "line_one",
	    attrs: {
	      "id": "animation_line__top"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "line_two",
	    attrs: {
	      "id": "animation_line__left"
	    }
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2d91be94", module.exports)
	  }
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2ecdfdb6f6eceb6d07987124f8898f16.png";

/***/ }
/******/ ]);
//# sourceMappingURL=anima.js.map