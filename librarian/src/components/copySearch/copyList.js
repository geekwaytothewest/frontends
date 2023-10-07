import React from 'react';
import moment from 'moment';
import { Callout, Intent, Tag, H4, H6 } from '@blueprintjs/core';
import { copyListStyles, listItemStyles } from './copyList.styles';

const availableStatus = 'Available';

const getCopyListItem = copy => {
  const gameTitle = copy.Game.Name;
  const copyId = copy.ID;
  const collectionName = copy.Collection.Name;
  let status = availableStatus;
  if (copy.IsCheckedOut) {
    const out = moment(copy.CurrentCheckout.TimeOut);
    const outDisplay = out.format('ddd h:mm a');
    const attendee = copy.CurrentCheckout.Attendee.Name;
    status = `Borrowed ${outDisplay} by ${attendee}`;
  }
  const intent = status === availableStatus ? Intent.SUCCESS : Intent.DANGER;

  return (
    <Callout key={copy.ID} intent={intent} className={listItemStyles}>
      <H6>
        {gameTitle} ({copyId}) <Tag>{collectionName}</Tag>
      </H6>
      {status}
    </Callout>
  );
};

const list = ({ items }) => {
  return (
    <React.Fragment>
      <H4>
        Found <em>{items.length}</em> {items.length > 1 ? 'copies' : 'copy'}
      </H4>
      <div className={copyListStyles}>{items.map(copy => getCopyListItem(copy))}</div>
    </React.Fragment>
  );
};

export default list;
