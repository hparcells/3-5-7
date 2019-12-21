import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import classes from './TransButton.module.scss';

function TransButton(
  {
    children,
    onClick,
    style,
    disabled
  }:
  {
    children: string,
    onClick?: () => any,
    style?: CSSProperties,
    disabled?: boolean
  }
) {
  function handleClick() {
    if(!disabled && onClick) {
      onClick();
    }
  }

  return (
    <div
      className={clsx(
        classes.root,
        disabled ? classes.disabled : null
      )}
      onClick={handleClick}
      style={style}
    >
      <p className={classes.buttonText}>
        {children}
      </p>
    </div>
  );
}

export default TransButton;
