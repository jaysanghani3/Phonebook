import renderer from 'react-test-renderer';
import Phonebook from '../index';

it('renders correctly', () => {
  const mockRoute = {
    params: {
      id: 'test',
      firstNameValue: 'test',
      lastNameValue: 'test',
      phoneNumberValue: 'test',
      mobileNumberValue: 'test',
      workNumberValue: 'test',
      homeNumberValue: 'test',
      imageValue: 'test',
    },
  };
  const tree = renderer
    .create(<Phonebook navigation={undefined} route={mockRoute} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
