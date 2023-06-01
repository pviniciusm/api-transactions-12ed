import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../util/http-response.adapter";
import { UserRepository } from "../repositories/user.repository";

export class UserMiddleware {
    public static validateUserExists(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { userId } = req.params;

            const user = new UserRepository().get(userId);
            if (!user) {
                return HttpResponse.notFound(res, "User");
            }

            next();
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }
}
