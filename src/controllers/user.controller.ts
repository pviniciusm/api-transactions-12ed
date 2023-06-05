import { Request, Response } from "express";
import { HttpResponse } from "../util/http-response.adapter";
import { usersList } from "../data/users";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
    public create(req: Request, res: Response) {
        try {
            // ...
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public list(req: Request, res: Response) {
        try {
            return HttpResponse.success(res, "ok", usersList);
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public get(req: Request, res: Response) {
        try {
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email) {
                return HttpResponse.fieldNotProvided(res, "E-mail");
            }

            if (!password) {
                return HttpResponse.fieldNotProvided(res, "Password");
            }

            const user = new UserRepository().getByEmail(email);
            if (!user) {
                // return HttpResponse.notFound(res, "User");
                return HttpResponse.invalidCredentials(res);
            }

            if (user.password !== password) {
                return HttpResponse.invalidCredentials(res);
            }

            return HttpResponse.success(res, "Login successfully done", {
                id: user.id,
                name: user.name,
            });
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }
}
