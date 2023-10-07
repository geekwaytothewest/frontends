import React from 'react';
import colorPalette from '../colorPalette';
import styled from '@emotion/styled';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const PrvFormGroup = styled.div`
  display: flex;
`;

const PrvInputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const PrvIcon = styled(Icon)`
  position: relative;
  margin-left: -1.2rem;
  padding-right: 0.25em;
`;

const PrvSelect = ({ large = false, defaultValue = undefined, onChange, labelText, children }) => {
  const selectClassName = `bp3-input${large ? ' bp3-large' : ''}`;

  return (
    <PrvFormGroup className='bp3-form-group'>
      <label className='bp3-label'>{labelText}</label>
      <PrvInputGroup>
        <select
          style={{ flex: 1 }}
          className={selectClassName}
          defaultValue={defaultValue}
          onChange={event => onChange(event)}
        >
          {children}
        </select>
        <PrvIcon icon={IconNames.CHEVRON_DOWN} />
      </PrvInputGroup>
    </PrvFormGroup>
  );
};

export const Select = styled(PrvSelect)`
  width: 100%;
`;

export const Option = styled.option`
  background-color: ${colorPalette.DARK_GRAY2};
`;
