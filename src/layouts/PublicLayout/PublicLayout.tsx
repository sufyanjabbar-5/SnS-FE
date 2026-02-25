import React from 'react';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import ChatWidget from '../../components/ChatWidget/ChatWidget.jsx';
import './PublicLayout.css';

interface PublicLayoutProps {
    children: React.ReactNode;
}

/**
 * PublicLayout - Reusable layout wrapper for public pages
 * Includes Header, Footer, and ChatWidget automatically
 */
const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="public-main-content">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </>
    );
};

export default PublicLayout;
