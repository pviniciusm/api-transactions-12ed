import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../util/http-response.adapter";
import { TransactionType } from "../models/transaction.model";

export class TransactionMiddleware {
    public static validateFieldsCreate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { title, type, value } = req.body;

            if (!title) {
                return HttpResponse.fieldNotProvided(res, "Title");
            }

            if (!type) {
                return HttpResponse.fieldNotProvided(res, "type");
            }

            const allowedTypes = Object.values(TransactionType);

            if (!allowedTypes.includes(type)) {
                return HttpResponse.invalid(res, "Type");
            }

            if (!value) {
                return HttpResponse.fieldNotProvided(res, "value");
            }

            next();
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }
}
