import { Request, Response } from 'express';

const ProtectedRouteAuth = (request: Request, response: Response, next: any) => {
  next();
}

export default ProtectedRouteAuth;