import React from 'react';
import { Intent, Tag, H5 } from '@blueprintjs/core';
import { CheckoutsListItem, datumStyles } from './checkoutsList.styles';

const getCheckoutListItem = checkout => {
  const attendee = checkout.Attendee;
  const attendeeName = attendee.Name;
  const attendeeBadgeNumber = attendee.BadgeNumber;
  const gameTitle = checkout.Copy.Game.Name;
  const copyId = checkout.Copy.ID;
  const collectionName = checkout.Copy.Collection.Name;
  const checkoutLengthDisplay = `${checkout.Length.Days}d ${checkout.Length.Hours}h ${checkout.Length.Minutes}m`;
  let intent = Intent.SUCCESS;
  if (checkout.Length.Hours >= 3) {
    intent = Intent.WARNING;
  }
  if (checkout.Length.Hours >= 5 || checkout.Length.Days > 0) {
    intent = Intent.DANGER;
  }

  return (
    <CheckoutsListItem key={checkout.ID} intent={intent} icon={null}>
      <H5>
        {gameTitle} ({copyId}) <Tag>{collectionName}</Tag>
      </H5>
      <span className={datumStyles}>{checkoutLengthDisplay}</span>&middot;&nbsp;
      <span className={datumStyles}>
        {attendeeName} ({attendeeBadgeNumber})
      </span>
    </CheckoutsListItem>
  );
};

const list = ({ items }) => {
  return <React.Fragment>{items.map(copy => getCheckoutListItem(copy))}</React.Fragment>;
};

export default list;
