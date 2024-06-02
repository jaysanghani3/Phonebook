import {jest} from '@jest/globals';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
    isInternetReachable: true,
  }),
}));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('@react-native-firebase/firestore', () => {
  const firestoreMock = jest.fn(() => ({
    settings: jest.fn(),
    CACHE_SIZE_UNLIMITED: -1,
  }));

  return {
    __esModule: true,
    default: firestoreMock,
  };
});
jest.mock('react-native-section-alphabet-list', () => ({
  AlphabetList: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.useFakeTimers();
jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));
