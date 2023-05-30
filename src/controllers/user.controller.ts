import { Request, Response } from "express";
import { HttpResponse } from "../util/http-response.adapter";
import { usersList } from "../data/users";

export class UserController {
    public create(req: Request, res: Response) {
        try {
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
}
