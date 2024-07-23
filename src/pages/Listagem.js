import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Listagem.css'

const Listagem = () => {
  const [bancos, setBancos] = useState([]);
  const [codigoBanco, setCodigoBanco] = useState([]);
  const [bancoConsultado, setBancoConsultado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://brasilapi.com.br/api/banks/v1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setBancos(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCodigoBancoChange = (event) =>{
    setCodigoBanco(event.target.value);
  };

  const handleConsultarBanco = async () =>{

    const listaBancos = document.querySelector('ul');
    listaBancos.classList.add('active');

    try {
        const response = await fetch(`https://brasilapi.com.br/api/banks/v1/${codigoBanco}`);
        if (!response.ok) {
          throw new Error('Banco não encontrado');
        }
        const data = await response.json();
        setBancoConsultado(data);

      } catch (error) {
        console.error('Erro ao consultar banco:', error);
        setBancoConsultado(null);
      }
    }

  return (
    <div>
        <h1>Abas Bank</h1>

        <input type='number'value={codigoBanco} required  onChange={handleCodigoBancoChange} placeholder='Digite o codigo do banco'></input>
        <button onClick={handleConsultarBanco}>Consultar</button>
        {bancoConsultado.code && (
        <div className='bancoConsultado'>
          <h3>Banco Consultado</h3>
          <Link to={`/cadastro/${bancoConsultado.code}`}>
            <p>
                {'Name: '+ bancoConsultado.name} <br></br>
                {'Code: '+ bancoConsultado.code}
            </p>
          </Link>
        </div>
      )}

        <ul >
            {bancos.map(banco => (
            <li className='listaBancos' key={banco.id}> 
                
                <Link to={`/cadastro/${banco.code}`}>
                    <p>
                        {'Name: '+ banco.name} <br></br>
                        {'Code: '+ banco.code} 
                    </p>
                </Link>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default Listagem;
