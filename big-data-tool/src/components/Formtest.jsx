import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Formtest() {
  const [name, setName] = React.useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // axios
    //   .post("https:127.0.0.1:5000/test", { name: name })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // console.log(
    //   JSON.stringify({
    //     name: name,
    //     description: "description",
    //   })
    // );

    fetch("/", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: "This is an example description",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <form onSubmit={submitHandler} className={classes.root} autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" value={name} onChange={handleChange} />
        <button type="submit">Submit</button>
      </FormControl>
    </form>
  );
}
