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
    justifySelf: "flex-start",
  },
}));

export default function Categoryfilter() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Category1: true,
    Category2: false,
    Category3: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { Category1, Category2, Category3 } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formHeader}>
          Categories
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={Category1}
                onChange={handleChange}
                name="Category1"
              />
            }
            label="Category1 (7)"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={Category2}
                onChange={handleChange}
                name="Category2"
              />
            }
            label="Category2 (1)"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={Category3}
                onChange={handleChange}
                name="Category3"
              />
            }
            label="Category3 (3)"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
