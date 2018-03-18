// @ts-nocheck
/* eslint-disable no-undef */

suite('QueryLite', () => {
  test('should have not be a HTMLUnknownElement constructor', () => {
    const el = document.querySelector('#test');
    expect(el.constructor.is).to.equal('query-lite');
  });

  test('should have a queryObject given query', done => {
    const el = document.querySelector('#test');
    el.query = 'a=b&c=d';

    setTimeout(() => {
      expect(el.queryObject.a).to.equal('b');
      expect(el.queryObject.c).to.equal('d');
      done();
    });
  });

  test('should have a query given queryObject', done => {
    const el = document.querySelector('#test');
    el.queryObject = {
      e: 'f',
      g: 'h'
    };

    setTimeout(() => {
      expect(el.query).to.equal('e=f&g=h');
      done();
    });
  });

  test('should have a queryObject given query on query-object-change event', done => {
    const el = document.querySelector('#test');
    const queryObjectChange = ({ detail }) => {
      el.removeEventListener('query-object-change', queryObjectChange);
      expect(detail.i).to.equal('j');
      expect(detail.n).to.equal('a b');
      done();
    };
    el.addEventListener('query-object-change', queryObjectChange);

    el.query = 'i=j&n=a%20b';
  });

  test('should have a query given queryObject on query-change event', done => {
    const el = document.querySelector('#test');
    const queryChange = ({ detail }) => {
      el.removeEventListener('query-change', queryChange);
      expect(el.query).to.equal('e=f&g=h%20s');
      done();
    };
    el.addEventListener('query-change', queryChange);

    el.queryObject = {
      e: 'f',
      g: 'h s'
    };
  });
});
