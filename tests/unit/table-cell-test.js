import Ember from "ember";
import { moduleForComponent, test } from "ember-qunit";
import startApp from "../helpers/start-app";
import EmberColumnData from "ember-column-data";

moduleForComponent("ember-flex-table", "Ember Flex Table Cells Tests", {
  beforeEach : function(assert) {
    assert.application = startApp();
  },

  afterEach : function(assert) {
    Ember.run(assert.application, 'destroy');
  },

  needs : [
    "view:emberFlexTableRow",
    "view:emberFlexTableHead",
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
    assert.equal($("td[data-column-name='vara']").text().replace(/\n/g, " "), "test1  test5  test2  test4  test6  test3  test8  test7  ", "All vara values were displayed properly");
    verifyCheckboxes(assert, "td[data-column-name='varb'] input", [true, false, true, true, false, false, true, true], "All varb values were displayed properly");
    assert.equal($("td[data-column-name='varc']").text().replace(/\n/g, " "), "mappedA  mappedC  mappedB  mappedC  mappedA  mappedA  mappedB  mappedA  ", "All varc values were displayed properly");
  });
});

test("Checkbox cell", function(assert) {
  var that = this;

  createArray(assert);

  wait();

  andThen(function() {
    initTable(assert, that.subject(), assert.array, EmberColumnData.ColumnDataGroup.create({
      name : "tableTest",
      columns : [{
        name : "varb",
        label : "VarB",
        table : {
          tableCellType : "checkbox",
          tableColumnName : "VarColB",
        },
      }],
      table : {},
    }));
  });

  wait();

  andThen(function() {
    verifyCheckboxes(assert, "td[data-column-name='varb'] input", [true, false, true, true, false, false, true, true], "All varb values displayed were initially as expected");

    clickFormElement("varb", "input", ":nth(3)");
    clickFormElement("varb", "input", ":nth(4)");
  });

  wait();

  andThen(function() {
    verifyCheckboxes(assert, "td[data-column-name='varb'] input", [true, false, true, false, true, false, true, true], "All varb values displayed were as expected after clicking on a few checkboxes");
    assert.deepEqual(assert.array.mapBy("varb"), [true, false, true, false, true, false, true, true], "All varb values in array were as expected after clicking on a few checkboxes");
  });
});

test("Mapped value cell", function(assert) {
  var that = this;

  createArray(assert);

  wait();

  andThen(function() {
    initTable(assert, that.subject(), assert.array, EmberColumnData.ColumnDataGroup.create({
      name : "tableTest",
      columns : [{
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
    assert.equal($("td[data-column-name='varc']").text().replace(/\n/g, " "), "mappedA  mappedC  mappedB  mappedC  mappedA  mappedA  mappedB  mappedA  ", "All varc values displayed were as expected initially");

    Ember.run(function() {
      assert.array.objectAt(3).set("varc", "valB");
      assert.array.objectAt(4).set("varc", "valC");
    });
  });

  wait();

  andThen(function() {
    assert.equal($("td[data-column-name='varc']").text().replace(/\n/g, " "), "mappedA  mappedC  mappedB  mappedB  mappedC  mappedA  mappedB  mappedA  ", "All varc values displayed were as expected after changing varc values of a few elements");
  });
});
