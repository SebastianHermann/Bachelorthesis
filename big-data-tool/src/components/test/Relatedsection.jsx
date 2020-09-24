import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Toolautocomplete from "./Toolautocomplete";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllByDisplayValue } from "@testing-library/react";
import Addrateoption from "./Addrateoption";
import Ratingcard from "./Ratingcard";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "left",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Relatedsection(props) {
  const classes = useStyles();

  const [tools, setTools] = useState([]);
  const [rateOptions, setRateOptions] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingRateOptions, setLoadingRateOptions] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedTool, setSelectedTool] = useState();

  // Do the API Call when the component is fetched
  useEffect(() => {
    loadTools();
    loadRateOptions();
  }, []);

  const handleToolSelection = (event, value) => {
    if (value.length === 0) {
      setIsEmpty(true);
      setSelectedTool("");
    } else {
      setIsEmpty(false);
      setSelectedTool(value);
    }
  };

  const handleAddClick = () => {
    console.log("value of clicked   ", selectedTool);
    // add rating component
    // Reload Tools
  };

  const loadTools = async () => {
    const result = await fetch("/allTools");
    const getResult = await result.json();
    setTools(getResult);
    setLoading(false);
  };

  const loadRateOptions = async () => {
    const result = await fetch("/loadRateOptions", {
      method: "POST",
      body: JSON.stringify({
        name: props.toolName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const getResult = await result.json();
    console.log(getResult, "in load Rate Options");
    setRateOptions(getResult);
    setLoadingRateOptions(false);
  };

  const createRateOption = async () => {
    fetch("/createRateOption", {
      method: "POST",
      body: JSON.stringify({
        name: props.toolName,
        rateOption: selectedTool,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("added Rate Option", json));
    // history.push(`/${name}`);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Compatibility
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          variant="subtitle1"
        >
          Rate tools that work well together
        </Typography>
        {loadingRateOptions ? (
          ""
        ) : (
          <Addrateoption
            toolName={props.toolName}
            rateOptions={rateOptions}
            reloadOptions={loadRateOptions}
          ></Addrateoption>
        )}

        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {loadingRateOptions
                ? "..."
                : rateOptions.map((option) => (
                    <Ratingcard
                      toolName={props.toolName}
                      option={option}
                    ></Ratingcard>
                  ))}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
