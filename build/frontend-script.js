/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/js/frontend.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* =============================================================== *\ 
   Filter-Buttons für .filter-button-group

   Dieses Modul setzt nur den Zustand pro Gruppe
   Architektur: Bottom-up, entkoppelt via globalem Event
   Aufgaben: 
		Aktivierung/Deaktivierung von Filtern
		visuelles Feedback,
        Triggern des globalen "global-filter-change"-Events
\* =============================================================== */


document.addEventListener("DOMContentLoaded", function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".filter-button-group").each(function () {
    const $group = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    $group.on("click", "[data-filter]", function () {
      const $btn = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      const clickedValue = $btn.data("filter");
      const currentValue = $group.attr("data-current-filter");
      const isSame = clickedValue === currentValue;
      const newValue = isSame ? "*" : clickedValue;

      // Neuen Zustand setzen
      $group.attr("data-current-filter", newValue);

      // Visueller Status
      $group.find("[data-filter]").removeClass("is-active");
      if (!isSame) $btn.addClass("is-active");

      // Globales Event feuern, das andere Komponenten auswerten
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).trigger("global-filter-change");
    });
  });

  // Einmaliges Initial-Event
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).trigger("global-filter-change");
});
})();

/******/ })()
;
//# sourceMappingURL=frontend-script.js.map