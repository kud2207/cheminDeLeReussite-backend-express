import jwt, { SignOptions } from 'jsonwebtoken';


//token sign
export interface SignToken<T extends string | object | Buffer> {
  payload: T;
  secret: string;
  time: string | number;
}

export const signToken = <T extends string | object | Buffer>({
  payload,
  secret,
  time,
}: SignToken<T>): string => {
  const options: SignOptions = {
    expiresIn: time as SignOptions['expiresIn'], 
  };

  return jwt.sign(payload, secret, options);
};
