export interface Result {
    /**
     * Indica se o result foi de sucesso ou não.
     */
    ok: boolean;
    message: string;
    /**
     * Data é opcional, usado apenas quando retorno de sucesso.
     */
    data?: any;
    code: number;
}
