import renderer from 'react-test-renderer';
import LoginScreen from '../index';

it('renders correctly', () => {
  const tree = renderer
    .create(<LoginScreen navigation={undefined} route={undefined} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
