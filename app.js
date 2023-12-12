document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            startApp();
        } catch (error) {
            console.error('Usuário negou acesso à carteira Ethereum');
        }
    } else {
        console.error('Extensão de carteira não detectada');
    }
});

async function startApp() {
    const web3 = window.web3;
    const contractAddress = 'SEU_CONTRATO_ADDRESS';
    const contractABI = [
        // Insira o ABI do seu contrato
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    document.getElementById('createQuestion').addEventListener('click', async () => {
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;
        const reward = document.getElementById('reward').value;

        const rewardWei = web3.utils.toWei(reward, 'ether');

        try {
            await contract.methods.criarPergunta(title, body, rewardWei).send({ from: window.ethereum.selectedAddress });
            console.log('Pergunta criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar pergunta:', error);
        }
    });

    document.getElementById('answerQuestion').addEventListener('click', async () => {
        const questionId = document.getElementById('questionId').value;
        const answerBody = document.getElementById('answerBody').value;

        try {
            await contract.methods.responderPergunta(questionId, answerBody).send({ from: window.ethereum.selectedAddress });
            console.log('Resposta enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
        }
    });
}
