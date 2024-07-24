import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

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
                <Navbar expand="lg" className="bg-body-tertiary">
                      <Container fluid>
                          <Navbar.Brand ><h1>Abas</h1></Navbar.Brand>
                      </Container>
                  </Navbar>
              

              <Container fluid>
                  <Col className='listaBancos' key={banco.id} sm={12} md={4} lg={3}>
                  <Card className='bg-body-tertiary' style={{ margin: '10px' }}>
                  <Card.Body>
                      <Card.Text>
                      {'Name: '+ banco.name} <br></br>
                      {'Code: '+ banco.code} <br></br>
                      {'Ispb: ' + banco.ipsb} <br></br>
                      {'Full Name: '+ banco.fullName}
                      </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <form onSubmit={handleCadastroConta}>
                        <ButtonToolbar className="mb-2">
                          <InputGroup>
                            <Form.Control 
                              type="number"
                              value={numeroAgencia}
                              required
                              onChange={handleChangeAgencia}
                              placeholder='Agencia'
                            />
                          </InputGroup>
                          
                          <InputGroup>
                            <Form.Control 
                              type="number"
                              value={numeroConta}
                              required
                              onChange={handleChangeConta}
                              placeholder='Conta'
                            />
                          </InputGroup>                          
                          </ButtonToolbar>

                          <ButtonGroup className="me-2">
                            <Button variant="dark" type='submit'>Consultar</Button>
                          </ButtonGroup>
                    </form>




              </Container>
            </div>
    )
}





export default Cadastro;