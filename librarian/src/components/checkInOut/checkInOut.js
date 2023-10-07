import React from 'react';
import { formStyles } from './checkInOut.styles';
import CopyEntry from './copyEntry';
import AttendeeEntry from './attendeeEntry';
import OverridLimitCheckbox from './overrideLimitCheckbox';
import InOutButton from './inOutButton';
import PageBlock from '../pageBlock';
import { H3 } from '@blueprintjs/core';

const CheckInOut = () => {
  return (
    <PageBlock squat={true}>
      <H3>Check In / Out</H3>
      <form className={formStyles} onSubmit={e => e.preventDefault()}>
        <CopyEntry />
        <AttendeeEntry />
        <OverridLimitCheckbox />
        <InOutButton />
      </form>
    </PageBlock>
  );
};

export default CheckInOut;
