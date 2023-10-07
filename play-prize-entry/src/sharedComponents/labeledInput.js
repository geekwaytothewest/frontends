import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

const LabeledInput = ({
  onChange,
  label,
  value,
  autoComplete = 'off',
  labelInfo = '',
  placeholder = '',
  large = false,
  helperText = '',
  autoFocus = false,
  disabled = false
}) => (
  <FormGroup helperText={helperText} label={label} labelInfo={labelInfo}>
    <InputGroup
      disabled={disabled}
      placeholder={placeholder}
      large={large}
      value={value}
      onChange={event => onChange(event.target.value)}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
    />
  </FormGroup>
);

export default LabeledInput;
