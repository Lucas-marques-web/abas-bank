import React, { useState, useEffect } from 'react';

const Listagem = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://brasilapi.com.br/api/banks/v1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div>
        <h1>abas bank</h1>
        <input type='number'placeholder='Digite o codigo do banco'></input>
        <button>Consultar</button>
        <ul>
            {data.map(item => (
            <li key={item.id}> 
                <p>
                {'Name: '+ item.name} <br></br>
                {'Code: '+ item.code} <br></br>
                {'Ispb: ' + item.ipsb} <br></br>
                {'Full Name: '+ item.fullName}
                </p>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default Listagem;
