import React from 'react';
import { SwapCard } from './SwapCard';

export default {
  title: 'components/SwapCard',
  component: SwapCard,
};

const Template = (args) => <SwapCard {...args} />;


export const BTC = Template.bind({});
BTC.args = {
  icon: 'BTC',
  base: 'BTC',
};

export const UAH = Template.bind({});
UAH.args = {
  icon: 'UAH',
  base: 'UAH',
};
