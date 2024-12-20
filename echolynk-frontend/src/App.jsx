import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import Private from './context/PrivateRoute';
import PrivateUser from './context/PrivateUser';
import PrivateVerbal from './context/PrivateVerbal';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/landing/home';
import About from './pages/landing/about';
import Blog from './pages/landing/blog';
import Contactus from './pages/landing/contactus';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

import LogHeader from "./components/header/log-header";
import VerbalHeader from "./components/header/verbal-header.jsx";

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

import Game from './pages/game/game.jsx';
import EasyLevel from "./pages/game/easy-level.jsx";
import MediumLevel from "./pages/game/medium-level.jsx";
import HardLevel from "./pages/game/hard-level.jsx";
import QuizPage from "./pages/game/quiz.jsx";

import UserBlog from './pages/user/blog/blog';

import UserProfile from './pages/common/user-profile.jsx';

import UserHome from './pages/user/home/home';

import VerbalHome from './pages/verbalUser/home/home';

import {useContext, useEffect, useState} from 'react';

import VideoChat from './pages/user/video-chat/video-chat';
import Room from './pages/user/video-chat/Room';

import PremiumUpgrade from './pages/user/premium-upgrade';
import PaymentSuccess from './pages/user/payment-success';
import { Toaster } from './components/ui/toaster';


import Blogview2 from './components/blog/blog-view';
import JoinRoom from './pages/user/video-chat/joinRoom';
import StripePayment from './pages/user/payment';
import PremiumUserUsage from './pages/user/dashboard/premiumUsage';

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
                <div className="h-full p-4 overflow-x-hidden">
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    );
};

const LoginLayout = ({ children, needFooter=true, isLogin=true }) => {
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        if(isLogin){
            const user = JSON.parse(localStorage.getItem('user'));
            // console.log(user);
            const premiumStatus = user.isPremium;
            // console.log(isPremium);
            setIsPremium(premiumStatus);

            const updatePremiumStatus = () => {
                const user = JSON.parse(localStorage.getItem('user'));
                if(user){
                    setIsPremium(user.isPremium);
                }
            }

            const handleStorageChange = (event) => {
                if (event.key === 'user') {
                    updatePremiumStatus();
                }
            }

            window.addEventListener('storage', handleStorageChange);

        }

    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-inherit">
            <LogHeader isPremium={isPremium}/>
            <main className="flex-grow">{children}</main>
            { needFooter && <Footer />}
        </div>
    );
}

const VerbalLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <VerbalHeader />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

const UserLayout = ({ children }) => {
    const { theme } = useTheme();

    // useEffect(() => {
    //     // console.log("sidebar theme", theme);
    // }, [theme]);

    return (
        <div className="flex min-h-screen">
            <UserSidebar />
            <main className="flex-grow">
                <div className="p-4">
                    {children}
                </div>
            </main>
        </div>
    );
}

function App() {
    return (
            <ThemeProvider storageKey="vite-ui-theme">
                <BrowserRouter>
                    <AuthProvider>
                    <Routes>
                        {/* Main content */}
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/about" element={<Layout><About /></Layout>} />
                        <Route path="/blog" element={<Layout><Blog /></Layout>} />
                        <Route path="/contact" element={<Layout><Contactus /></Layout>} />

                        {/* Auth */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Login User */}
                        <Route path="/user-home" element={<PrivateUser element={<LoginLayout><UserHome /></LoginLayout>} />} />
                        <Route path="/user-blog" element={<PrivateUser element={<LoginLayout><UserBlog /></LoginLayout>} />} />
                        <Route path="/user-game" element={<PrivateUser element={<LoginLayout><Game /></LoginLayout>} />} />
                        <Route path="/user-video-chat" element={<LoginLayout needFooter={false} isLogin={false}><VideoChat /></LoginLayout>} />
                        <Route path='/user-change-pw' element={<LoginLayout><ChangePassword/></LoginLayout>} />
                        <Route path='/user-profile' element={<LoginLayout><UserProfile /></LoginLayout>} />
                        <Route path='/game/easy-level' element={<LoginLayout><EasyLevel /></LoginLayout>} />
                        <Route path="/game/medium-level" element={<LoginLayout><MediumLevel /></LoginLayout>} />
                        <Route path="/game/hard-level" element={<LoginLayout><HardLevel /></LoginLayout>} />
                        <Route path='/quiz/:gameId' element={<LoginLayout><QuizPage /></LoginLayout>} />
                        <Route path="/premium-upgrade" element={<PremiumUpgrade />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                        <Route path="/stripe-payment" element={<StripePayment />} />


                        <Route path="user-video-chat/room/:roomID" element={<Room/>} />
                        <Route path="user-video-chat/join/:roomID" element={<JoinRoom />} />
                        

                        {/* Verbal User */}
                        <Route path="/verbal-home" element={<PrivateVerbal element={<VerbalLayout><VerbalHome /></VerbalLayout>} />} />
                        <Route path="/verbal-blog" element={<PrivateVerbal element={<VerbalLayout><UserBlog /></VerbalLayout>} />} />
                        <Route path="/verbal-game" element={<PrivateVerbal element={<VerbalLayout><Game /></VerbalLayout>} />} />
                        <Route path="/verbal-profile" element={<VerbalLayout><UserProfile /></VerbalLayout>} />

                        {/* 404 Error */}
                        <Route path="*" element={<Nofound />} />

                        {/* Admin */}
                        <Route path="/admin-dashboard" element={<Private element={<AdminLayout><AdminDashboard /></AdminLayout>} />} />
                        <Route path="/admin-users" element={<Private element={<AdminLayout><AdminUsers /></AdminLayout>} />} />
                        <Route path="/admin-statistics" element={<Private element={<AdminLayout><AdminStatistics /></AdminLayout>} />} />
                        <Route path="/admin-game" element={<Private element={<AdminLayout><AdminGame /></AdminLayout>} />} />
                        <Route path="/admin-blog" element={<Private element={<AdminLayout><AdminBlog /></AdminLayout>} />} />
                        <Route path="/admin-reports" element={<Private element={<AdminLayout><AdminReports /></AdminLayout>} />} />
                        <Route path="/admin-messages" element={<Private element={<AdminLayout><AdminMessages /></AdminLayout>} />} />
                        <Route path="/admin-financial-management" element={<Private element={<AdminLayout><AdminFinancialManagement /></AdminLayout>} />} />
                        <Route path="/admin-change-pw" element={<Private element={<AdminLayout><ChangePassword /></AdminLayout>} />} />
                        <Route path="/admin-profile" element={<Private element={<AdminLayout><AdminProfile /></AdminLayout>} />} />
                        <Route path="/admin-settings" element={<Private element={<AdminLayout><AdminSettings /></AdminLayout>} />} />


                        {/* Test */}
                        <Route path="/blogview" element={<Layout><Blogview2 /></Layout>} />
                        <Route path="/premiumUsage" element={<LoginLayout><PremiumUserUsage /></LoginLayout>} />

                                            
                    </Routes>

                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
    );
}

export default App;
