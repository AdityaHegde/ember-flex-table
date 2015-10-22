import Ember from "ember";
import { moduleForComponent, test } from "ember-qunit";
import startApp from "../helpers/start-app";
import EmberColumnData from "ember-column-data";

moduleForComponent("ember-flex-table", "Ember Flex Table Head Tests", {
  beforeEach : function(assert) {
    assert.application = startApp();
  },

  afterEach : function(assert) {
    Ember.run(assert.application, 'destroy');
  },

  needs : [
    "view:emberFlexTableHead",
    "view:emberFlexTableBody",
    "view:emberFlexTableRow",
    "view:emberFlexTableHeadCell",
    "view:emberFlexTableCell",
    "view:emberFlexTableCheckboxCell",
    "view:emberFlexTableMappedValueCell",
  ],
});

test("Sanity Test", function(assert) {
  var that = this;

  createArray(assert);

  wait();

  andThen(function() {
    initTable(assert, that.subject(), assert.array, EmberColumnData.ColumnDataGroup.create({
      name : "tableTest",
      columns : [{
        name : "vara",
        label : "VarA",
        table : {
          tableCellType : "base",
        },
      }, {
        name : "varb",
        label : "VarB",
        table : {
          tableCellType : "checkbox",
          tableColumnName : "VarColB",
        },
      }, {
        name : "varc",
        label : "VarC",
        table : {
          tableCellType : "mapped",
          optionsPath : "options",
          valuePath : "o_val",
          mappedValuePath : "o_mapped",
        },
        options : Ember.A([
          Ember.Object.create({o_val : "valA", o_mapped : "mappedA"}),
          Ember.Object.create({o_val : "valB", o_mapped : "mappedB"}),
          Ember.Object.create({o_val : "valC", o_mapped : "mappedC"}),
        ]),
      }],
      table : {},
    }));
  });

  wait();

  andThen(function() {
    assert.equal($("th[data-column-name='vara'] span").html(), " VarA ", "Head of vara was as expected.");
    assert.equal($("th[data-column-name='varb'] span").html(), " VarColB ", "Head of varb was as expected.");
    assert.equal($("th[data-column-name='varc'] span").html(), " VarC ", "Head of varc was as expected.");
  });
});
