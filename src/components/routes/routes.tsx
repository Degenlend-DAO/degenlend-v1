import { Routes, Route } from 'react-router-dom'
import Root from '../../views/root';
import FrequentlyAskedQuestions from '../FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import Vote from '../Vote/Vote';
import Governance from '../Governance/Governance';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/markets' element={<></>} />
            <Route path='/governance' element={<Governance />} />
            <Route path='/stake' element={<></>} />
            <Route path='/faq' element={<FrequentlyAskedQuestions />} />
            <Route path='/vote' element={<Vote />} />
        </Routes>
    );
}

export default RoutesComponent;