import { Routes, Route } from 'react-router-dom'
import Root from '../../views/root';
import FrequentlyAskedQuestions from '../FrequentlyAskedQuestions/FrequentlyAskedQuestions';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/markets' element={<></>} />
            <Route path='/stake' element={<></>} />
            <Route path='/faq' element={<FrequentlyAskedQuestions />} />
            <Route path='/vote' element={<></>} />
        </Routes>
    );
}

export default RoutesComponent;