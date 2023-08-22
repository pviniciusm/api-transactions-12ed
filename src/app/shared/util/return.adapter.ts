import { Result } from "../contracts/result.contract";

export class Return {
    public static invalidCredentials(): Result {
        return {
            ok: false,
            message: "Acesso não autorizado",
            code: 401,
        };
    }

    public static success(message: string, data: any): Result {
        return {
            ok: true,
            message,
            data,
            code: 200,
        };
    }

    public static created(message: string, data: any): Result {
        return {
            ok: true,
            message,
            data,
            code: 201,
        };
    }

    public static notFound(entity: string): Result {
        return {
            ok: false,
            message: `${entity} not found`,
            code: 404,
        };
    }
}
