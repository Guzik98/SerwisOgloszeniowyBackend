import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { Test } from "@nestjs/testing";
import { LoginCredentialsDto } from "../dto/login-credentials.dto";
import { userStub } from "./stubs/user.stubs";
import { Response, Request } from 'express';


jest.mock('../auth.service');

describe('AuthController', () => {
  let usersController: AuthController
  let usersService: AuthService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    usersController = moduleRef.get<AuthController>(AuthController);
    usersService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  })

  describe('signIn', () => {
    describe('when signIn is called', ()  => {
      let accessToken: { accessToken: string }
      let loginCredentialsDto: LoginCredentialsDto;
      const result = null;
      beforeEach( async  () => {
        loginCredentialsDto = {
          email: userStub().email,
          password: userStub().password,
        }
      })

      test('then it should call authService', () => {
        expect(usersService.singIn).toBeCalledWith(loginCredentialsDto);
      })

      test('then is should return a accessToken', () => {
        expect(result).toEqual(null);
      })
    })
  })


})