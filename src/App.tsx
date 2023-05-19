import {
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// Api
import { fetchShipments, FetchShipmentsResult } from "./data/fetch-shipments";

// Styles
import "./App.css";

// Components
import { Navbar } from "./components/Navbar";
import { DashboardPage } from "./pages/DashboardPage";
import { ShipmentsPage } from "./pages/ShipmentsPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2AC3AD",
    },
  },
});

type LoadingResult = {
  status: "LOADING";
};
const INITIAL_RESULT: LoadingResult = {
  status: "LOADING",
};

const useStyles = makeStyles({
  loader: {
    margin: "auto",
    width: "fit-content",
    marginTop: 200,
  },
});

export const App = () => {
  const classes = useStyles();

  const [fetchShipmentsResult, setFetchShipmentsResult] = useState<
    FetchShipmentsResult | LoadingResult
  >(INITIAL_RESULT);

  useEffect(() => {
    fetchShipments().then((result) => setFetchShipmentsResult(result));
  }, []);

  let component: ReactElement;
  switch (fetchShipmentsResult.status) {
    case "SUCCESS":
      component = (
        <Container>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <DashboardPage shipments={fetchShipmentsResult.shipments} />
            </Route>
            <Route path="/shipments">
              <ShipmentsPage shipments={fetchShipmentsResult.shipments} />
            </Route>
          </Switch>
        </Container>
      );
      break;
    case "LOADING":
      component = <>Is loading</>;
      break;
    case "ERROR":
      component = <p>Error</p>;
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <>
          <Navbar />
          {component}
        </>
      </Router>
    </ThemeProvider>
  );
};
