import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  appBarRoot: {
    flexGrow: 1
  },
  content: {
    maxWidth: '850px',
    margin: 'auto',
    padding: '1em'
  },
  expanstionPanelRoot: {
    width: '100%'
  },
  expansionPanelHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  paperRoot: {
    padding: theme.spacing(3, 2)
  }
}));

function Menu({ setMode }) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [goingToJoinRoom, setGoingToJoinRoom] = useState(true);

  function handlePlayLocalClick() {
    setMode('local');
  }
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handleRoomCodeChange(event) {
    setRoomCode(event.target.value);
  }
  function toggleGoingToCreateRoom() {
    setGoingToJoinRoom(!goingToJoinRoom);
  }

  return (
    <>
      <div className={classes.appBarRoot}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              3-5-7
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className={classes.content}>
        <Typography variant='h3'>3-5-7</Typography>
        <Typography variant='subtitle1' gutterBottom>A 15 line game turn based game about turning marks red, the person to turn the last mark red loses.</Typography>

        <div className={classes.expanstionPanelRoot}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.expansionPanelHeading}>Rules</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ol>
                <li><Typography>You may turn as many marks as you want red, but they have to be in the same row.</Typography></li>
                <li><Typography>You must turn at least one mark red each turn.</Typography></li>
                <li><Typography>You may not turn marks back green.</Typography></li>
                <li><Typography>Your turn ends when you are done making marks red.</Typography></li>
                <li><Typography>You win the game when your opponent turns the last mark red.</Typography></li>
              </ol>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <Grid container spacing={3} style={{ marginTop: '10px' }}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paperRoot}>
              <Typography variant='h5'>Play Locally</Typography>
              <Typography gutterBottom>Play with someone in the same room as you!</Typography>

              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handlePlayLocalClick}
                fullWidth
              >
                Go!
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paperRoot}>
              <Typography variant='h5'>Play Online</Typography>
              <Typography gutterBottom>Play with someone around the world!</Typography>

              <TextField
                label='Username'
                value={username}
                onChange={handleUsernameChange}
                margin='normal'
                variant='outlined'
                fullWidth
              />
              <Collapse in={goingToJoinRoom} style={{
                transform: 'translateY(-7px)'
              }}>
                <TextField
                  label='Room Code'
                  value={roomCode}
                  onChange={handleRoomCodeChange}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
              </Collapse>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handlePlayLocalClick}
                fullWidth
              >
                Go!
              </Button>
              <Button
                variant='outlined'
                color='primary'
                className={classes.button}
                onClick={toggleGoingToCreateRoom}
                style={{
                  marginTop: '10px'
                }}
              >
                {
                  goingToJoinRoom
                    ? 'Create a Room Instead'
                    : 'Join a Room Instead'
                }
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default hot(Menu);
