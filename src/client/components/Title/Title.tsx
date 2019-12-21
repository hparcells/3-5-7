import React, { CSSProperties } from 'react';

import classes from './Title.module.scss';

function Title(
  {
    style
  }:
  {
    style?: CSSProperties
  }
) {
  return (
    <p className={classes.title} style={style}>3-5-7</p>
  );
}

export default Title;
