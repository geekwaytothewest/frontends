export default (items, filterText = '', filterProps = []) => {
  if (!items) {
    return [];
  }
  const matches = itemText => itemText.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
  const filter = item => {
    if (!filterText) return items;
    if (!filterProps.length) return matches(item);

    return filterProps.find(p => matches(item[p]));
  };

  return items.filter(i => filter(i));
};
