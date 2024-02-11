import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import useStyles from '../styles';

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(null);

  const componentDidMount = async () => {
    try {
      const response = await fetch("/api/user-in-room")
      const data = await response.json();
      setRoomCode(data.code);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    componentDidMount();
    if (roomCode) {
      navigate(`/room/${roomCode}`);
    };
  }, [roomCode]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3" className={classes.heading}>
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default Home;