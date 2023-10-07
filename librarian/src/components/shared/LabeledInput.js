import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

const processInput = (allowWhitespace, val) => (allowWhitespace ? val : val.trim());
const LabeledInput = ({
  onChange,
  label,
  value,
  inputId,
  allowWhitespace = true,
  autoComplete = 'off',
  dir = 'auto',
  labelInfo = '',
  placeholder = '',
  large = false,
  helperText = '',
  autoFocus = false,
  disabled = false
}) => (
  <FormGroup helperText={helperText} label={label} labelInfo={labelInfo}>
    <InputGroup
      id={inputId}
      disabled={disabled}
      placeholder={placeholder}
      large={large}
      value={value}
      onChange={event => onChange(processInput(allowWhitespace, event.target.value))}
      autoFocus={autoFocus}
      dir={dir}
      autoComplete={autoComplete}
    />
  </FormGroup>
);

export default LabeledInput;
