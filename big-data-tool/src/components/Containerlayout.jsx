import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Gridlayout from "./Gridlayout";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./Appbar";
import Createform from "./Createform";
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Containerlayout(props) {
  const classes = useStyles();

  const history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography
          component="div"
          style={{ backgroundColor: "transparent", height: "100vh" }}
        >
          {/* <Appbar></Appbar> */}
          {/* <Router> */}
          <Gridlayout
            user={props.user}
            data={props.data}
            architectureFilters={props.architectureFilters}
            osFilters={props.osFilters}
            developerFilters={props.developerFilters}
            featureFilters={props.featureFilters}
            programmingLanguageFilters={props.programmingLanguageFilters}
            setSelectedTool={props.setSelectedTool}
          ></Gridlayout>
          {/* <Switch>
              <Route path="/" exact component={homePage} />
              <Route path="/create" exact component={createPage} />
            </Switch>
          </Router> */}
        </Typography>
      </Container>
    </React.Fragment>
  );
}
