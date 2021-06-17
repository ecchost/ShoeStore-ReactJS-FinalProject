import React from 'react'

import Sidebar from '../commons/sidebar/Sidebar';
import Footer from '../commons/footer/Footer';
import Header from '../commons/header/Header';

function ProtectedLayout({children}) {
    return <div>
        <div className="page-wrapper">
            <Header/>
            <div className="page-body-wrapper">
                <Sidebar/>
                <div className="page-body">
                    {children}
                </div>
                <Footer/>
            </div>
        </div>
    </div>
}

export default ProtectedLayout
