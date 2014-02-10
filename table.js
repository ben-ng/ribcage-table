/* global $ */

var Base = require('ribcage-view')
  , Row = require('ribcage-table-row')
  , TableView;

TableView = Base.extend({

  afterInit: function (opts) {
    this.options = opts;
  }

, className: 'ribcage-table'

, getRowForIndex: function (index) {
    // Override this method
    return new Row({index: index});
  }

, getNumberOfRows: function () {
    return 0;
  }

, template: function () {
    return '';
  }

, afterRender: function () {
    for (var i = 0, ii=this.getNumberOfRows(); i<ii; ++i)
      this.appendSubview(this.getRowForIndex(i), this.$el);
  }

});

module.exports = TableView;
