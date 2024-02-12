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
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";

const Create = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  const handleUpdatePressed = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode,
      }),
    };

    try {
      const response = await fetch("/api/update-room", requestOptions);
      if (response.ok) {
        setSuccessMsg("Room updated successfully!");
      }
    } catch (error) {
      setErrorMsg("Error updating room!");
      console.log(error.message);
    } finally {
      props.updateCallback();
    }
  };

  const renderCreateButtons = () => (
    <Grid container spacing={2}>
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
  );

  const renderUpdateButtons = () => (
    <Grid item xs={12} align="center">
      <Button color="primary" variant="contained" onClick={handleUpdatePressed}>
        Update Room
      </Button>
    </Grid>
  );

  const title = props.update ? "Update Room" : "Create A Room";

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} align="center" className={classes.alert}>
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {successMsg !== "" ? (
            <Alert severity="success" onClose={() => { setSuccessMsg("") }}>
              {successMsg}
            </Alert>
          ) : (
            <Alert severity="error" onClose={() => { setErrorMsg("") }}>
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4" className={classes.heading}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue={guestCanPause.toString()} onChange={handlePauseChange}>
            <FormControlLabel value="true" control={<Radio color="primary" />}
              label="Play/Pause" labelPlacement="bottom" />
            <FormControlLabel value="false" control={<Radio color="secondary" />}
              label="No Control" labelPlacement="bottom" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true} type="number" onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" }, }} />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  )
}

Create.defaultProps = {
  votesToSkip: 1,
  guestCanPause: true,
  update: false,
  roomCode: null,
  updateCallback: () => { },
};

export default Create;