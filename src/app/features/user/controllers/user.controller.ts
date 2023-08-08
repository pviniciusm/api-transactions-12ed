import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { UserRepository } from "../repositories/user.repository";
import { ListUsersUsecase } from "../usecases/list-users.usecase";
import { LoginUsecase } from "../usecases/login.usecase";
import { GetUserUsecase } from "../usecases/get-user.usecase";

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

            const result = await new GetUserUsecase().execute(id);

            return res.status(result.code).send(result);
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
