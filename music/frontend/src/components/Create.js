import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from '../styles';
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const defaultVotes = 1;

  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handlePauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleRoomCreate = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    try {
      const response = await fetch("/api/create-room", requestOptions)
      const data = await response.json();
      console.log(data);
      navigate(`/room/${data.code}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4" className={classes.heading}>
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={handlePauseChange}>
            <FormControlLabel value="true" control={<Radio color="primary" />}
              label="Play/Pause" labelPlacement="bottom" />
            <FormControlLabel value="false" control={<Radio color="secondary" />}
              label="No Control" labelPlacement="bottom" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true} type="number" onChange={handleVotesChange} defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: "center" }, }} />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleRoomCreate}>
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back To Home
        </Button>
      </Grid>
    </Grid>
  )
}

export default Create;