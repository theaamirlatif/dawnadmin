import React, { useState, useEffect } from 'react'
import Header from './layout/Header'
import SideNav from './layout/SideNav'
import Footer from './layout/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!window.sessionStorage.getItem("id")) {
            navigate("/Login")
        }
    }, [])

    return (
        <>

            <div class="wrapper">
                <Header />
                <SideNav />
                <div class="content-wrapper">
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-6">
                                    <h1 class="m-0">Dashboard</h1>
                                </div>
                                <div class="col-sm-6">
                                    <ol class="breadcrumb float-sm-right">
                                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                                        <li class="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-header border-0">
                                            <h3 class="card-title">Online Admin Overview</h3>
                                            
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
                                                <p class="text-success text-xl">
                                                    <i class="ion ion-ios-refresh-empty"></i>
                                                </p>
                                                <p class="d-flex flex-column text-right">
                                                    <span class="font-weight-bold">
                                                        <i class="ion ion-android-arrow-up text-success"></i> 12%
                                                    </span>
                                                    <span class="text-muted">CONVERSION RATE</span>
                                                </p>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
                                                <p class="text-warning text-xl">
                                                    <i class="ion ion-ios-cart-outline"></i>
                                                </p>
                                                <p class="d-flex flex-column text-right">
                                                    <span class="font-weight-bold">
                                                        <i class="ion ion-android-arrow-up text-warning"></i> 0.8%
                                                    </span>
                                                    <span class="text-muted">SALES RATE</span>
                                                </p>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center mb-0">
                                                <p class="text-danger text-xl">
                                                    <i class="ion ion-ios-people-outline"></i>
                                                </p>
                                                <p class="d-flex flex-column text-right">
                                                    <span class="font-weight-bold">
                                                        <i class="ion ion-android-arrow-down text-danger"></i> 1%
                                                    </span>
                                                    <span class="text-muted">REGISTRATION RATE</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <aside class="control-sidebar control-sidebar-dark"></aside>
                <Footer />
            </div>

        </>
    )
}

export default Home
