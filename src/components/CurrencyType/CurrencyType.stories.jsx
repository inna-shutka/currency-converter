import React from 'react';
import { ICON_TYPES } from '../Icon';
import { CurrencyType } from './CurrencyType';

export default {
  title: 'components/CurrencyType',
  component: CurrencyType,
  argTypes: {
    icon: {
      options: Object.values(ICON_TYPES),
      control: { type: 'select' },
    },
  },
};

const Template = (args) => <CurrencyType {...args} />;

export const BTC = Template.bind({});
BTC.args = {
  variant: 'btc',
  icon: ICON_TYPES.bitcoin,
  content: 'BTC',
};

export const UAH = Template.bind({});
UAH.args = {
  variant: 'uah',
  icon: ICON_TYPES.ukrFlag,
  content: 'UAH',
};
