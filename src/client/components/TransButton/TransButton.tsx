import React, { CSSProperties } from 'react';

import classes from './TransButton.module.scss';

function TransButton(
  {
    children,
    onClick,
    style
  }:
  {
    children: string,
    onClick?: () => any,
    style?: CSSProperties
  }
) {
  return (
    <div className={classes.root} onClick={onClick} style={style}>
      <p className={classes.buttonText}>
        {children}
      </p>
    </div>
  );
}

export default TransButton;
