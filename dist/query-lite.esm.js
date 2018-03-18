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

class QueryLite extends window.HTMLElement {
  static get is () { return 'query-lite'; }

  constructor () {
    super();
    this.__data = {};
  }

  set query (query) {
    this.__data.query = query;
    this._queryChanged(query);
  }

  get query () {
    return this.__data.query;
  }

  set queryObject (queryObject) {
    this.__data.queryObject = queryObject;
    this._queryObjectChanged(queryObject);
  }

  get queryObject () {
    return this.__data.queryObject;
  }

  connectedCallback () {
    this.queryObject = {};
    this._dontReact = false;
  }

  _queryChanged (query) {
    if (this._dontReactQuery) {
      return;
    }
    this._dontReact = true;
    this.queryObject = this.decodeParams(query);
    Promise.resolve().then(() => {
      this.dispatchEvent(new window.CustomEvent('query-object-change', { detail: this.queryObject }));
    });

    this._dontReact = false;
  }

  _queryObjectChanged (queryObject) {
    if (this._dontReact) {
      return;
    }
    this._dontReactQuery = true;
    this.query = this.encodeParams(queryObject)
      .replace(/%3F/g, '?')
      .replace(/%2F/g, '/')
      .replace(/'/g, '%27');

    Promise.resolve().then(() => {
      this.dispatchEvent(new window.CustomEvent('query-change', { detail: this.query }));
    });

    this._dontReactQuery = false;
  }

  encodeParams (params) {
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
  }

  decodeParams (paramString) {
    const params = {};
    // Work around a bug in decodeURIComponent where + is not
    // converted to spaces:
    paramString = (paramString || '').replace(/\+/g, '%20');
    const paramList = paramString.split('&');
    for (let i = 0; i < paramList.length; i++) {
      let param = paramList[i].split('=');
      if (param[0]) {
        params[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || '');
      }
    }
    return params;
  }
}

if (!window.customElements.get(QueryLite.is)) {
  window.customElements.define(QueryLite.is, QueryLite);
} else {
  console.warn(`${QueryLite.is} is already defined somewhere. Please check your code.`);
}
