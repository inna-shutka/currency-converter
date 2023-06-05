import '../../app/globals.css';
import { Converter } from './Converter';

export default {
  title: 'components/Converter',
  component: Converter,
};

const Template = (args) => <Converter {...args} />;

export const Default = Template.bind({});
