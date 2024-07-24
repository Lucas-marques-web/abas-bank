import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Listagem.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

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

  const handleConsultarBanco = async (event) =>{
    event.preventDefault();

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
         <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand ><h1>Abas</h1></Navbar.Brand>
                    <form onSubmit={handleConsultarBanco}>
                        <ButtonToolbar className="mb-2">
                          <InputGroup>
                            <Form.Control 
                              type="number"
                              value={codigoBanco}
                              required
                              onChange={handleCodigoBancoChange}
                              placeholder='Codigo Banco'
                            />
                          </InputGroup>

                          <ButtonGroup className="me-4">
                            <Button variant="dark" type='submit'>Consultar</Button>
                          </ButtonGroup>
                          
                          </ButtonToolbar>
                    </form>
                </Container>
        </Navbar> 
      <Container fluid>
        {bancoConsultado.code && (
          <div className='bancoConsultado'>
            <Link to={`/cadastro/${bancoConsultado.code}`}>
            <Col key={bancoConsultado.code} sm={12} md={4} lg={3}>
              <Card className='bg-body-tertiary' style={{ margin: '10px' }}>
                <Card.Body>
                    <Card.Text>
                      {'Name: '+ bancoConsultado.name} <br></br>
                      {'Code: '+ bancoConsultado.code}
                    </Card.Text>
                </Card.Body>
              </Card>
              </Col>
            </Link>
          </div>
        )}

          <ul>
              <Row>
                    {bancos.map(banco => (
                        <Col className='listaBancos' key={banco.id} sm={12} md={4} lg={3}>
                            <Card className='bg-body-tertiary' style={{ margin: '10px' }}>
                                <Card.Body>
                                <Link to={`/cadastro/${banco.code}`}>
                                    <Card.Text>
                                    {'Name: '+ banco.name} <br></br>
                                    {'Code: '+ banco.code} 
                                    </Card.Text>
                                  </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ul>
        </Container>
    </div>
  );
};

export default Listagem;
