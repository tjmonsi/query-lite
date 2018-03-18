/// <reference path="typings-project/global.d.ts"/>

/**
 * # query-lite
 * `<query-lite>` Query parameter setter and getter system. Parses query parameter into an object. Works with `@littleq/location-lite`
 *
 * This is a copied version of without using Polymer https://github.com/PolymerElements/iron-location/blob/__auto_generated_3.0_preview/iron-query-params.js
 *
 * @customElement
 *
 */

var QueryLite = (function (superclass) {
  function QueryLite () {
    superclass.call(this);
    this.__data = {};
  }

  if ( superclass ) QueryLite.__proto__ = superclass;
  QueryLite.prototype = Object.create( superclass && superclass.prototype );
  QueryLite.prototype.constructor = QueryLite;

  var prototypeAccessors = { query: { configurable: true },queryObject: { configurable: true } };
  var staticAccessors = { is: { configurable: true } };

  staticAccessors.is.get = function () { return 'query-lite'; };

  prototypeAccessors.query.set = function (query) {
    this.__data.query = query;
    this._queryChanged(query);
  };

  prototypeAccessors.query.get = function () {
    return this.__data.query;
  };

  prototypeAccessors.queryObject.set = function (queryObject) {
    this.__data.queryObject = queryObject;
    this._queryObjectChanged(queryObject);
  };

  prototypeAccessors.queryObject.get = function () {
    return this.__data.queryObject;
  };

  QueryLite.prototype.connectedCallback = function connectedCallback () {
    this.queryObject = {};
    this._dontReact = false;
  };

  QueryLite.prototype._queryChanged = function _queryChanged (query) {
    var this$1 = this;

    if (this._dontReactQuery) {
      return;
    }
    this._dontReact = true;
    this.queryObject = this.decodeParams(query);
    Promise.resolve().then(function () {
      this$1.dispatchEvent(new window.CustomEvent('query-object-change', { detail: this$1.queryObject }));
    });

    this._dontReact = false;
  };

  QueryLite.prototype._queryObjectChanged = function _queryObjectChanged (queryObject) {
    var this$1 = this;

    if (this._dontReact) {
      return;
    }
    this._dontReactQuery = true;
    this.query = this.encodeParams(queryObject)
      .replace(/%3F/g, '?')
      .replace(/%2F/g, '/')
      .replace(/'/g, '%27');

    Promise.resolve().then(function () {
      this$1.dispatchEvent(new window.CustomEvent('query-change', { detail: this$1.query }));
    });

    this._dontReactQuery = false;
  };

  QueryLite.prototype.encodeParams = function encodeParams (params) {
    var encodedParams = [];
    for (var key in params) {
      var value = params[key];
      if (value === '') {
        encodedParams.push(encodeURIComponent(key));
      } else if (value) {
        encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`);
      }
    }
    return encodedParams.join('&');
  };

  QueryLite.prototype.decodeParams = function decodeParams (paramString) {
    var params = {};
    // Work around a bug in decodeURIComponent where + is not
    // converted to spaces:
    paramString = (paramString || '').replace(/\+/g, '%20');
    var paramList = paramString.split('&');
    for (var i = 0; i < paramList.length; i++) {
      var param = paramList[i].split('=');
      if (param[0]) {
        params[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || '');
      }
    }
    return params;
  };

  Object.defineProperties( QueryLite.prototype, prototypeAccessors );
  Object.defineProperties( QueryLite, staticAccessors );

  return QueryLite;
}(window.HTMLElement));

if (!window.customElements.get(QueryLite.is)) {
  window.customElements.define(QueryLite.is, QueryLite);
} else {
  console.warn(`${QueryLite.is} is already defined somewhere. Please check your code.`);
}
