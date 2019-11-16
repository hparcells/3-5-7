import React from 'react';

import classes from './TextField.module.scss';

function TextField(
  {
    children,
    value,
    onChange
  }:
  {
    children: string,
    value?: any,
    onChange?: () => any
  }
) {
  return (
    <input
      type='text'
      placeholder={children}
      className={classes.root}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextField;
