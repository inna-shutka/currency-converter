import React from 'react';
import { Icon, ICON_TYPES } from './Icon';
import { IconGallery } from '@storybook/blocks';

export default {
  title: 'components/Icon',
  component: Icon,
  argTypes: {
    name: {
      options: Object.values(ICON_TYPES),
      control: { type: 'select' },
    },
    color: {
      control: { type: 'color' },
    },
    size: {
      control: { type: 'range', min: 10, max: 100 },
    },
  },
};

const Template = (args) => <Icon {...args} />;

export function Default() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.values(ICON_TYPES).map((icon) => (
        <div key={icon} style={{ margin: '20px' }}>
          <Icon size={24} name={icon} color='white' />
        </div>
      ))}
    </div>
  );
}
