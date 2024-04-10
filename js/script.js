const opAnterior = document.getElementById("operacao-anterior");
const opAtual = document.getElementById("operacao-atual");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(opAnterior, opAtual) {
        this.opAnterior = opAnterior;
        this.opAtual = opAtual;
        this.userDigit = "";
    };

    // Função res. por atualizar os números na tela.
    addDigit(digit) {
        if(digit === "." && this.opAtual.innerText.includes(".")) {
            return;
        };

        this.userDigit = digit;
        this.attTela();
    };

    attTela(
        valorOperacao = null,
        operacao = null,
        anterior = null,
        atual = null
    ) {
        if(valorOperacao === null) {
            this.opAtual.innerText += this.userDigit;
        } else {
            if(anterior === 0) {
                valorOperacao = atual;
            };

            this.opAnterior.innerText = `${valorOperacao} ${operacao}`;
            this.opAtual.innerText = "";
        };
    };

    // Função res. por processar as operações.
    processarOp(operation) {
        let valorOperacao;
        const opAnterior = +this.opAnterior.innerText.split(" ")[0];
        const opAtual = +this.opAtual.innerText;

        if(this.opAtual.innerText === "" && operation !== "C") {
            if(this.opAnterior.innerText !== "") {
                this.mudarOp(operation);
            };
            return;
        };
        
        switch(operation) {
            case "+":
                valorOperacao = opAnterior + opAtual;
                this.attTela(valorOperacao, operation, opAnterior, opAtual);
            break;
            case "-":
                valorOperacao = opAnterior - opAtual;
                this.attTela(valorOperacao, operation, opAnterior, opAtual);
            break;
            case "*":
                valorOperacao = opAnterior * opAtual;
                this.attTela(valorOperacao, operation, opAnterior, opAtual);
            break;
            case "/":
                valorOperacao = opAnterior / opAtual;
                this.attTela(valorOperacao, operation, opAnterior, opAtual);
            break;
            case "=":
                this.btnIgual(operation)
            break;
            case "CE":
                this.btnCe();
            break;
            case "C":
                this.btnC();
            break;
            case "DEL":
                this.btnDel();
            break;
        };
    };

    // Função res. por mudar de operção caso já tenha uma operação feita
    mudarOp(operacao) {
        const operacoes = ["+", "-", "*", "/"];

        if(!operacoes.includes(operacao)) {
            return;
        };

        this.opAnterior.innerText = this.opAnterior.innerText.slice(0, -1) + operacao;
    };

    btnIgual() {
        const operador = this.opAnterior.innerText.split(" ")[1];
        this.processarOp(operador);
    };

    btnCe() {
        this.opAtual.innerText = "";
    };
    btnC() {
        this.opAnterior.innerText = "";
        this.opAtual.innerText = "";
    };
    btnDel() {
        this.opAtual.innerText = this.opAtual.innerText.slice(0, -1);
    };
};

const calculadora = new Calculator(opAnterior, opAtual);

// Eventos da calculadora
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const valorBtn = e.target.innerText;

        if(+valorBtn >= 0 || valorBtn === ".") {
            calculadora.addDigit(valorBtn);
        } else {
            calculadora.processarOp(valorBtn);
        };
    });
});