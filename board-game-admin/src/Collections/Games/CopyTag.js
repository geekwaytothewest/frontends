import React from 'react';
import { connect } from 'react-redux';
import { Tag } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import UpdateCopyDialog from './UpdateCopyDialog';
import styled from '@emotion/styled';
import { createUpdateCopyAction, toggleUpdateCopyDialog } from '../collectionsActions';

const StyledTag = styled(Tag)`
  margin-bottom: 0.25em;
  display: flex;
`;

const CopyTag = ({ copy, toggleDialog, saveUpdate }) => {
  const rightIcon = copy.Winnable ? IconNames.BOX : undefined;

  return (
    <>
      <StyledTag icon={IconNames.EDIT} rightIcon={rightIcon} interactive={true} onClick={() => toggleDialog(copy)}>
        {copy.ID}
      </StyledTag>
      <UpdateCopyDialog saveUpdate={saveUpdate} close={toggleDialog} />
    </>
  );
};

const mapDispatch = dispatch => ({
  saveUpdate: (title, id) => dispatch(createUpdateCopyAction(title, id)),
  toggleDialog: copy => dispatch(toggleUpdateCopyDialog(copy))
});

export default connect(
  null,
  mapDispatch
)(CopyTag);
