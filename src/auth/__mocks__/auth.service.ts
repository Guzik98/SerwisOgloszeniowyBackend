import { userStub } from '../tests/stubs/user.stubs';

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockReturnValue(userStub()),
  signIn: jest.fn().mockReturnValue(null),
  checkUser: jest.fn().mockReturnValue(null),
})
