import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import type { Shipment } from "../data/Shipment";

const defaultSizes = {
  header: 64,
  row: 52, // https://v4.mui.com/pt/components/data-grid/rows/#row-height
  tableHeader: 56,
  tableFooter: 52,
};

const defaultTableRows = 5;
const defaultTableHeight = "500px";

const COLUMNS: GridColDef[] = [
  {
    field: "houseBillNumber",
    headerName: "House Bill",
    width: 150,
  },
  {
    field: "client",
    headerName: "Shipper",
    width: 200,
  },
  {
    field: "origin",
    headerName: "Origin",
    width: 400,
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 400,
  },
  {
    field: "mode",
    headerName: "Mode",
    width: 200,
  },
  {
    field: "estimatedDeparture",
    headerName: "Estimated Departure",
    width: 200,
  },
  {
    field: "estimatedArrival",
    headerName: "Estimated Arrival",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
];

const useStyles = makeStyles({
  grid: {
    marginInline: 16,
    height: "100%",
  },
});

interface IShipmentsPage {
  shipments: Shipment[];
}

export const ShipmentsPage: React.FC<IShipmentsPage> = ({ shipments }) => {
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(defaultTableRows);
  const [tableHeight, setTableHeight] = useState(defaultTableHeight);

  const getTableSizes = () => {
    const globalHeader = document.getElementById("header");
    const paddingBottom = 10; // This value could be the global footer size

    const globalContentSize =
      (globalHeader?.offsetHeight || defaultSizes.header) + paddingBottom;

    const tableContentSize =
      window.innerHeight -
      defaultSizes.tableHeader -
      defaultSizes.tableFooter -
      globalContentSize;

    const newRowsPerPage = Math.floor(tableContentSize / defaultSizes.row);
    setRowsPerPage(newRowsPerPage);

    setTableHeight(`${window.innerHeight - globalContentSize}px`);
  };

  useEffect(() => {
    if (shipments.length) {
      getTableSizes();
    }
  }, [shipments]);

  useEffect(() => {
    window.addEventListener("resize", getTableSizes);
    return () => {
      window.removeEventListener("resize", getTableSizes);
    };
  }, []);

  return (
    <div style={{ height: tableHeight }}>
      <DataGrid
        className={classes.grid}
        rowHeight={defaultSizes.row}
        rows={shipments}
        columns={COLUMNS}
        pageSize={rowsPerPage}
        disableSelectionOnClick
      />
    </div>
  );
};
