import { v4 as createUuid } from "uuid";
import { cpf as validCPF } from "cpf-cnpj-validator";
import { Transaction } from "./transaction.model";

export class User {
    public _id: string;
    public transactions: Transaction[];

    constructor(
        public _name: string,
        public _cpf: number,
        public _email: string,
        public _age: number,
        private _password: string
    ) {
        this._id = createUuid();
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get password() {
        return this._password;
    }

    public get cpf() {
        return this._cpf;
    }

    public get email() {
        return this._email;
    }

    public get age() {
        return this._age;
    }

    public toJson() {
        return {
            id: this.id,
            name: this.name,
            cpf: validCPF.format(this.cpf.toString().padStart(11, "0")),
            email: this.email,
            age: this.age,
        };
    }
}
