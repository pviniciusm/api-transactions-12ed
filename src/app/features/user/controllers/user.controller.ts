import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
    public create(req: Request, res: Response) {
        try {
            // ...
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const repository = new UserRepository();
            const result = await repository.list();

            return HttpResponse.success(res, "Users successfully listed", result);
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const repository = new UserRepository();
            const result = await repository.get(id);

            if (!result) {
                return HttpResponse.notFound(res, "User");
            }

            return HttpResponse.success(res, "User successfully obtained", result.toJson());
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email) {
                return HttpResponse.fieldNotProvided(res, "E-mail");
            }

            if (!password) {
                return HttpResponse.fieldNotProvided(res, "Password");
            }

            const user = await new UserRepository().getByEmail(email);
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
