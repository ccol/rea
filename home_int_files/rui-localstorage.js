(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("rui-localstorage", [], factory);
	else if(typeof exports === 'object')
		exports["rui-localstorage"] = factory();
	else
		root["RUI"] = root["RUI"] || {}, root["RUI"]["rui-localstorage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	var LS = {
	    /**
	     * Sets a new value in local storage for a given key
	     * @method setItem
	     * @static
	     * @param {String} key
	     * @param {String} value
	     */
	    setItem: function(key, value) {
	        try {
	            localStorage.setItem(key, value);
	        } catch (e) {}
	    },

	    /**
	     * return the value of the local storage with the given key
	     * @method getItem
	     * @static
	     * @param {String} key
	     * @return String
	     */
	    getItem: function(key) {
	        try {
	            return localStorage.getItem(key);
	        } catch (e) {}
	    },

	    /**
	     * return the value of the local storage with the given key if it
	     * exists or create it using the defaultCb function and set it if it
	     * doesn't
	     * @method getOrSetDefaultItem
	     * @static
	     * @param {String} key
	     * @param {String} defaultCb
	     * @return String
	     */
	    getOrSetDefaultItem: function(key, defaultCb) {
	        var item = this.getItem(key);
	        if (item === null && defaultCb) {
	            item = defaultCb();
	            this.setItem(key, item);
	        }
	        return item;
	    },

	    /**
	     * removes the local storage with the given key
	     * @method removeItem
	     * @static
	     * @param {String} key
	     */
	    removeItem: function(key) {
	        try {
	            return localStorage.removeItem(key);
	        } catch (e) {}
	    },
	    /**
	     * Check if an item available in the local storage for a given key
	     * @method checkItem
	     * @static
	     * @param {String} key
	     */

	    checkItem: function(key) {
	        try {
	            var isFound = false;
	            if (key in localStorage) {
	                isFound = true;
	            }
	            return isFound;
	        } catch (e) {}
	    },
	    /* Given the obj = {name: "foo", email: "s@s.com"},
	     * and the key = "foo"
	     *
	     * E.g. localStorage.setItemFromObject(key, obj)

	     * => sets the localStorage for "foo" key to "{\"name\": \"foo\", \"email\": \"s@s.com\" }"
	     *
	     */
	    setItemFromObject: function(key, data) {
	        if (!this.getItem(key)) {
	            this.setItem(key, "{}");
	        }

	        var value = JSON.parse(this.getItem(key)) || {};
	        for (var i in data) {
	            if (data.hasOwnProperty(i)) {
	                value[i] = data[i];
	            }
	        }
	        this.setItem(key, JSON.stringify(value));
	    },
	    /* Given the value => "{\"name\": \"foo\"}"
	     *   and the key = "foo"
	     *
	     * E.g. localStorage.getPropertyFromItem("name")
	     * => "foo"
	     *
	     */
	    getPropertyFromItem: function(key, property) {
	        var returnValue = "",
	            value = this.getItem(key);

	        //We need this check for android 2.3
	        if (value) {
	            value = JSON.parse(value) || {};
	            returnValue = value[property];
	        }
	        return returnValue;
	    }
	};

	module.exports = LS;



/***/ }
/******/ ])
});
;