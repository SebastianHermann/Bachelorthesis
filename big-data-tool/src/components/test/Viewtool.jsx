import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Toolcard from "../Toolcard";
import Relatedsection from "./Relatedsection";
import Typography from "@material-ui/core/Typography";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Tooloverview from "./Tooloverview";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

export default function Viewtool({ match, user }) {
  const classes = useStyles();
  const [tool, setTool] = useState([]);
  const [tools, setTools] = useState([]);
  const [comparedToolName, setComparedToolName] = useState(match.params.name);
  const [isRatingMode, setIsRatingMode] = useState(true);
  const [loading, setLoading] = useState(true);

  let history = useHistory();

  const handleClick = (event) => {
    history.push("/");
  };

  const handleSwitch = () => {
    if (isRatingMode === true) {
      loadToolsForComparison();
    }
    setIsRatingMode(!isRatingMode);
  };

  useEffect(() => {
    console.log("match type in use effect of Viewtool: ", match.params.name);
  }, []);

  const loadToolsForComparison = async () => {
    const result = await fetch("/allTools");
    const getResult = await result.json();
    setTools(getResult);
    console.log("in loadTools for comparison ", getResult);
  };

  const handleToolSelection = (event, value) => {
    console.log("value in handle tool selection", value.name);
    setComparedToolName(value.name);
    // setLoading(true);
    // loadTool(value.name);
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Link to={`/`} style={{ textDecoration: "none" }}>
              <Paper className={classes.paper}>
                <Typography variant="h6" component="h4">
                  <ArrowRightAltIcon
                    style={{
                      transform: "rotate(180deg)",
                      verticalAlign: "middle",
                      paddingTop: "3px",
                    }}
                  >
                    {" "}
                  </ArrowRightAltIcon>
                  Back to Overview
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid container item xs={6}>
            <Grid item xs={4}>
              <Button style={{ marginTop: 16 }} onClick={handleSwitch}>
                Switch to {isRatingMode ? " Comparison" : "Rate"}
              </Button>
            </Grid>
            <Grid item xs={8}>
              {isRatingMode ? (
                " "
              ) : (
                <Autocomplete
                  size="small"
                  id="disabled-options-demo"
                  disableClearable
                  options={tools}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300, marginTop: 16 }}
                  onChange={(event, value) => handleToolSelection(event, value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Compare To"
                      variant="outlined"
                    />
                  )}
                />
              )}
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Tooloverview
              user={user}
              toolName={match.params.name}
            ></Tooloverview>
          </Grid>

          <Grid item xs={6}>
            {isRatingMode ? (
              <Relatedsection
                user={user}
                toolName={match.params.name}
              ></Relatedsection>
            ) : (
              <Tooloverview
                user={user}
                toolName={comparedToolName}
              ></Tooloverview>
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
