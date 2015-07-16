import Ember from "ember";
import getColumnSelector from "./getColumnSelector";

export default Ember.Test.registerHelper("clickFormElement", function (app, column, inputType, additionalSelector, context) {
  return click(getColumnSelector(column, inputType) + additionalSelector, context);
});
