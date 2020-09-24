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

export default function Osfilter(props) {
  const classes = useStyles();
  // const [state, setState] = React.useState({
  //   Windows: true,
  //   MacOs: false,
  //   Linux: false,
  // });

  const test = {};
  props.osFilters.map((datapoint) => {
    test[datapoint] = false;
  });
  const [state, setState] = React.useState({ ...test });
  console.log("State os", state);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // const { Windows, MacOs, Linux } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formHeader}>
          Operating System
        </FormLabel>
        <FormGroup>
          {props.osFilters.map((datapoint) => {
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
          {/* <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={Windows}
                onChange={handleChange}
                name="Windows"
              />
            }
            label="Windows"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={MacOs}
                onChange={handleChange}
                name="MacOs"
              />
            }
            label="MacOs"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={Linux}
                onChange={handleChange}
                name="Linux"
              />
            }
            label="Linux"
          /> */}
        </FormGroup>
      </FormControl>
    </div>
  );
}
