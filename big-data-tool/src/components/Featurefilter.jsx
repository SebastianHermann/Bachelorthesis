/* eslint-disable no-use-before-define */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "justify",
  },
  formControl: {
    width: "100%",
  },
  formHeader: {
    marginBottom: theme.spacing(2),
  },
}));

export default function CheckboxesTags(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formHeader}>
          Features
        </FormLabel>
        <FormGroup>
          <Autocomplete
            style={{ maxWidth: "100%" }}
            multiple
            id="checkboxes-tags-demo"
            options={props.featureFilters}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </React.Fragment>
            )}
            //   style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Features"
                // placeholder="Start Typing..."
              />
            )}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
