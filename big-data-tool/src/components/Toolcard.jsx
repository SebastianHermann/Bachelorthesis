import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Href from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minWidth: 275,
    textDecoration: "none",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  category: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: "12px",
  },
  feature: {
    fontSize: "12px",
    backgroundColor: "#e3e3e3",
    borderRadius: "5px",
    marginRight: "5px",
    marginBottom: "5px",
    padding: "5px 10px",
    cursor: "Pointer",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
});

export default function Toolcard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  let history = useHistory();

  const handleLinkage = (category) => {
    props.handleSearch(category);
  };

  const handleClick = (event) => {
    console.log("the selected tool is: ", props.data);
    history.push("/tool");
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ textDecoration: "none" }}>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid container xs={3} direction="column">
            <Grid item>
              <Typography variant="h5" component="h2">
                {props.tool.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {props.tool.developer}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={9}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              {props.tool.categories.map((category) => {
                return (
                  <Href
                    component="button"
                    variant="body2"
                    onClick={() => {
                      handleLinkage(category);
                    }}
                  >
                    {bull}
                    {category}
                  </Href>
                );
              })}
            </Grid>
            <Grid item>
              <Typography
                color="textSecondary"
                variant="body2"
                style={{ textAlign: "left" }}
              >
                {props.tool.description}
                <br />
                <br />
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Features
              </Typography>
            </Grid>
            <Grid container direction="row" justify="flex-start">
              {props.tool.features.map((feature) => {
                return (
                  <Grid
                    onClick={() => {
                      handleLinkage(feature);
                    }}
                    key={feature}
                    item
                    className={classes.feature}
                  >
                    {feature}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
      >
        <div>
          <Link
            to={`/${props.tool.name}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button size="small">Details</Button>{" "}
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}
