'use strict';

import renderer from 'react-test-renderer';
import ProfileCard from '../app/components/profileCard';

it('renders correctly', () => {
  const tree = renderer.create(<ProfileCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
