import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Href from "@material-ui/core/Link";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    textAlign: "left",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  bullet: {
    display: "inline-block",
    margin: "0 10px",
    transform: "scale(0.8)",
  },
  editIcon: {
    cursor: "pointer",
  },
}));

export default function Tooloverview(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleEdit = () => {};

  // const [tools, setTools] = useState([]);
  const [toolName, setToolName] = useState(props.toolName);
  const [loading, setLoading] = useState(true);
  const [tool, setTool] = useState();

  // Set the mode either "View Mode" or "Compare Mode". If this component is beeing used for comparison to another tool, the Compare Mode gets active
  const [mode, setMode] = useState("View Mode");

  useEffect(() => {
    console.log("match type in use effect: ", toolName);
    loadTool(props.toolName);
  }, [props.toolName]);

  const loadTool = async (toolName) => {
    console.log("in loadTool from comparison", props.toolName);
    const result = await fetch("/toolInformation", {
      method: "POST",
      body: JSON.stringify({
        user: props.user,
        name: toolName,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const getResult = await result.json();
    setTool(getResult);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {loading === true ? <div>Loading...</div> : tool.developer}
              </Typography>
              <Typography gutterBottom variant="h4">
                {loading === true ? <div>Loading...</div> : tool.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                {loading === true ? (
                  <div>Loading...</div>
                ) : (
                  <IconButton
                    aria-label="delete"
                    disabled={!tool.isAdmin}
                    color="primary"
                  >
                    <Link
                      to={`/edit/${tool.name}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <EditIcon />
                    </Link>
                  </IconButton>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary" variant="body2">
            {loading === true ? <div>Loading...</div> : tool.description}
          </Typography>
          <Href
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            {loading === true ? <div>Loading...</div> : tool.website}
          </Href>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1">
            Categories
          </Typography>
          <div>
            {loading === true ? (
              <div>Loading...</div>
            ) : (
              tool.categories.map((category) => {
                return (
                  <Href
                    component="button"
                    variant="body2"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                  >
                    {bull}
                    {category}
                  </Href>
                );
              })
            )}
          </div>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1">
            Features
          </Typography>
          <div>
            {loading === true ? (
              <div>Loading...</div>
            ) : (
              tool.features.map((feature) => {
                return <Chip className={classes.chip} label={feature} />;
              })
            )}
          </div>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1">
            Supports
          </Typography>
          <div>
            <Typography
              style={
                loading === true
                  ? {}
                  : tool.horizontalScalability === true
                  ? { color: "#4caf50" }
                  : { color: "#e3e3e3" }
              }
            >
              <CheckCircleIcon
                style={{ verticalAlign: "bottom" }}
              ></CheckCircleIcon>{" "}
              Horizontal Scalability
            </Typography>
            <Typography
              style={
                loading === true
                  ? {}
                  : tool.lowLatencyProcessing === true
                  ? { color: "#4caf50" }
                  : { color: "#e3e3e3" }
              }
            >
              <CheckCircleIcon
                style={{ verticalAlign: "bottom" }}
              ></CheckCircleIcon>{" "}
              Low Latency Processing
            </Typography>
            <Typography
              style={
                loading === true
                  ? {}
                  : tool.realTimeProcessing === true
                  ? { color: "#4caf50" }
                  : { color: "#e3e3e3" }
              }
            >
              <CheckCircleIcon
                style={{ verticalAlign: "bottom" }}
              ></CheckCircleIcon>{" "}
              Real Time Processing
            </Typography>
            <Typography
              style={
                loading === true
                  ? {}
                  : tool.multiStructuredData === true
                  ? { color: "#4caf50" }
                  : { color: "#e3e3e3" }
              }
            >
              <CheckCircleIcon
                style={{ verticalAlign: "bottom" }}
              ></CheckCircleIcon>{" "}
              Multi Structured Data
            </Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
