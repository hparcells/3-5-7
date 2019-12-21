import React from 'react';

import classes from './TextField.module.scss';

function TextField(
  {
    children,
    value,
    onChange,
    onBlur
  }:
  {
    children: string,
    value?: any,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any,
    onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void)
  }
) {
  return (
    <input
      type='text'
      placeholder={children}
      className={classes.root}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default TextField;
