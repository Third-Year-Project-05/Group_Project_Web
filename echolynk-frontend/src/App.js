import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';

import Home from './pages/landing/home';
import About from './pages/landing/about';
import Blog from './pages/landing/blog';
import Contactus from './pages/landing/contactus';

import Login from './pages/auth/login';
import Register from './pages/auth/register';

import LogHeader from "./components/header/log-header";

import Nofound from './pages/error/404';

import AdminSidebar from './components/sidebar/admin-sidebar';
import AdminDashboard from './pages/admin/dashboard/dashboard';
import AdminUsers from "./pages/admin/users/admin-users";
import AdminStatistics from "./pages/admin/statistics/statistics";
import AdminGame from "./pages/admin/game/game";
import AdminBlog from "./pages/admin/blog/blog";
import AdminReports from "./pages/admin/reports/reports";
import AdminMessages from "./pages/admin/messages/messages";
import AdminFinancialManagement from "./pages/admin/financial management/financial management";


const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-grow">
                <div className="p-4"> {/* Adjust padding as needed */}
                    {children}
                </div>
            </main>
        </div>
    );
}

const LoginLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <LogHeader />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );

}



function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Main content */}
                <Route path="/" element={<Layout><Home/></Layout>}/>
                <Route path="/about" element={<Layout><About/></Layout>}/>
                <Route path="/blog" element={<Layout><Blog/></Layout>}/>
                <Route path="/contact" element={<Layout><Contactus/></Layout>}/>

                {/* Auth */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>


                Login User
                <Route path="/user-home" element={<LoginLayout><Home/></LoginLayout>}/>

                {/* 404 Error */}
                <Route path="*" element={<Layout><Nofound/></Layout>}/>


                {/*admin*/}
                <Route path="/admin-dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin-users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
                <Route path="/admin-statistics" element={<AdminLayout><AdminStatistics /></AdminLayout>} />
                <Route path="/admin-game" element={<AdminLayout><AdminGame /></AdminLayout>} />
                <Route path="/admin-blog" element={<AdminLayout><AdminBlog /></AdminLayout>} />
                <Route path="/admin-reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
                <Route path="/admin-messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
                <Route path="/admin-financial-management" element={<AdminLayout><AdminFinancialManagement /></AdminLayout>} />




            </Routes>
        </BrowserRouter>
    );
}

export default App;
