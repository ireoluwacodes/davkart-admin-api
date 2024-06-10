import { JsonWebTokenError } from "jsonwebtoken";
import { ForbiddenRequestError, UnauthorizedRequestError } from "../errors";
import { verifyToken } from "../utils";

export const authMiddleware = (async (req, res, next) => {
  try {
    const [scheme, token] = req.headers.authorization.split(" ");
    if (scheme == "Bearer") {
      if (!token || token == "") {
        throw new UnauthorizedRequestError(
          "Invalid token, pass token as a Bearer in authorization headers"
        );
      } else {
        try {
          let id = await verifyToken(token);
          req.userId = id;
          next();
        } catch (error:any) {
          throw new JsonWebTokenError("Could not verify token", error);
        }
      }
    } else {
      throw new ForbiddenRequestError(
        "Invalid token, pass token as a Bearer in authorization headers"
      );
    }
  } catch (error) {
    next(error);
  }
});
