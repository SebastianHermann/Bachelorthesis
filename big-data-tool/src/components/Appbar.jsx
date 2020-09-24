import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Popover from "@material-ui/core/Popover";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const classes = useStyles();

  const [searchString, setSearchString] = useState("");

  let history = useHistory();

  const handleClick = (event) => {
    history.push("/create");
  };

  const handleSeachKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      setSearchString("");
    }
  };

  const onSearchTextChange = (event) => {
    setSearchString(event.target.value);
    console.log("searchtext: ", event.target.value);
  };

  const handleSearch = () => {
    props.searchForKeyWord(searchString);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <ExploreIcon />
              </IconButton>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon onClick={handleSearch} />
              </div>
              <InputBase
                value={searchString}
                placeholder="Search…"
                onChange={onSearchTextChange}
                onKeyPress={handleSeachKeyPress}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Button
              variant="outlined"
              color="info"
              className={classes.button}
              startIcon={<AddIcon />}
              style={{
                marginLeft: "20px",
                borderColor: "white",
                color: "white",
              }}
              onClick={handleClick}
            >
              Create
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
