import React, {useEffect, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import './Converter.scss'
import axios from "axios";

const Converter = () => {
    const [initialState, setState] = useState({
        currencies: ["USD", "EUR", "UAH"],
        base: "USD",
        amount: "",
        convertTo: "UAH",
        result: "",
    });

    const {currencies, base, amount, convertTo, result} = initialState;

    useEffect(() => {
        if (amount === '') {
            return
        } else {
            const getConvertedCurrency = async () => {
                const response = await axios.get(
                    `https://api.apilayer.com/exchangerates_data/convert?to=${convertTo}&from=${base}&amount=${amount}`,
                    {
                        headers: {
                            'apiKey': 'Js2earcAGdsxGhoaSA1jvAvgAyVIo79H'
                        }
                    }
                );

                const result = response.data.result

                setState({
                    ...initialState,
                    result,
                });
            };
            getConvertedCurrency();
        }
    }, [amount, base, convertTo]);

    const changeInputHandler = (e) => {
        setState({
            ...initialState,
            amount: e.target.value,
            result: null,
        });
    };

    const handleSelectHandler = (e) => {
        setState({
            ...initialState,
            [e.target.name]: e.target.value,
            result: null,
        });
    };

    const handleSwapHandler = (e) => {
        e.preventDefault();
        setState({
            ...initialState,
            convertTo: base,
            base: convertTo,
            result: null,
        });
    };

    return (
        <Card
            className='card'
        >
            <Card.Title>
                Конвертер Валют
            </Card.Title>
            <Card.Body
                className='card-body'
            >
                <div
                    className="card-actions"
                >
                    <Form.Group
                        className='form-group'
                    >
                        <Form.Select
                            className='form-select'
                            onChange={handleSelectHandler}
                            defaultValue={base}
                        >
                            {
                                currencies.map((el) => (
                                    <option
                                        key={el}
                                        value={el}
                                    >
                                        {el}
                                    </option>
                                ))
                            }
                        </Form.Select>
                        <Form.Control
                            className='form-input'
                            value={amount}
                            onChange={changeInputHandler}
                            type='number'
                        />
                    </Form.Group>
                    <Form.Group
                        className='form-group'
                    >
                        <Form.Select
                            className='form-select'
                            onChange={handleSelectHandler}
                            defaultValue={convertTo}
                        >
                            {
                                currencies.map((el) => (
                                    <option
                                        key={el}
                                        value={el}
                                    >
                                        {el}
                                    </option>
                                ))
                            }
                        </Form.Select>
                        <Form.Control
                            className='form-input'
                            value={
                                amount === ""
                                    ? "0"
                                    : result === null
                                        ? "Розрахунок"
                                        : result
                            }
                            onChange={changeInputHandler}
                            type='number'
                            disabled
                        />
                    </Form.Group>
                </div>
                <Button
                    onClick={handleSwapHandler}
                >
                    Swap
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Converter;