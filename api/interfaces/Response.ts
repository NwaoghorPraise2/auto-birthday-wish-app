import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface ResponseType {
  status: string;
  message: string;
  accessToken?: string;
  data?: any;
}

export interface IAuthResponse extends Response {
  user?: string
  body: ResponseType;
}

export interface decodedToken extends JwtPayload {
    id: string;
}

