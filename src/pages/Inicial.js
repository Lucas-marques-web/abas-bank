import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';


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
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand ><h1>Abas</h1></Navbar.Brand>
                    
                    <Link to='/listagem'>
                        <Button variant='dark'>Nova Conta</Button>
                    </Link>
                </Container>
            </Navbar>
            
           <Container fluid>     
            {listaBancos.length > 0 ? (
                    <Row>
                        {listaBancos.map((conta, index) => (
                            <Col key={index} sm={12} md={4} lg={3}>
                                <Card className='bg-body-tertiary' style={{ margin: '10px' }}>
                                    <Card.Body>
                                        <Card.Title>Conta {index + 1}</Card.Title>
                                        <Card.Text>
                                            Codigo Banco: {conta.codigoBanco} <br />
                                            Numero Agencia: {conta.numeroAgencia} <br />
                                            Numero Conta: {conta.numeroConta}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>Nenhuma conta registrada</p>
                )}
            </Container>
        </div>
    );
}

export default Inicial;
