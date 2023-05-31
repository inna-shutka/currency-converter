import React from 'react';
import { Icon, ICON_TYPES } from './Icon';

export default {
  title: 'components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select', options: ICON_TYPES },
    },
    color: {
      control: { type: 'color' },
    },
    size: {
      control: { type: 'range', min: 10, max: 100 },
    },
  },
};

// function Template(args) {
//   return <Icon {...args} />;
// }

// export const Single = (args) => <Template {...args} />;
// Single.args = {
//   name: ICON_TYPES.refresh,
//   color: '#000000',
//   size: 24,
// };

export const Multiple = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {Object.values(ICON_TYPES).map((icon) => (
      <div key={icon} style={{ margin: '10px' }}>
        <Icon size={48} name={icon} />
      </div>
    ))}
  </div>
);
