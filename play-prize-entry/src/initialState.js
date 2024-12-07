export default () => ({
  step: 1,
  user: { badgeId: '', name: '' },
  checkoutsList: { checkouts: [], error: null, loading: false },
  playerSearch: { query: '', loading: false, results: [], error: false },
  play: { checkoutId: null, game: '', maxPlayers: 0, players: [] }
});
