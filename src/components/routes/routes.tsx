import { Routes, Route } from 'react-router-dom'
import Root from '../../views/root';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/markets' element={<></>} />
            <Route path='/stake' element={<></>} />
            <Route path='/faq' element={<></>} />
            <Route path='/vote' element={<></>} />
        </Routes>
    );
}

export default RoutesComponent;