export class OperationResponse<T> {

    constructor(messages: string[] = null) {

        this.messages = [];
        if (messages && messages.length > 0) {
            this.isSuccess = false;
            this.messages = messages;
        }
        else {
            this.isSuccess = true;
        }
    }

    public add(message: string) {
        if (message === null || message === undefined) {
            return;
        }
        this.isSuccess = false;

        if (typeof message == 'object') {
            message == JSON.stringify(message);
        }

        let messagens;
        if (typeof message == "object") {
            messagens = ["Erro: Erro ao criar mensagens de Resposta de Operação. Vide Log "];
            console.log(message);
        } else {
            messagens = message.split('#');
        }

        messagens.forEach(item => {
            this.messages.push(item);
        });
    }

    public addRange(messages: string[]) {
        if (messages === null || messages === undefined || !messages.length) {
            return;
        }

        this.isSuccess = false;

        for (const message of messages) {

            let messagens = message.split('#');

            messagens.forEach(item => {
                this.messages.push(item);
            });
        }
    }

    result: T;
    id: any;
    isSuccess: boolean;
    statusCode: number;
    messages: string[];
}