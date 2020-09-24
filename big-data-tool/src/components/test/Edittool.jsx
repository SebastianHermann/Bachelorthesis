import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import LanguageIcon from "@material-ui/icons/Language";
import Chip from "@material-ui/core/Chip";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

// const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "left",
    backgroundColor: "transparent",
  },
  header: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  paper: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textField: {
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    textAlign: "left",
    width: "100%",
  },
  button: {
    margin: theme.spacing(2),
    width: "90%",
  },
}));

export default function Edittool({ match, user }) {
  console.log("in edit tool: ", match, user);
  const classes = useStyles();
  const [state, setState] = useState({
    // name: "",
    // // admins: [],
    // // isAdmin: true,
    // categories: [""],
    // description: "",
    // developer: "",
    // website: "",
    // features: [],
    horizontalScalability: false,
    multiStructuredData: false,
    lowLatencyProcessing: false,
    realTimeProcessing: false,
  });

  // Fill out the values if in edit mode

  const [tool, setTool] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    horizontalScalability,
    multiStructuredData,
    lowLatencyProcessing,
    realTimeProcessing,
  } = state;

  const [userMail, setUserMail] = useState("");
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [developer, setDeveloper] = useState("");
  const handleDeveloperChange = (event) => {
    setDeveloper(event.target.value);
  };

  const [website, setWebsite] = useState("");
  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [featureOptions, setFeatureOptions] = useState([]);

  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Check if the component is in "edit mode" or "create mode" (The "match" attribute is only defined when coming from edit mode)
    loadCategories();
    loadFeatures();
    if (typeof match !== "undefined") {
      loadTool();
      console.log("in edit use effect");
    } else {
      setLoading(false);
    }
  }, []);

  const loadTool = async () => {
    const result = await fetch("/toolInformation", {
      method: "POST",
      body: JSON.stringify({
        user: user,
        name: match.params.name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const getResult = await result.json();
    setState(getResult);
    setUserMail(user);
    setName(getResult.name);
    setDescription(getResult.description);
    setDeveloper(getResult.developer);
    setWebsite(getResult.website);
    setCategories(getResult.categories);
    setFeatures(getResult.features);
    setLoading(false);
  };

  const handleChange = (event) => {
    console.log({ ...state, [event.target.name]: event.target.checked });
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  let history = useHistory();

  const loadCategories = async () => {
    const result = await fetch("/allCategories");
    const getResult = await result.json();
    setCategoryOptions(getResult.categories);
    console.log("in loadCategories ", getResult.categories);
  };

  const loadFeatures = async () => {
    const result = await fetch("/allFeatures");
    const getResult = await result.json();
    setFeatureOptions(getResult.features);
  };

  const handleSave = () => {
    if (typeof match !== "undefined") {
      fetch("/edita", {
        method: "POST",
        body: JSON.stringify({
          userMail: user,
          oldToolName: state.name,
          toolName: name,
          description: description,
          developer: developer,
          website: website,
          categories: categories,
          features: features,
          horizontalScalability: horizontalScalability,
          multiStructuredData: multiStructuredData,
          lowLatencyProcessing: lowLatencyProcessing,
          realTimeProcessing: realTimeProcessing,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      history.push(`/${name}`);
    } else {
      fetch("/createa", {
        method: "POST",
        body: JSON.stringify({
          userMail: "sh267@hdm-stuttgart.de",
          toolName: name,
          description: description,
          developer: developer,
          website: website,
          categories: categories,
          features: features,
          horizontalScalability: horizontalScalability,
          multiStructuredData: multiStructuredData,
          lowLatencyProcessing: lowLatencyProcessing,
          realTimeProcessing: realTimeProcessing,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      history.push(`/${name}`);
    }
  };

  const handleCancel = () => {
    typeof match === "undefined" ? history.push("/") : history.push(`/${name}`);
  };

  return (
    <div className={classes.root}>
      {loading ? (
        "Loading..."
      ) : (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.header} variant="h5">
                {typeof match !== "undefined" ? "Edit Tool" : "Create Tool"}
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <TextField
                  label="Name"
                  id="outlined-margin-none"
                  placeholder="Name"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  variant="outlined"
                  onChange={handleNameChange}
                  defaultValue={name}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  placeholder="Description"
                  multiline
                  fullWidth
                  rows={3}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  variant="outlined"
                  onChange={handleDescriptionChange}
                  defaultValue={description}
                />
                <TextField
                  label="Developer"
                  id="outlined-margin-none"
                  placeholder="Developer"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  variant="outlined"
                  onChange={handleDeveloperChange}
                  defaultValue={developer}
                />
                <TextField
                  label="Official Website"
                  id="outlined-margin-none"
                  placeholder="www.example.com"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  variant="outlined"
                  onChange={handleWebsiteChange}
                  defaultValue={website}
                />

                <Autocomplete
                  className={classes.textField}
                  multiple
                  id="tags-outlined"
                  options={categoryOptions.map((option) => option)}
                  defaultValue={categories}
                  onChange={(event, value) => setCategories(value)}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <React.Fragment>
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                        {option.text}
                      </React.Fragment>
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Categories"
                    />
                  )}
                />
                <Autocomplete
                  className={classes.textField}
                  multiple
                  id="tags-outlined"
                  options={featureOptions.map((option) => option)}
                  freeSolo
                  defaultValue={features}
                  onChange={(event, value) => setFeatures(value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Features"
                    />
                  )}
                />
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Supports</FormLabel>
                  <Grid container item xs={12}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={horizontalScalability}
                            onChange={handleChange}
                            name="horizontalScalability"
                          />
                        }
                        label="Horizontal Scalability"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={multiStructuredData}
                            onChange={handleChange}
                            name="multiStructuredData"
                          />
                        }
                        label="Multi-Structured Data"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={realTimeProcessing}
                            onChange={handleChange}
                            name="realTimeProcessing"
                          />
                        }
                        label="Real-Time Processing"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={lowLatencyProcessing}
                            onChange={handleChange}
                            name="lowLatencyProcessing"
                          />
                        }
                        label="Low-Latency Processing"
                      />
                    </Grid>
                  </Grid>
                </FormControl>

                <Grid container item xs={12}>
                  <Grid item xs={6}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={handleCancel}
                      className={classes.button}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
