import React from 'react';
import { Loader } from '../Loader';

export default {
    title: 'components/Loader',
    component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
