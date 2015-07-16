import TableColumnData from "./TableColumnData";
import TableColumnDataGroup from "./TableColumnDataGroup";
import TableColumnDataMap from "./TableColumnDataMap";
import TableRowTypesMap from "./table-row-types-map";
import TableCellTypesMap from "./table-cell-types-map";
import TableHeadTypesMap from "./table-head-types-map";
import EmberColumnData from "ember-column-data";
import EmberObjectUtils from "ember-object-utils";

EmberColumnData.ColumnData.reopen({
  table : EmberObjectUtils.belongsTo(TableColumnDataMap, "tableCellType", "base"),
});

EmberColumnData.ColumnDataGroup.reopen({
  table : EmberObjectUtils.belongsTo(TableColumnDataGroup),
});

export default {
  TableColumnData,
  TableColumnDataMap,
  TableColumnDataGroup,
  TableRowTypesMap,
  TableCellTypesMap,
  TableHeadTypesMap,
};
