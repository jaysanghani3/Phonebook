import renderer from 'react-test-renderer';
import Homescreen from '../index';

it('renders correctly', () => {
  const tree = renderer
    .create(<Homescreen navigation={undefined} route={undefined} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
