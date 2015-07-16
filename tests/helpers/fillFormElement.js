import Ember from "ember";
import getColumnSelector from "./getColumnSelector";

export default Ember.Test.registerHelper("fillFormElement", function (app, column, inputType, text, context) {
  return fillIn(getColumnSelector(column, inputType), text, context);
});
