import Login from './components/Login';
import UserHome from './components/UserHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/home" element={<UserHome />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
