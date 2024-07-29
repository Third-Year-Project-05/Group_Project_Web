import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/theme-provider';

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
import ChangePassword from './components/change-pw';
import AdminProfile from './pages/admin/admin-profile';
import AdminSettings from './pages/admin/settings/settings';

import UserSidebar from './components/sidebar/user-sidebar';
// import userDashboard from './pages/user/dashboard/dashboard';
import UserBlog from './pages/user/blog/blog';
import UserProfile from './pages/user/user-profile';

import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="flex flex-col min-h-screen">

                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

const AdminLayout = ({ children }) => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        console.log("sidebar theme", theme);
    }, [theme]);

    return (
        <div className="flex -z-30">
            <AdminSidebar theme={theme} isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <main className={`flex-grow relative transition-all duration-300 -z-0 mt-20 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                <div className="p-4 overflow-x-hidden h-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

const LoginLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-inherit">
            <LogHeader />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );

}

const UserLayout = ({ children }) => {
    const {theme} = useTheme();

    useEffect(() => {
        console.log("sidebar theme", theme);
    }, [theme]);

    return (

        // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="flex min-h-screen">
                <UserSidebar />
                <main className="flex-grow">
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        // </ThemeProvider>
    );
}

function App() {
    return (
        <ThemeProvider storageKey="vite-ui-theme">

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


                {/*Login User*/}
                <Route path="/user-home" element={<LoginLayout><Home/></LoginLayout>}/>
                <Route path='/user-blog' element={<LoginLayout><UserBlog/></LoginLayout>}/>
                <Route path='/user-change-pw' element={<LoginLayout><ChangePassword/></LoginLayout>} />
                <Route path='/user-profile' element={<LoginLayout><UserProfile /></LoginLayout>} />


                {/* 404 Error */}
                <Route path="*" element={<Nofound/>}/>


                {/*admin*/}
                <Route path="/admin-dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin-users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
                <Route path="/admin-statistics" element={<AdminLayout><AdminStatistics /></AdminLayout>} />
                <Route path="/admin-game" element={<AdminLayout><AdminGame /></AdminLayout>} />
                <Route path="/admin-blog" element={<AdminLayout><AdminBlog /></AdminLayout>} />
                <Route path="/admin-reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
                <Route path="/admin-messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
                <Route path="/admin-financial-management" element={<AdminLayout><AdminFinancialManagement /></AdminLayout>} />
                <Route path="/admin-change-pw" element={<AdminLayout><ChangePassword /></AdminLayout>} />
                <Route path="/admin-profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
                <Route path="/admin-settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />


                {/*user*/}
                {/* <Route path="/user-dashboard" element={<UserLayout><userDashboard /></UserLayout>} /> */}
                {/*<Route path='/user-blog' element={<UserLayout><UserBlog/></UserLayout>}/>*/}


            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
