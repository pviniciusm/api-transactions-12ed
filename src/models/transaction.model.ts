import { v4 as uuidCreator } from "uuid";
import { User } from "./user.model";

export enum TransactionType {
    Income = "I",
    Outcome = "O",
}

export class Transaction {
    private _id: string;

    constructor(
        private _title: string,
        private _value: number,
        private _type: TransactionType,
        private _user: User
    ) {
        this._id = uuidCreator();
    }

    public get id(): string {
        return this._id;
    }
    public get title(): string {
        return this._title;
    }
    public get value(): number {
        return this._value;
    }
    public get type(): TransactionType {
        return this._type;
    }
    public get user(): User {
        return this._user;
    }
}
