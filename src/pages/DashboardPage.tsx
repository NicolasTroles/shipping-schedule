import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { addDays, subDays, format } from "date-fns";

// Icons
import DoneAllIcon from "@material-ui/icons/DoneAll";
import PanToolIcon from "@material-ui/icons/PanTool";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";

import type { Shipment } from "../data/Shipment";

const useStyles = makeStyles({
  wrapper: {
    marginTop: "30px",
  },
  cards: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  card: {
    width: "32%",
    minWidth: 100,
  },
  chip: {
    margin: "0 0 15px 10px",
  },
});

interface IDashboardPage {
  shipments: Shipment[];
}

interface INewShipments {
  [key: string]: Shipment[];
}

const defaultDate = {
  today: new Date(),
  sevenDays: addDays(new Date(), 7),
};

const statusList = {
  ARRIVED: [<DoneAllIcon />, "Arrived"],
  CUSTOMS_HOLD: [<PanToolIcon />, "Custom Hold"],
  IN_TRANSIT: [<LocalShippingIcon />, "In Transit"],
  ROLL_OVER: [<AddLocationIcon />, "Roll Over"],
  CANCELLED: [<CancelIcon />, "Cancelled"],
  TRANSPORT_ERROR: [<ErrorIcon />, "Transport Error"],
};
type IconsKeys = keyof typeof statusList;

export const DashboardPage: React.FC<IDashboardPage> = ({ shipments }) => {
  const classes = useStyles();
  const [dateRange, setDateRange] = useState(defaultDate);
  const [currentShipments, setCurrentShipments] = useState<INewShipments>({});

  const handleShipments = useCallback(() => {
    const newShipments: INewShipments = {};
    shipments
      .filter(
        (shipment) =>
          new Date(shipment.estimatedArrival) >= dateRange.today &&
          new Date(shipment.estimatedArrival) < dateRange.sevenDays
      )
      .sort((a, b) =>
        new Date(a.estimatedArrival) > new Date(b.estimatedArrival) ? 1 : -1
      )
      .forEach((shipment) => {
        if (!newShipments[shipment.estimatedArrival]) {
          newShipments[shipment.estimatedArrival] = [];
        }
        newShipments[shipment.estimatedArrival].push(shipment);
      });

    setCurrentShipments(newShipments);
  }, [shipments, dateRange]);

  useEffect(() => {
    if (shipments.length) {
      handleShipments();
    }
  }, [shipments, handleShipments]);

  return (
    <div className={classes.wrapper}>
      <h2>Next Arrivals of the Week</h2>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          setDateRange({
            today: subDays(dateRange.today, 7),
            sevenDays: subDays(dateRange.sevenDays, 7),
          })
        }
      >
        Last Seven Days
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0 15px" }}
        onClick={() =>
          setDateRange({
            today: addDays(dateRange.today, 7),
            sevenDays: addDays(dateRange.sevenDays, 7),
          })
        }
      >
        Next Seven Days
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={new Date().getDate() === dateRange.today.getDate()}
        onClick={() => setDateRange(defaultDate)}
      >
        Today
      </Button>

      {Object.entries(currentShipments).map(([day, shipments]) => {
        return (
          <div key={day}>
            <h2>
              {day} ({format(new Date(day), "EEEE")})
            </h2>
            <div className={classes.cards}>
              {shipments.map((shipment) => {
                return (
                  <Card className={classes.card} key={shipment.houseBillNumber}>
                    <CardContent>
                      <Tooltip
                        title={statusList[shipment.status as IconsKeys][1]}
                      >
                        <span>
                          {statusList[shipment.status as IconsKeys][0]}
                        </span>
                      </Tooltip>
                      <Chip
                        className={classes.chip}
                        size="small"
                        color="primary"
                        label={`House Bill Number: ${shipment.houseBillNumber}`}
                      />
                      <Typography gutterBottom>
                        <strong>Client:</strong> {shipment.client}
                      </Typography>
                      <Typography gutterBottom>
                        <strong>Origin:</strong> {shipment.origin}
                      </Typography>
                      <Typography gutterBottom>
                        <strong>Destination:</strong> {shipment.destination}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
