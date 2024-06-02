import renderer from 'react-test-renderer';
import SplashScreen from '../index';

it('renders correctly', () => {
  const tree = renderer
    .create(<SplashScreen navigation={undefined} route={undefined} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
