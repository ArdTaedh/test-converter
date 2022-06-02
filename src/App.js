import React from 'react';
import Header from "./components/Header";
import Converter from "./components/Converter";
import './App.css'

const App = () => {
    return (
        <>
            <Header />
            <main
                className='main'
            >
                <Converter />
            </main>
        </>
    );
};

export default App;