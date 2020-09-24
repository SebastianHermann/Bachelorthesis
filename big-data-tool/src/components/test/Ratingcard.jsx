import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

export default function Ratingcard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [hasRated, setHasRated] = useState(false);
  const [rateOption, setRateOption] = useState(false);

  const loadRate = () => {
    fetch("/loadRate", {
      method: "POST",
      body: JSON.stringify({
        userMail: props.user,
        toolName1: props.toolName,
        toolName2: props.option.name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleRateClick = () => {
    // fetch("/createRate", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     userMail: props.user,
    //     toolName1: props.toolName,
    //     toolName2: props.option.name,
    //     hasRated: hasRated,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
  };

  const handleRate = () => {
    console.log(props.option, "in rating carrd");
    setHasRated(!hasRated);
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        {/* {props.ratingOption.name} */}
        <Button
          onClick={handleRate}
          size="small"
          variant={hasRated ? "contained" : "text"}
        >
          {/* {props.ratingOption.ratingAmount} */} 0 Rates
        </Button>
        {"  "}
        {props.option.name}
      </Typography>
    </div>
  );
}
