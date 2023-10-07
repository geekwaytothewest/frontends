import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Intent, H5, Button } from '@blueprintjs/core';
import UpdateAttendeeDialog from './UpdateAttendeeDialog';
import { IconNames } from '@blueprintjs/icons';
import { toggleUpdateAttendeeDialog } from './attendeesActions';
import {
  AttendeeCard,
  AttendeeCardRight,
  CardBoldText,
  BadgeNumberText,
  EditAttendeeButton,
  ListContainer
} from './attendeesStyles';
import filterListItems from '../Utilities/filterListItems';
import { PageSubheader, PageHeaderText } from '../layoutComponents';

const AttendeesList = ({ attendees, filterText = '', openUpdateAttendeeDialog }) => {
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
              <BadgeNumberText>{attendee.BadgeNumber}</BadgeNumberText>
            </AttendeeCardRight>
            <EditAttendeeButton
              icon={IconNames.EDIT}
              onClick={() => openUpdateAttendeeDialog(attendee)}
              minimal={true}
              intent={Intent.PRIMARY}
            />
          </AttendeeCard>
        ))}
        <UpdateAttendeeDialog description='Update the chosen attendee' />
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
  openUpdateAttendeeDialog: attendee => dispatch(toggleUpdateAttendeeDialog(attendee))
});

export default connect(
  null,
  mapDispatch
)(AttendeesList);
