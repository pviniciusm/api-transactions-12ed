import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { UserRepository } from "../repositories/user.repository";

export class UserMiddleware {
    public static validateUserExists(req: Request, res: Response, next: NextFunction) {
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

    public static validateLoginFields(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email) {
                return HttpResponse.fieldNotProvided(res, "Email");
            }

            if (!password) {
                return HttpResponse.fieldNotProvided(res, "Password");
            }

            next();
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }
}
