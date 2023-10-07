import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

const Rating = ({ onChange, selectedValue = 0, className }) => {
  selectedValue = selectedValue == null ? 0 : selectedValue;
  if (!onChange) {
    throw Error('You must provide onChange to use the Rating component');
  }

  return (
    <div className={className}>
      <Rater onRate={rating => (rating.type === 'click' ? onChange(rating.rating) : () => {})} rating={selectedValue} />
    </div>
  );
};

export default Rating;
