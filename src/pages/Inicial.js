import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Inicial() {
    const [numeroAgencia, setNumeroAgencia] = useState('Não cadastrada');
    const [numeroConta, setNumeroConta] = useState('Não cadastrada');
    const [codigoBanco, setCodigoBanco] = useState('Não cadastrado');
    const [contaCadastrada, setContaCadastrada] = useState(false);
    const [listaBancos, setListaBancos] = useState([]);

    useEffect(() => {
        const storedNumeroAgencia = localStorage.getItem('agencia') || 'Não cadastrada';
        const storedNumeroConta = localStorage.getItem('conta') || 'Não cadastrada';
        const storedCodigoBanco = localStorage.getItem('codigoBanco') || 'Não cadastrado';

        setNumeroAgencia(storedNumeroAgencia);
        setNumeroConta(storedNumeroConta);
        setCodigoBanco(storedCodigoBanco);
        setContaCadastrada(storedCodigoBanco !== 'Não cadastrado' && storedNumeroAgencia !== 'Não cadastrada' && storedNumeroConta !== 'Não cadastrada');

        const storedListaBancos = JSON.parse(localStorage.getItem('listaBancos')) || [];
        setListaBancos(storedListaBancos);

        if (storedCodigoBanco !== 'Não cadastrado' && storedNumeroAgencia !== 'Não cadastrada' && storedNumeroConta !== 'Não cadastrada') {
            const newAccount = {
                codigoBanco: storedCodigoBanco,
                numeroAgencia: storedNumeroAgencia,
                numeroConta: storedNumeroConta,
            };

            const accountExists = storedListaBancos.some(
                account => account.codigoBanco === storedCodigoBanco && account.numeroAgencia === storedNumeroAgencia && account.numeroConta === storedNumeroConta
            );

            if (!accountExists) {
                const updatedListaBancos = [...storedListaBancos, newAccount];
                localStorage.setItem('listaBancos', JSON.stringify(updatedListaBancos));
                setListaBancos(updatedListaBancos);
            }
        }
    }, []);

    // console.log(listaBancos);

    return (
        <div>
            <h1>Abas Bank</h1>
            <div>
                <Link to='/listagem'>
                    <button>Nova Conta</button>
                </Link>
                {listaBancos.length > 0 ? (
                    <ul>
                        {listaBancos.map((conta, index) => (
                            <p key={index}>
                                Codigo Banco: {conta.codigoBanco} <br />
                                Numero Agencia: {conta.numeroAgencia} <br />
                                Numero Conta: {conta.numeroConta}
                            </p>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma conta registrada</p>
                )}
            </div>
        </div>
    );
}

export default Inicial;
