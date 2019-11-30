import React from 'react';

import classes from './Mark.module.scss';
import clsx from 'clsx';
import { RowIndex, MarkRowIndex } from '../../../shared/types';

function Mark(
  {
    marked,
    selected,
    onClick,
    row,
    index
  }:
  {
    marked: boolean,
    selected: boolean,
    onClick: (row: RowIndex, index: MarkRowIndex) => any,
    row: RowIndex,
    index: MarkRowIndex
  }
) {
  function handleOnClick() {
    onClick(row, index);
  }

  return (
    <div
      className={clsx(
        classes.root,
        marked ? classes.marked : null,
        selected ? classes.selected : null
      )}
      onClick={handleOnClick}
    />
  );
}

export default Mark;
