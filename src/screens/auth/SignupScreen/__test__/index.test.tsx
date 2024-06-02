import renderer from 'react-test-renderer';
import SignupScreen from '../index';

it('renders correctly', () => {
  const tree = renderer
    .create(<SignupScreen navigation={undefined} route={undefined} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
