import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cadastro(){
    const pathname = window.location.pathname;
    const partesPathname = pathname.split('/');
    const codigoBanco = partesPathname[2]
   
    const navigate = useNavigate();
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


      function handleCadastroConta(event){
        
        event.preventDefault();

        localStorage.setItem('agencia', numeroAgencia);
        localStorage.setItem('conta', numeroConta);
        localStorage.setItem('codigoBanco', codigoBanco);
        
        navigate('/');
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
                
                <form onSubmit={handleCadastroConta}>
                    <input type='number' placeholder='Agencia' value={numeroAgencia} required onChange={handleChangeAgencia}></input>
                    <input type='number' placeholder='conta' value={numeroConta} required onChange={handleChangeConta}></input> <br></br>
                    <button type='submit'>Cadastrar Conta</button>
                </form>

            </div>
    )
}





export default Cadastro;