import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function AddRateOption(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tools, setTools] = useState([]);
  const [rateOptions, setRateOptions] = useState();
  const [deactivatedRateOptions, setDeactivatedRateOptions] = useState();
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedTool, setSelectedTool] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const loadTools = async () => {
    const result = await fetch("/allTools");
    const getResult = await result.json();
    setTools(getResult);
    setLoading(false);
  };

  const createRateOption = async () => {
    fetch("/createRateOption", {
      method: "POST",
      body: JSON.stringify({
        toolName: props.toolName,
        toolName2: selectedTool.name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => props.reloadOptions());
  };

  const deactivateOptions = () =>
    props.rateOptions.map((option) => option.name);

  useEffect(() => {
    loadTools();
    deactivateOptions();
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
    console.log("value of clicked   ", selectedTool.name);
    createRateOption();
    handleClose();
  };

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Add Tool
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <Autocomplete
            id="disabled-options-demo"
            disableClearable
            options={tools}
            getOptionDisabled={(option) =>
              deactivateOptions().includes(option.name) ||
              option.name === props.toolName
            }
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={(event, value) => handleToolSelection(event, value)}
            renderInput={(params) => (
              <TextField {...params} label="Tool" variant="outlined" />
            )}
          />
          <Button
            variant="contained"
            disabled={isEmpty}
            size="small"
            color="primary"
            onClick={handleAddClick}
          >
            Add +
          </Button>
        </Typography>
      </Popover>
    </div>
  );
}
