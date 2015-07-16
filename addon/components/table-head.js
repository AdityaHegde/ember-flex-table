import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";
import layout from "../templates/components/table-head";

export default Ember.Component.extend({
  layout : layout,
  tagName: "th",

  columnData : null,
  record : null,

  attributeBindings : ['colName:data-column-name'],
  colName : Ember.computed.alias("columnData.name"),

  classNameBindings : ["columnData.table.additionalTableHeadClass"],

  sortModifier : Ember.computed("record.arrayModifiers.@each.type", {
    get : function() {
      if(this.get("columnData.table.sortable")) {
        var
        arrayModifiers = this.get("record.arrayModifiers"),
        sortModifier = arrayModifiers && arrayModifiers.findBy("type", "sort");
        return sortModifier;
      }
      return null;
    },
  }),
  isSortedOn : Ember.computed("sortModifier.property", "columnData.key", {
    get : function() {
      return this.get("sortModifier.property") === this.get("columnData.key");
    },
  }),

  actions : {
    click_label : function() {
      if(this.get("columnData.table.sortable") && this.get("record.arrayModifiers")) {
        var
        columnData = this.get("columnData"),
        sortModifier = this.get("sortModifier");
        if(!sortModifier) {
          this.get("record.arrayModifiers").pushObject(EmberArrayModifier.ArraySortModifier.create({
            property : columnData.get("key"),
          }));
        }
        else if(sortModifier.get("property") !== columnData.get("key")) {
          sortModifier.set("property", columnData.get("key"));
        }
        else {
          sortModifier.set("order", !sortModifier.get("order"));
        }
      }
    },
  },
});
