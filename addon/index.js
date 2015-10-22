import Ember from "ember";
import TableColumnData from "./TableColumnData";
import components from "./components/index";

var
EmberFlexTable = Ember.Namespace.create(),
tableModules = [components];
window.EmberFlexTable = EmberFlexTable;
EmberFlexTable.TableColumnData = TableColumnData;

for(var i = 0; i < tableModules.length; i++) {
  for(var k in tableModules[i]) {
    if(tableModules[i].hasOwnProperty(k)) {
      EmberFlexTable[k] = tableModules[i][k];
    }
  }
}

export default EmberFlexTable;
