// Importa a função createApp do Vue e desestrutura apenas essa função do objeto Vue
const { createApp } = Vue;

// Cria uma nova instância de aplicativo Vue
createApp({
    // Define o estado inicial do componente
    data() {
        return {
            // Representa o número a ser exibido na calculadora
            display: '0',
            // Guarda o número atual durante as operações
            numAtual: null,
            // Guarda o número anterior durante as operações
            numAnterior: null,
            // Guarda o operador atual
            operador: null
        }
    },
    // Define os métodos para lidar com eventos da calculadora
    methods: {
        // Lida com os cliques nos botões da calculadora
        lidarBotao(botao) {
            switch (botao) {
                // Verifica se o botão clicado é um operador
                case '*':
                case '-':
                case '+':
                case '/':
                    // Se sim, trata como operador
                    this.lidarOperador(botao);
                    break;
                // Verifica se o botão clicado é um ponto decimal
                case '.':
                    // Se sim, trata como decimal
                    this.lidarDecimal();
                    break;
                // Verifica se o botão clicado é o botão de igual
                case '=':
                    // Se sim, calcula o resultado da operação
                    this.lidarIgualdade();
                    break;
                // Verifica se o botão clicado é o botão de limpar (AC)
                case 'AC':
                    // Se sim, limpa a calculadora
                    this.lidarClear();
                    break;
                // Se não for nenhum dos casos anteriores, trata como número
                default:
                    this.lidarNumero(botao);
                    break;
            }
        },
        // Lida com os botões de operador
        lidarOperador(botao) {
            // Verifica se já há um operador em uso
            if (this.operador !== null) {
                // Se sim, calcula o resultado da operação anterior
                this.lidarIgualdade(); 
            }
            // Guarda o número anterior
            this.numAnterior = parseFloat(this.display);
            // Guarda o operador atual
            this.operador = botao;
            // Limpa a tela de exibição
            this.display = '';  
        },
        // Lida com o botão de igual
        lidarIgualdade() {
            // Verifica se há operador e número anterior definidos
            if (this.operador === null || this.numAnterior === null) {
                return;
            }
            // Realiza a operação com base no operador selecionado
            switch (this.operador) {
                case '+':
                    this.display = (parseFloat(this.numAnterior) + parseFloat(this.display)).toString();
                    break;
                case '-':
                    this.display = (parseFloat(this.numAnterior) - parseFloat(this.display)).toString();
                    break;
                case '*':
                    this.display = (parseFloat(this.numAnterior) * parseFloat(this.display)).toString();
                    break;
                case '/':
                    this.display = (parseFloat(this.numAnterior) / parseFloat(this.display)).toString();
                    break;
            }
            // Limpa o operador e o número anterior após a operação
            this.operador = null;
            this.numAnterior = null;
        },
        // Lida com o botão de ponto decimal
        lidarDecimal() {
            // Adiciona um ponto decimal se ainda não estiver presente na exibição
            if (!this.display.includes('.')) {
                this.display += '.';
            }
        },
        // Lida com o botão de limpar (AC)
        lidarClear() {
            // Limpa todos os valores e reinicia a calculadora
            this.display = '0';
            this.numAtual = null;
            this.numAnterior = null;
            this.operador = null;
        },
        // Lida com a entrada de números
        lidarNumero(numero) {
            // Verifica se o display é '0' ou se um número atual já está presente
            if (this.display === '0' || this.numAtual !== null) {
                // Se sim, redefine o display com o número clicado
                this.display = numero.toString();
                this.numAtual = null;
            } else {
                // Se não, adiciona o número ao display
                this.display += numero.toString();
            }
        }
    }
// Monta a aplicação Vue no elemento com o id 'app' no DOM
}).mount('#app');
