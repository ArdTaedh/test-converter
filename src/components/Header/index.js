import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import styles from './Header.module.scss'
import { useState, useEffect } from 'react'
import axios from "axios";

const Header = () => {
    const [dollar, setDollar] = useState('')
    const [euro, setEuro] = useState('')

    useEffect(() => {
        const getCurrencies = async () => {
            const dollarResponse = await axios.get(
                `https://api.apilayer.com/exchangerates_data/latest?symbols=UAH&base=USD`, {
                    headers: {
                        'apiKey': 'Js2earcAGdsxGhoaSA1jvAvgAyVIo79H'
                    }
                }
            );

            const euroResponse = await axios.get(
                `https://api.apilayer.com/exchangerates_data/latest?symbols=UAH&base=EUR`, {
                    headers: {
                        'apiKey': 'Js2earcAGdsxGhoaSA1jvAvgAyVIo79H'
                    }
                }
            );

            setDollar(dollarResponse.data.rates.UAH.toFixed(2))
            setEuro(euroResponse.data.rates.UAH.toFixed(2))
        }

        getCurrencies()

    }, [])

    return (
        <Navbar
            className={styles.header}
            bg='primary'
            variant='dark'
        >
            <Container>
                <Navbar.Brand>Курс Валют</Navbar.Brand>
                <Nav>
                    <Nav.Link>Доллар: {dollar !== null && dollar} </Nav.Link>
                    <Nav.Link>Євро: {euro !== null && euro} </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;