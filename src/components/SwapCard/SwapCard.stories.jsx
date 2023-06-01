import React from 'react';
import { SwapCard } from './SwapCard';

export default {
  title: 'components/SwapCard',
  component: SwapCard,
};

const Template = (args) => <SwapCard {...args} />;

export const BTC = Template.bind({});
BTC.args = {
  variant: 'btc',
  icon: 'bitcoin',
  isBuy: false,
  loader: false,
};

export const UAH = Template.bind({});
UAH.args = {
  variant: 'uah',
  icon: 'ukrFlag',
  isBuy: true,
  loader: true,
};
