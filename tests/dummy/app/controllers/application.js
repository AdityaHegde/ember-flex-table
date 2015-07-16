import Ember from "ember";
import EmberColumnData from "ember-column-data";
/* jshint ignore:start */
import EmberFlexTable from "ember-flex-table";
/* jshint ignore:end */

export default Ember.Controller.extend({
  columnDataGroup : EmberColumnData.ColumnDataGroup.create({
    name : "tableTest",
    columns : [{
      name : "vara",
      label : "VarA",
      table : {
        sortable : true,
        additionalTableHeadClass : "col-md-5 table-head-vara",
        additionalTableCellClass : "table-cell-vara",
      },
    }, {
      name : "varb",
      label : "VarB",
      table : {
        tableCellType : "mapped",
        options : [
          {value : "v0", label : "l0"},
          {value : "v1", label : "l1"},
          {value : "v2", label : "l2"},
        ],
        sortable : true,
        additionalTableHeadClass : "col-md-5 table-head-varb",
        additionalTableCellClass : "table-cell-varb",
      },
    }],
    table : {
      additionalTableClass : "table-striped table-hover",
      additionalTableHeadClass : "table-head-class",
      additionalTableBodyClass : "table-body-class",
      additionalTableRowClass : "table-row-class",
    },
  }),
});
