import Ember from "ember";
import EmberColumnData from "ember-column-data";
/* jshint ignore:start */
import EmberFlexTable from "ember-flex-table";
/* jshint ignore:end */

export default Ember.Controller.extend({
  columnData : EmberColumnData.ColumnData.create({
    name : "tableTest",
    table : {
      moduleType : "table",
      tagName : "table",
      additionalClassNames : "table table-striped table-hover",
    },
    childrenColumnData : [{
      name : "tableHead",
      table : {
        moduleType : "tableHead",
        tagName : "thead",
      },
      childrenColumnData : [{
        name : "vara",
        label : "VarA",
        table : {
          sortable : true,
          additionalClassNames : "col-md-5 table-head-vara",
          moduleType : "tableHeadCell",
          tagName : "th",
        },
      }, {
        name : "varb",
        label : "VarB",
        table : {
          sortable : true,
          additionalClassNames : "col-md-5 table-head-varb",
          moduleType : "tableHeadCell",
          tagName : "th",
        },
      }],
    }, {
      name : "tableBody",
      table : {
        moduleType : "tableBody",
        tagName : "tbody",
      },
      childColumnData : {
        name : "tableRow",
        table : {
          moduleType : "tableRow",
          tagName : "tr",
        },
        childrenColumnData : [{
          name : "vara",
          label : "VarA",
          table : {
            additionalClassNames : "col-md-5 table-cell-vara",
            moduleType : "tableCell",
            tagName : "td",
          },
        }, {
          name : "varb",
          label : "VarB",
          table : {
            additionalClassNames : "col-md-5 table-cell-varb",
            moduleType : "tableCell",
            tagName : "td",
          },
        }],
      },
    }],
  }),
});
