import { Routes, Route } from 'react-router-dom'
import Root from '../../views/root';

const RoutesComponent =() => {
    return (
        <Routes>
            <Route path='/' element={<Root />} />
        </Routes>
    );
}

export default RoutesComponent;