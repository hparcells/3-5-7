import React from 'react';
import { connect } from 'react-redux';
import { Store } from '../../../store';

import Button from '../../Button/Button';

import classes from './Welcome.module.scss';

function Welcome(
  {
    online
  }:
  {
    online: number
  }
) {
  function handleLocalClick() {}
  function handleOnlineClick() {}

  return (
    <div className={classes.root}>
      <p className={classes.title}>3-5-7</p>
      <p className={classes.online}>Players Online: {online || 'Fetching...'}</p>

      <div className={classes.restOfPage}>
        <div className={classes.buttonWrapper}>
          <Button onClick={handleLocalClick}>Play Locally</Button>
          <Button onClick={handleOnlineClick}>Play Online</Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  online: state.menu.online
});

export default connect(mapStateToProps, {})(Welcome);
