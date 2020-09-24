import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "20px",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  textfield: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  autocomplete: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

// function getSteps() {
//   return ["Select a Category", "Select Properties"];
// }

export default function Createform(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = useState([
    "Select a Category",
    "Select Properties",
    "Add Features & More",
  ]);

  const [type, setType] = useState("Tool");
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [ac, setAc] = useState("");
  //   const handleACChange = (event) => {
  //     setAc(event.target.value);
  //   };

  const [developer, setDeveloper] = useState("");
  //   const handleDeveloperChange = (event) => {
  //     setDeveloper(event.target.value);
  //   };

  const [pl, setPl] = useState("");
  //   const handlePlChange = (event) => {
  //     setPl(event.target.value);
  //   };
  const [features, setFeatures] = useState("");
  //   const handleFeatureChange = (event, value) => {
  //     console.log(value);
  //     // setFeatures(event.target.value);
  //   };
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
    if (type === "Tool") {
      setSteps([
        "Select a Category",
        "Select Properties",
        "Add Features & More",
      ]);
    } else {
      setSteps(["Select a Category", "Select Properties"]);
    }
  }, []);

  const loadData = async () => {
    const result = await fetch("/allProperties");
    const getResult = await result.json();
    setData(getResult);
    console.log(getResult);
  };

  let history = useHistory();

  const handleNext = () => {
    if (activeStep == steps.length - 1) {
      console.log(
        JSON.stringify({
          name: name,
          description: description,
          type: type,
          architecture_component: ac,
          developer: developer,
          programming_languages: pl,
          features: features,
        })
      );
      history.push("/");
      fetch("/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: description,
          type: "Tool",
          architecture_component: ac,
          developer: developer,
          programming_languages: pl,
          features: features,
          user: props.user,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getCategoryCheckboxes = () => {
    return (
      <FormControl component="fieldset">
        <Typography className={classes.instructions}>
          What do you want to create?
        </Typography>
        <RadioGroup
          aria-label="Category"
          name="Category"
          value={type}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Tool"
            control={<Radio color="primary" />}
            label="Tool"
          />
          <FormControlLabel
            value="Architecture Component"
            control={<Radio color="primary" />}
            label="Architecture Component"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  const getPropertyForm = () => {
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <Typography className={classes.instructions}>
          Give your {type} a name and a description.
        </Typography>
        <TextField
          required
          id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          className={classes.textfield}
          onChange={handleNameChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          variant="outlined"
          fullWidth
          className={classes.textfield}
          onChange={handleDescriptionChange}
        />
      </form>
    );
  };

  const getFeatureForm = () => {
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <Typography className={classes.instructions}>
          Add features, programming languages and more.
        </Typography>
        <Autocomplete
          className={classes.autocomplete}
          id="free-solo-demo"
          options={data.architecture_components.map((option) => option)}
          onChange={(event, value) => setAc(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Architecture Component"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          className={classes.autocomplete}
          id="free-solo-demo"
          freeSolo
          options={data.developers.map((option) => option)}
          onChange={(event, value) => setDeveloper(value)}
          renderInput={(params) => (
            <TextField {...params} label="Developer" variant="outlined" />
          )}
        />
        <Autocomplete
          className={classes.autocomplete}
          multiple
          id="tags-filled"
          options={data.programming_languages.map((option) => option)}
          freeSolo
          onChange={(event, value) => setPl(value)}
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
              label="Progr. Languages"
              placeholder="Select Progr. Languages..."
            />
          )}
        />
        <Autocomplete
          className={classes.autocomplete}
          multiple
          id="tags-filled"
          options={data.features.map((option) => option)}
          freeSolo
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
              placeholder="Select Features..."
            />
          )}
        />
      </form>
    );
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          <div>
            <Typography className={classes.instructions}>
              {activeStep == 0
                ? getCategoryCheckboxes()
                : activeStep == 1
                ? getPropertyForm()
                : getFeatureForm()}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
