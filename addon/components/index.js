import TableBody from "./table-body";
import TableHeadCell from "./table-head-cell";
import TableMappedValueCell from "./table-mapped-value-cell";
import Table from "./table";
import TableCell from "./table-cell";
import TableHead from "./table-head";
import TableRow from "./table-row";
import EmberFlexModules from "ember-flex-modules";

EmberFlexModules.ModuleTypesMap.table = "ember-flex-table";
EmberFlexModules.ModuleTypesMap.tableHead = "ember-flex-table-head";
EmberFlexModules.ModuleTypesMap.tableHeadCell = "ember-flex-table-head-cell";
EmberFlexModules.ModuleTypesMap.tableBody = "ember-flex-table-body";
EmberFlexModules.ModuleTypesMap.tableRow = "ember-flex-table-row";
EmberFlexModules.ModuleTypesMap.tableCell = "ember-flex-table-cell";
EmberFlexModules.ModuleTypesMap.tableMappedValueCell = "ember-flex-table-mapped-value-cell";

export default {
  Table                : Table,
  TableHead            : TableHead,
  TableHeadCell        : TableHeadCell,
  TableBody            : TableBody,
  TableRow             : TableRow,
  TableCell            : TableCell,
  TableMappedValueCell : TableMappedValueCell,
};
