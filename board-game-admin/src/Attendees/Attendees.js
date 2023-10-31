import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AttendeesList from './AttendeesList';
import AddAttendeeDialog from './AddAttendeeDialog';
import {
  ColumnPage,
  PageHeader,
  PageHeaderText,
  PageHeaderTitle,
  PageHeaderSection,
  PageHeaderButton,
  PageHeaderButtonSection,
  PageHeaderSearch
} from '../layoutComponents';
import { createGetAttendeesAction, toggleAddAttendeeDialog, toggleUploadAttendeesDialog, toggleSyncTabletopEventsDialog } from './attendeesActions';
import { NonIdealState, Spinner, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import AttendeesUploadDialog from './AttendeesUploadDialog';
import SyncTabletopEventsDialog from './SyncTabletopEventsDialog';

const Attendees = ({ attendees, loading, requestAttendees, toggleAddAttendeeDialog, toggleUploadAttendeesDialog, toggleSyncTabletopEventsDialog }) => {
  const [filterText, setFilterText] = useState('');
  const onFilterTextChange = text => setFilterText(text);

  useEffect(() => {
    requestAttendees();
  }, []);
  let bodyContent;

  if (loading) {
    bodyContent = (
      <NonIdealState>
        <Spinner />
      </NonIdealState>
    );
  } else if (!attendees.length) {
    bodyContent = <NonIdealState>No attendees found.</NonIdealState>;
  } else {
    bodyContent = <AttendeesList attendees={attendees} filterText={filterText} />;
  }

  return (
    <ColumnPage>
      <AddAttendeeDialog description='Add a new attendee' />
      <AttendeesUploadDialog />
      <SyncTabletopEventsDialog />
      <PageHeader>
        <PageHeaderSection>
          <PageHeaderText>Search:</PageHeaderText>
          <PageHeaderSearch
            className='bp3-dark'
            placeholder='Name | Badge #'
            autoFocus={true}
            onChange={event => onFilterTextChange(event.target.value)}
            type='search'
          />
        </PageHeaderSection>
        <PageHeaderTitle>Attendees</PageHeaderTitle>
        <PageHeaderButtonSection>
          <PageHeaderButton
            text='Sync With TTE'
            rightIcon={IconNames.CHANGES}
            intent={Intent.PRIMARY}
            onClick={toggleSyncTabletopEventsDialog}
          />
          <PageHeaderButton
            text='Add Attendee'
            rightIcon={IconNames.ADD}
            intent={Intent.PRIMARY}
            onClick={toggleAddAttendeeDialog}
          />
        </PageHeaderButtonSection>
      </PageHeader>
      {bodyContent}
    </ColumnPage>
  );
};

const mapState = state => ({
  attendees: state.attendees.items,
  loading: state.attendees.loading
});

const mapDispatch = dispatch => ({
  requestAttendees: () => dispatch(createGetAttendeesAction()),
  toggleAddAttendeeDialog: () => dispatch(toggleAddAttendeeDialog()),
  toggleUploadAttendeesDialog: () => dispatch(toggleUploadAttendeesDialog()),
  toggleSyncTabletopEventsDialog: () => dispatch(toggleSyncTabletopEventsDialog())
});

export default connect(
  mapState,
  mapDispatch
)(Attendees);
