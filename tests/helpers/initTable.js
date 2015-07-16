import Ember from "ember";

export default Ember.Test.registerAsyncHelper("initTable", function(app, assert, table, record, columnDataGroup) {
  table.set("record", record);
  table.set("columnDataGroup", columnDataGroup);
  table.appendTo("#ember-testing");
  assert.table = table;
});
