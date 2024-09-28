import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from the authorization header
  const token = req.headers.authorization; // Assuming 'Bearer <token>' format
  if (!token) {
    // Return an unauthorized exception if token is missing
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }

  try {
    // Verify the token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as any;

    // Fetch the user associated with the token payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      // Return an unauthorized exception if no user is found
      return next(
        new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
      );
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    // Catch token verification errors and return an unauthorized exception
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }
};

export default authMiddleware;
