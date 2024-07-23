import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cadastro(){
    const pathname = window.location.pathname;
    const partesPathname = pathname.split('/');
    const codigoBanco = partesPathname[2]

    const [banco, setBanco] = useState([]);
    const [numeroAgencia,setNumeroAgencia] = useState([]);
    const [numeroConta,SetNumberoConta] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://brasilapi.com.br/api/banks/v1/'+codigoBanco);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setBanco(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      function handleChangeAgencia(event){
        setNumeroAgencia(event.target.value);
      }
      function handleChangeConta(event){
        SetNumberoConta(event.target.value);
      }


      function handleCadastroConta(){
        console.log(codigoBanco,numeroAgencia,numeroConta)
        localStorage.setItem('agencia', numeroAgencia);
        localStorage.setItem('conta', numeroConta);
        localStorage.setItem('codigoBanco', codigoBanco);
      }
    

    return(
            <div>
                <h1>Abas bank</h1>
                <h3>Banco Consultado</h3>
                <p>
                    {'Name: '+ banco.name} <br></br>
                    {'Code: '+ banco.code} <br></br>
                    {'Ispb: ' + banco.ipsb} <br></br>
                    {'Full Name: '+ banco.fullName}
                </p>
                <form>
                    <input type='number' placeholder='Agencia' value={numeroAgencia} onChange={handleChangeAgencia}></input>
                    <input type='number' placeholder='conta' value={numeroConta} onChange={handleChangeConta}></input> <br></br>
                    <Link to='/'>
                        <button onClick={handleCadastroConta}>Cadastrar Conta</button>
                    </Link>
                </form>

            </div>
    )
}





export default Cadastro;