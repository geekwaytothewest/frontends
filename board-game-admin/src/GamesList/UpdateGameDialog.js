import React, { useState } from 'react';
import { connect } from 'react-redux';
import LabeledInput from '../SharedComponents/LabeledInput';
import SaveDialog from '../SharedComponents/SaveDialog';
import { toggleUpdateGameDialog, createUpdateGameAction } from './gamesActions';

const UpdateGameDialog = ({ saving, saveGame, isOpen, toggleDialog, selectedGame }) => {
  const [name, setName] = useState('');
  const setFields = (name = '') => {
    setName(name);
  };

  return (
    <SaveDialog
      helperText='Update a game'
      headerText='Update Game'
      saving={saving}
      disabled={saving}
      save={() => {
        saveGame(selectedGame, name);
        toggleDialog();
      }}
      isOpen={isOpen}
      onOpening={() => setFields(selectedGame.name)}
      close={toggleDialog}
      onClosed={setFields}
    >
      <LabeledInput label='Name' value={name} onChange={setName} />
    </SaveDialog>
  );
};

const mapState = state => ({
  selectedGame: state.games.selectedGame,
  isOpen: state.games.updateGameDialogOpen,
  saving: state.games.savingGame
});
const mapDispatch = dispatch => ({
  saveGame: (selectedGame, name) => dispatch(createUpdateGameAction(selectedGame.id, name)),
  toggleDialog: () => dispatch(toggleUpdateGameDialog())
});

export default connect(
  mapState,
  mapDispatch
)(UpdateGameDialog);
