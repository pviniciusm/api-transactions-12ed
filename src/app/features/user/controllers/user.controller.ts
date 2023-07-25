import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { UserRepository } from "../repositories/user.repository";
import { ListUsersUsecase } from "../usecases/list-users.usecase";
import { LoginUsecase } from "../usecases/login.usecase";

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
            const result = await new ListUsersUsecase().execute();

            return res.status(result.code).send(result);
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
            const result = await new LoginUsecase().execute(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }
}
