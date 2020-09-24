import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Filterbody from "./Filterbody";
import Resultbody from "./Resultbody";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Call } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  filter: {
    textAlign: "left",
  },
  results: {
    textAlign: "left",
    marginBottom: theme.spacing(1),
  },
  sortsection: {
    textAlign: "right !important",
  },
}));

export default function Gridlayout(props) {
  const classes = useStyles();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Do the API Call when the component is fetched
  useEffect(() => {
    loadTools();
  }, [props.searchString]);

  const loadTools = async () => {
    console.log("results", props.searchString === "");
    if (props.searchString === "") {
      const result = await fetch("/allTools");
      const getResult = await result.json();
      setTools(getResult);
      setLoading(false);
    } else {
      fetch("/search", {
        method: "POST",
        body: JSON.stringify({
          searchString: props.searchString,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => setTools(json));
    }

    setLoading(false);
  };

  const handleSearch = (searchString) => {
    props.searchForKeyWord(searchString);
  };

  const handleClear = () => {
    handleSearch("");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography
          component="div"
          style={{ backgroundColor: "transparent", height: "100vh" }}
        >
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item container spacing={3} alignItems="baseline">
                <Grid item xs={4} sm={4}>
                  <Grid
                    className={classes.filter}
                    container
                    spacing={3}
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs={6} sm={6}>
                      <Typography
                        component="div"
                        style={{ backgroundColor: "transparent" }}
                        variant="h6"
                      >
                        Filter
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={4}>
                  {props.searchString === "" ? (
                    ""
                  ) : (
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      className={classes.results}
                    >
                      Result{tools.length === 1 ? "" : "s"}{" "}
                      <span style={{ fontWeight: "bold" }}>{tools.length}</span>{" "}
                      Result{tools.length === 1 ? "" : "s"} for{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {props.searchString}
                      </span>
                      {props.searchString === "" ? (
                        ""
                      ) : (
                        <Button
                          onClick={handleClear}
                          color="secondary"
                          size="small"
                        >
                          x Clear
                        </Button>
                      )}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={4} sm={4} className={classes.sortsection}>
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  ></ButtonGroup>
                </Grid>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper className={classes.paper}>
                  <Filterbody></Filterbody>
                </Paper>
              </Grid>
              <Grid item xs={9} sm={9}>
                <Resultbody
                  loading={loading}
                  tools={tools}
                  handleSearch={handleSearch}
                >
                  {" "}
                </Resultbody>
              </Grid>
            </Grid>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
