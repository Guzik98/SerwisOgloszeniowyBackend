import { User } from "../../schema/user.schema";

export const userStub = (): User => {
  return {
    password: 'trololoo',
    username: 'kacper',
    email: 'kacper@gmail.com',
    role: 'EMPLOYER',
  }
}
