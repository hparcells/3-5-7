import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Store } from '../../store';

import { RowIndex, MarkRowIndex } from '../../../shared/types';

import classes from './Mark.module.scss';

function Mark(
  {
    marked,
    selected,
    onClick,
    row,
    index,
    selectable,
    activeRow
  }:
  {
    marked: boolean,
    selected: boolean,
    onClick: (row: RowIndex, index: MarkRowIndex) => any,
    row: RowIndex,
    index: MarkRowIndex,
    selectable: boolean,
    activeRow: RowIndex
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
        selected ? classes.selected : null,
        selectable ? null : classes.unselectable,
        activeRow === row && marked ? classes.unselectable : null
      )}
      onClick={handleOnClick}
    />
  );
}

const mapStateToProps = (state: Store) => ({
  activeRow: state.game.gameData.activeRow
});

export default connect(mapStateToProps, {})(Mark);
