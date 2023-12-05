import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const SideNav = () => {
    return (
        <>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <div class="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span class="brand-text font-weight-light">AdminLTE 3</span>
                </div>
                <div class="sidebar">
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        {/* <div class="image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                        </div> */}
                        <div class="info">
                            <a href="#" class="d-block">Alexander Pierce</a>
                        </div>
                    </div>
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li class="nav-item">
                                <NavLink to="/">
                                    <div class="nav-link">
                                        <i class="nav-icon fa fa-tachometer nav2"></i>
                                        <p className='nav2'>Dashboard</p>
                                    </div>
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <div href="#" class="nav-link">
                                    <i class="nav-icon fa fa-database nav2"></i>
                                    <p className='nav2'>
                                        Misc Entries
                                        <i class="fa fa-angle-left right"></i>
                                    </p>
                                </div>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <NavLink to="/Team">
                                            <div class="nav-link">
                                                <i class="fa fa-circle-o nav-icon"></i>
                                                <p>Team</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <NavLink to="/Categories">
                                            <div class="nav-link">
                                                <i class="fa fa-circle-o nav-icon"></i>
                                                <p>Product Categories</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <NavLink to="/Products">
                                            <div class="nav-link">
                                                <i class="fa fa-circle-o nav-icon"></i>
                                                <p>Products</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <div href="#" class="nav-link">
                                    <i class="nav-icon fa fa-user nav2"></i>
                                    <p className='nav2'>
                                        Users
                                        <i class="fa fa-angle-left right"></i>
                                    </p>
                                </div>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <NavLink to="/Customers">
                                            <div class="nav-link">
                                                <i class="fa fa-circle-o nav-icon"></i>
                                                <p>Customers</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <div href="#" class="nav-link">
                                    <i class="nav-icon fa fa-credit-card nav2"></i>
                                    <p className='nav2'>
                                        Certificates
                                        <i class="fa fa-angle-left right"></i>
                                    </p>
                                </div>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <NavLink to="/AlotCertificate">
                                            <div class="nav-link">
                                                <i class="fa fa-circle-o nav-icon"></i>
                                                <p>Alot Certificate</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink to="/AllCertificates">
                                            <div class="nav-link">
                                                <i class="fa fa-circle-o nav-icon"></i>
                                                <p>All Certificates</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/Logout">
                                    <div class="nav-link">
                                        <i class="nav-icon fa fa-sign-out nav2"></i>
                                        <p className='nav2'>Logout</p>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default SideNav
