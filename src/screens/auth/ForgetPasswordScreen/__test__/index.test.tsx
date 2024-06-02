import renderer from 'react-test-renderer';
import ForgetPasswordScreen from '../index';

it('renders correctly', () => {
  const tree = renderer
    .create(<ForgetPasswordScreen navigation={undefined} route={undefined} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
