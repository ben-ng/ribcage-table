/* globals mocha, describe, it, after */

var assert = require('assert')
  , fixture = document.getElementById('fixture')
  , TableView = require('../table.js')
  , instances = {}; // A temporary holder that we can `delete` to clear leaks

mocha.setup({
  ui: 'bdd',
  globals: []
}).timeout(10000);

describe('A Simple Table', function () {

  it('should not throw when initialized with a root view', function () {
    var MyTableView = TableView.extend({
      getNumberOfRows: function () {
        return 8;
      }
    });

    instances.viewInstance = new MyTableView({});
  });

  it('should append a div of eight divs', function () {
    var table;

    fixture.appendChild(instances.viewInstance.el);

    // This is the wrapper
    assert.equal(fixture.children.length, 1);

    // This is the table
    table = fixture.children[0];

    // There should be eight rows
    assert.equal(table.children.length, 8);

    // These should be the rows
    assert.equal(table.children[0].tagName, 'DIV');
    assert.equal(table.children[0].className.split(' ').length, 1);
    assert.ok(table.children[0].className.split(' ').indexOf('ribcage-table-row') >= 0);
  });

  it('should detach when closed', function () {
    instances.viewInstance.close();
    assert.equal(fixture.children.length, 0);
    assert.equal(fixture.innerHTML, '');
  });

  delete instances.viewInstance;
});

// Need this to be leakproof
after(function () {
  for(var k in instances)
    delete instances[k];
});

onload = function(){
  mocha.run();
};
