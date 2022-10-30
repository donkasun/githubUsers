'use strict';

import renderer from 'react-test-renderer';
import Avatar from '../app/components/avatar';

it('renders correctly', () => {
  const tree = renderer.create(<Avatar />).toJSON();
  expect(tree).toMatchSnapshot();
});
