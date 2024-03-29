import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from '../styles';
import Create from './Create';
import Music from "./Music";

const Room = () => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 1,
    guestCanPause: false,
    isHost: false,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  const { roomCode } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  const getRoomDetails = async () => {
    try {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      if (!response.ok) {
        navigate("/");
      }
      const data = await response.json();
      setRoomDetails({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
      if (roomDetails.isHost) {
        authenticateSpotify();
      }
    } catch (error) {
      console.error("Error fetching room details:", error.message);
    }
  };

  useEffect(() => {
    getRoomDetails();
    getCurrentSong();
  }, [roomCode, spotifyAuthenticated]);

  useEffect(() => {
    // componentDidMount logic
    const interval = setInterval(getCurrentSong, 1000);
    // componentWillUnmount logic
    return () => clearInterval(interval);
  }, []);


  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
        console.log(data);
      });
  };

  const authenticateSpotify = async () => {
    try {
      const response = await fetch("/spotify/is-authenticated");
      const data = await response.json();
      if (data) {
        setSpotifyAuthenticated(data.status);
        console.log(data.status);
      }
      if (!data.status) {
        const response = await fetch("/spotify/get-auth-url");
        const data = await response.json();
        if (data) {
          window.location.replace(data.url);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const leaveButtonPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/api/leave-room", requestOptions);
    if (response) {
      navigate("/");
    }
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettings = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Create update={true} votesToSkip={roomDetails.votesToSkip} guestCanPause={roomDetails.guestCanPause}
          roomCode={roomCode} updateCallback={getRoomDetails} />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
          Close Setting
        </Button>
      </Grid>
    </Grid>
  );

  const renderSettingsButton = () => (
    <Grid item xs={12} align="center">
      <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
        Room Settings
      </Button>
    </Grid>
  );

  return (
    showSettings ? (
      renderSettings()
    ) : (
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4" className={classes.heading}>
            Code &#187; {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Music {...song} />
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes &#187; {roomDetails.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause &#187; {roomDetails.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host &#187; {roomDetails.isHost.toString()}
          </Typography>
        </Grid>
        {roomDetails.isHost ? renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default Room;