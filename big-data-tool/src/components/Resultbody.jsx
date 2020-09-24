import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Toolcard from "./Toolcard";
import Tooloverview from "./test/Tooloverview";

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

export default function Resultbody(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column">
        {props.loading === true ? (
          <div>Loading...</div>
        ) : props.tools.length === 0 ? (
          <div>No Results found.</div>
        ) : (
          props.tools.map((tool) => {
            return (
              <Grid key={tool.id} item xs={12}>
                <Toolcard
                  handleSearch={props.handleSearch}
                  tool={tool}
                ></Toolcard>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}
