import * as types from './actionTypes';

export const updatebadgeId = badgeId => ({
  type: types.UpdateBadgeId,
  badgeId
});

export const incrementStep = () => ({
  type: types.IncrementStep
});

export const decrementStep = () => ({
  type: types.DecrementStep
});

export const restart = () => ({
  type: types.Restart
});

export const enterAnotherPlay = () => ({
  type: types.EnterAnotherPlay
});
