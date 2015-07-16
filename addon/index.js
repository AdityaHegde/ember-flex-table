import Ember from "ember";
import TableColumnData from "./column-data/index";

var
EmberFlexTable = Ember.Namespace.create(),
tableModules = [TableColumnData];
window.EmberFlexTable = EmberFlexTable;

for(var i = 0; i < tableModules.length; i++) {
  for(var k in tableModules[i]) {
    if(tableModules[i].hasOwnProperty(k)) {
      EmberFlexTable[k] = tableModules[i][k];
    }
  }
}

export default EmberFlexTable;
