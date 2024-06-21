import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/landing/home';
import About from './pages/landing/about';
import Blog from './pages/landing/blog';
import Contactus from './pages/landing/contactus';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Nofound from './pages/error/404';


const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/*hero content*/}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/contact" element={<Layout><Contactus /></Layout>} />

                {/*auth*/}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/*404 error*/}
                <Route path="*" element={<Layout><Nofound /></Layout>} />


            </Routes>
        </BrowserRouter>
    );
}

export default App;
