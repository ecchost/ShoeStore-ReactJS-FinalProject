import React, {Component} from 'react'
import Sidebar from './common/sidebar_components/sidebar';
import Right_sidebar from './common/right-sidebar';
import Footer from './common/footer';
import {connect} from "react-redux";
import Header from './common/header_components/header';

function Layout({children}) {
    return <div>
        <div className="page-wrapper">
            <Header/>
            <div className="page-body-wrapper">
                <Sidebar/>
                <Right_sidebar/>
                <div className="page-body">
                    {children}
                </div>
                <Footer/>
            </div>
        </div>
    </div>
}

export default Layout
