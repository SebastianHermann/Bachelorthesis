import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "justify",
  },
  formControl: {
    //
  },
  formHeader: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Architecturefilter(props) {
  const classes = useStyles();
  const test = {};
  props.architecturefilters.map((datapoint) => {
    test[datapoint] = false;
  });
  const [state, setState] = React.useState({ ...test });
  console.log("State", state);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formHeader}>
          Architecture Components
        </FormLabel>
        <FormGroup>
          {props.architecturefilters.map((datapoint) => {
            // console.log("my datapoint is: ", datapoint);
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={state[datapoint]}
                    onChange={handleChange}
                    name={datapoint}
                  />
                }
                label={datapoint}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
