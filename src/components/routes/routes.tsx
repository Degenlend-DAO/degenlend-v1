import { Routes, Route } from 'react-router-dom'
import Root from '../../views/root';
import FrequentlyAskedQuestions from '../FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import Vote from '../Vote/Vote';
import Governance from '../Governance/Governance';
import Footer from '../Footer/Footer';
import React from 'react';
import { PaletteMode, createTheme } from '@mui/material';
import TopNavigationBar from '../Header/TopNavigationBar';
import Markets from '../Dashboard/markets';

const RoutesComponent = () => {
    return (
        <>
            <TopNavigationBar />
            <Routes>
                <Route path='/' element={<Root />} />
                <Route path='/markets' element={<Markets />} />
                <Route path='/governance' element={<Governance />} />
                <Route path='/stake' element={<></>} />
                <Route path='/faq' element={<FrequentlyAskedQuestions />} />
                <Route path='/vote' element={<Vote />} />
            </Routes>
            <Footer />
        </>
    );
}

export default RoutesComponent;