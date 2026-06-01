import React from 'react';
import { Card, H1, H3 } from '@blueprintjs/core';

const formatDates = (start, end) => {
  const opts = { year: 'numeric', month: 'short', day: 'numeric' };
  const s = new Date(start).toLocaleDateString(undefined, opts);
  const e = new Date(end).toLocaleDateString(undefined, opts);
  return s === e ? s : `${s} – ${e}`;
};

// Fallback when the user has no active/upcoming convention: let them pick from
// every convention they have permission on (most recent first, per the backend).
const ConventionPicker = ({ conventions, onSelect }) => {
  if (!conventions || conventions.length === 0) {
    return (
      <main className='main-content'>
        <div className='main-content-header'>
          <H1 className='main-content-header-title'>Play and Win</H1>
        </div>
        <H3>No conventions available</H3>
        <p>
          Your account doesn’t have access to any conventions. Ask an organizer
          to add you.
        </p>
      </main>
    );
  }

  return (
    <main className='main-content'>
      <div className='main-content-header'>
        <H1 className='main-content-header-title'>Play and Win</H1>
      </div>
      <H3>Choose a convention</H3>
      <div className='convention-picker'>
        {conventions.map(c => (
          <Card
            key={`${c.organizationId}-${c.conventionId}`}
            interactive
            onClick={() => onSelect(c)}
          >
            <strong>{c.name}</strong>
            {c.annual ? ` (${c.annual})` : ''}
            <div>{formatDates(c.startDate, c.endDate)}</div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default ConventionPicker;
