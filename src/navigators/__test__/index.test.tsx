import renderer from 'react-test-renderer';
import AppNavigator from '../AppNavigators';

it('renders correctly', () => {
  const tree = renderer.create(<AppNavigator />).toJSON();
  expect(tree).toMatchSnapshot();
});
