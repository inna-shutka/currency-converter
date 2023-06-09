import React from 'react';
import { ICON_TYPES } from '../Icon';
import { Button } from './Button';
import '../../app/globals.css';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'subtle'],
      control: { type: "radio" },
    },
    icon: {
      options: Object.values(ICON_TYPES),
      control: { type: 'select' },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  icon: ICON_TYPES.swap,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  variant: 'primary',
  icon: ICON_TYPES.swap,
  isDisabled: true,
};

export const Subtle = Template.bind({});
Subtle.args = {
  variant: 'subtle',
  icon: ICON_TYPES.refresh,
};

export const SubtleDisabled = Template.bind({});
SubtleDisabled.args = {
  variant: 'subtle',
  icon: ICON_TYPES.refresh,
  isDisabled: true,
};
