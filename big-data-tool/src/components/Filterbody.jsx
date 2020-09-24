import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Architecturefilter from "./Architecturefilter";
import Featurefilter from "./Featurefilter";
import Categoryfilter from "./Categoryfilter";
import Osfilter from "./Osfilter";
import Developerfilter from "./Developerfilter";
import Programmingfilter from "./Programmingfilter";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Filterbody(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    horizontalScalability: false,
    multiStructuredData: false,
    lowLatencyProcessing: false,
    realTimeProcessing: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    horizontalScalability,
    multiStructuredData,
    lowLatencyProcessing,
    realTimeProcessing,
  } = state;

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="flex-start"
        // alignItems="flex-start"
      >
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Supports</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={horizontalScalability}
                    onChange={handleChange}
                    name="horizontalScalability"
                  />
                }
                label="Horizontal Scalability"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={lowLatencyProcessing}
                    onChange={handleChange}
                    name="lowLatencyProcessing"
                  />
                }
                label="Low-Latency Processing"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={realTimeProcessing}
                    onChange={handleChange}
                    name="realTimeProcessing"
                  />
                }
                label="Real-Time Processing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={multiStructuredData}
                    onChange={handleChange}
                    name="multiStructuredData"
                  />
                }
                label="Multi-Structured Data"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {/* <Categoryfilter> </Categoryfilter> */}
        </Grid>
        <Grid item xs={12}>
          {/* <Featurefilter featureFilters={props.featureFilters}></Featurefilter> */}
        </Grid>
        <Grid item xs={12}>
          {/* <Developerfilter
            developerFilters={props.developerFilters}
          ></Developerfilter> */}
        </Grid>
        <Grid item xs={12}>
          {/* <Programmingfilter
            programmingLanguageFilters={props.programmingLanguageFilters}
          ></Programmingfilter> */}
        </Grid>
        <Grid item xs={12}>
          {/* <Osfilter osFilters={props.osFilters}></Osfilter> */}
        </Grid>
      </Grid>
    </div>
  );
}
