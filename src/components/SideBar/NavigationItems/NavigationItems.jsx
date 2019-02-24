import React from 'react';

import NavigationItem from './NavigationItem';

const NavigationItems = ({ items }) => (
  items.map(item => <NavigationItem {...item} />)
);

export default NavigationItems;
