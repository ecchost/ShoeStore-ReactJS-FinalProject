import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import UserPanel from './UserPanel';

import Menu from './Menus'
import {Link} from 'react-router-dom';

import logo from '../../assets/images/dashboard/multikart-logo.png'

export class Sidebar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedPath: "1",
            menus: Menu
        }
    }

    onItemSelection = (arg) => {
        this.setState({selectedPath: arg.path});
    };

    componentDidMount(){
        var currentUrl = window.location.pathname;

        this.state.menus.filter(items => {
            if (!items.children) {
                if (items.path === currentUrl)
                    this.setNavActive(items)
                return false
            }
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    this.setNavActive(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl)
                        this.setNavActive(subSubItems)
                })
            })
        })
    }

    setNavActive(item) {

        Menu.filter(menuItem => {
            if (menuItem !== item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems !== item) {
                        submenuItems.active = false
                    }
                    if (submenuItems.children) {
                        submenuItems.children.map(childItem => {
                            childItem.active = false;
                        })
                        if (submenuItems.children.includes(item)) {
                            submenuItems.active = true
                            menuItem.active = true
                        }
                    }
                })
            }
        })
        item.active = !item.active

        this.setState({
            menus: Menu
        })
    }

    render() {

        const menus = this.state.menus.map((menuItem, i) =>
            <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                {(menuItem.sidebartitle) ?
                    <div className="sidebar-title">{menuItem.sidebartitle}</div>
                    : ''}
                {(menuItem.type === 'sub') ?
                    <Link className="sidebar-header " to="#" onClick={() => this.setNavActive(menuItem)}>
                        <menuItem.icon/>
                        <span>{menuItem.title}</span>
                        <i className="fa fa-angle-right pull-right"/>
                    </Link>
                    : ''}
                {(menuItem.type === 'link') ?
                    <Link
                        to={`${menuItem.path}`}
                        className={`sidebar-header ${menuItem.active ? 'active' : ''}`}

                        onClick={() => this.setNavActive(menuItem)}
                    >
                        <menuItem.icon/>
                        <span>{menuItem.title}</span>
                        {menuItem.children ?
                            <i className="fa fa-angle-right pull-right"/> : ''}
                    </Link>
                    : ''}
                {menuItem.children ?
                    <ul
                        className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                        style={menuItem.active ? {opacity: 1, transition: 'opacity 500ms ease-in'} : {}}
                    >
                        {menuItem.children.map((childrenItem, index) =>
                            <li key={index}
                                className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                                {(childrenItem.type === 'sub') ?
                                    <Link to="#" onClick={() => this.setNavActive(childrenItem)}>
                                        <i className="fa fa-circle"/>{childrenItem.title} <i
                                        className="fa fa-angle-right pull-right"/></Link>
                                    : ''}

                                {(childrenItem.type === 'link') ?
                                    <Link
                                        to={`${childrenItem.path}`}
                                        className={childrenItem.active ? 'active' : ''}
                                        onClick={() => this.setNavActive(childrenItem)}
                                    >
                                        <i className="fa fa-circle"/>{childrenItem.title} </Link>
                                    : ''}
                                {childrenItem.children ?
                                    <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                                        {childrenItem.children.map((childrenSubItem, key) =>
                                            <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                                                {(childrenSubItem.type === 'link') ?
                                                    <Link
                                                        to={`${childrenSubItem.path}`}
                                                        className={childrenSubItem.active ? 'active' : ''}
                                                        onClick={() => this.setNavActive(childrenSubItem)}
                                                    >
                                                        <i className="fa fa-circle"/>{childrenSubItem.title}</Link>
                                                    : ''}
                                            </li>
                                        )}
                                    </ul>
                                    : ''}
                            </li>
                        )}
                    </ul>
                    : ''}
            </li>
        )

        return (
            <Fragment>
                <div className="page-sidebar">
                    <div className="main-header-left d-none d-lg-block">
                        <div className="logo-wrapper">
                            <Link to={`/dashboard`}>
                                <img className="blur-up lazyloaded" src={logo} alt=""/>
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar custom-scrollbar">
                        <UserPanel/>
                        <ul className="sidebar-menu">
                            {menus}
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(Sidebar)
