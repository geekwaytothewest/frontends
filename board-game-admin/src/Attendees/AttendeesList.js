import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Intent, H5, Button, Tooltip } from '@blueprintjs/core';
import UpdateAttendeeDialog from './UpdateAttendeeDialog';
import ReplacementBadgeDialog from './ReplacementBadgeDialog';
import TransferBadgeDialog from './TransferBadgeDialog';
import { IconNames } from '@blueprintjs/icons';
import { toggleUpdateAttendeeDialog, toggleBadgeReplacementDialog, toggleBadgeTransferDialog } from './attendeesActions';
import {
  AttendeeCard,
  AttendeeCardRight,
  CardBoldText,
  BadgeNumberText,
  EditAttendeeButton,
  ListContainer,
  CardText,
  LostBadgeButton,
  TransferBadgeButton,
  AttendeeButtons
} from './attendeesStyles';
import filterListItems from '../Utilities/filterListItems';
import { PageSubheader, PageHeaderText } from '../layoutComponents';

const AttendeesList = ({ attendees, filterText = '', openUpdateAttendeeDialog, openReplaceBadgeDialog, openTransferBadgeDialog }) => {
  const [displayCap, setDisplayCap] = useState(50);
  const filteredAttendees = filterListItems(attendees, filterText, ['BadgeNumber', 'Name']).slice(0, displayCap);
  const incrementDisplayCap = () => setDisplayCap(displayCap + 25);

  return (
    <>
      <PageSubheader>
        <PageHeaderText>{`Displaying ${filteredAttendees.length} of ${attendees.length} attendees`}</PageHeaderText>
      </PageSubheader>
      <ListContainer>
        {filteredAttendees.map(attendee => (
          <AttendeeCard key={attendee.BadgeNumber} css={AttendeeCard}>
            <Icon icon='mugshot' iconSize={52} style={{ flex: 1 }} />
            <AttendeeCardRight>
              <CardBoldText>{attendee.Name}</CardBoldText>
              <CardText>{attendee.Pronouns}</CardText>
              <BadgeNumberText>{attendee.BadgeNumber}</BadgeNumberText>
            </AttendeeCardRight>
            <AttendeeButtons>
              <Tooltip content='Replace lost badge' position='top'>
                <LostBadgeButton
                  icon={IconNames.UNLINK}
                  onClick={() => openReplaceBadgeDialog(attendee)}
                  minimal={true}
                  intent={Intent.DANGER}
                />
              </Tooltip>
              <Tooltip content='Transfer badge' position='top'>
                <TransferBadgeButton
                  icon={IconNames.EXCHANGE}
                  onClick ={() => openTransferBadgeDialog(attendee)}
                  minimal={true}
                  intent={Intent.DANGER}
                />
              </Tooltip>
              <Tooltip content='Edit attendee details' position='top'>
                <EditAttendeeButton
                  icon={IconNames.EDIT}
                  onClick={() => openUpdateAttendeeDialog(attendee)}
                  minimal={true}
                  intent={Intent.PRIMARY}
                />
              </Tooltip>
            </AttendeeButtons>
          </AttendeeCard>
        ))}
        <UpdateAttendeeDialog description='Update the chosen attendee' />
        <ReplacementBadgeDialog />
        <TransferBadgeDialog />
      </ListContainer>
      <Button
        text='Load More'
        intent={Intent.PRIMARY}
        onClick={incrementDisplayCap}
        disabled={displayCap >= attendees.length}
      />
    </>
  );
};

const mapDispatch = dispatch => ({
  openUpdateAttendeeDialog: attendee => dispatch(toggleUpdateAttendeeDialog(attendee)),
  openReplaceBadgeDialog: attendee => dispatch(toggleBadgeReplacementDialog(attendee)),
  openTransferBadgeDialog: attendee => dispatch(toggleBadgeTransferDialog(attendee))
});

export default connect(
  null,
  mapDispatch
)(AttendeesList);
