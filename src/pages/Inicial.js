import { Link } from "react-router-dom";

function Inicial() {
    
    console.log(localStorage.getItem('agencia'));
    const numeroAgencia = localStorage.getItem('agencia') || 'Não cadastrada';
    const numeroConta = localStorage.getItem('conta') || 'Não cadastrada';
    const codigoBanco = localStorage.getItem('codigoBanco') || 'Não cadastrado';
    const contaCadastrada = codigoBanco !== 'Não cadastrado' && numeroAgencia !== 'Não cadastrada' && numeroConta !== 'Não cadastrada';


    return(
        <div>
            <h1>Abas Bank</h1>
            <div>
                <Link to='listagem'>
                    <button>Nova Conta</button>
                </Link>
                {contaCadastrada ? (
                    <p>
                        Codigo Banco: {codigoBanco} <br></br>
                        Numero Agencia: {numeroAgencia} <br></br>
                        Numero Conta: {numeroConta}
                    </p>
                ): (
                    <p>Não existe conta cadastrada</p>
                )} 
            </div>
        </div>
    );
}

export default Inicial;