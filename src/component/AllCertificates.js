import React, { useState, useEffect, useRef } from 'react'
import Header from './layout/Header'
import SideNav from './layout/SideNav'
import Footer from './layout/Footer'
import { useNavigate } from 'react-router-dom'

const AllCertificates = () => {

    const newWindow = useRef(window)
    const navigate = useNavigate()
    const [certificateList, setCertificateList] = useState([])
    const [id, setId] = useState("")
    const [searchCertificate, setSearchCertificate] = useState("")
    const [searchCustomer, setSearchCustomer] = useState("")
    const [searchingText, setSearchingText] = useState(false)
    const [customerList, setCustomerList] = useState([])

    useEffect(async () => {
        window.scrollTo(0, 0);
        cerList()
    }, [])

    async function cerList() {
        let cusRes = await fetch(window.api + "allCertificates")
        cusRes = await cusRes.json()
        // setCertificateList(cusRes.allCertificate)
        setCustomerList(cusRes.customers)
    }

    async function dellCertificate(value) {
        setId(value)
        let delRes = await fetch(window.api + "delCertificate/" + value)
        delRes = await delRes.json()
        if (delRes.success) {
            cerList()
            setId("")
        }
    }

    async function editCertificate(editId, cerId) {
        window.sessionStorage.setItem("editId", editId)
        window.sessionStorage.setItem("cerId", cerId)
        window.open('/#/AlotCertificate', "_blank")

        // navigate('/AlotCertificate', '_blank')
    }

    async function searchByCustomer(value) {
        setSearchingText(true)
        setSearchCustomer(value)
        let searchRes = await fetch(window.api+"searchByCustomer/"+value)
        searchRes = await searchRes.json()
        setCertificateList(searchRes)
        setSearchingText(false)
    }

    async function searchByCertificate(value) {

        setSearchingText(true)
        setSearchCertificate(value)
        let searchRes = await fetch(window.api+"searchByCertificate/"+value)

        searchRes = await searchRes.json()
        setCertificateList(searchRes)
        setSearchingText(false)
    }



    return (
        <>
            <div className="wrapper">
                <Header />
                <SideNav />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">All Certificates</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">All Certificates</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className='row'>
                                                        <div className='col-sm-2'>
                                                            <h3 className="card-title">All Certificates</h3>
                                                        </div>
                                                        <div className='col-sm-3 p-0'>
                                                            <select value={searchCustomer} onChange={(e) => searchByCustomer(e.target.value)} className='form-control form-control-sm'>
                                                                <option value="">--Select Client--</option>
                                                                {Object.keys(customerList).length > 0 ? customerList.map(c => (
                                                                    <option value={c.id}>{c.name}</option>
                                                                )) : <></>}
                                                            </select>
                                                        </div>
                                                        <div className='col-sm-2'>
                                                            <center>
                                                                
                                                                    {
                                                                        (searchingText) ?
                                                                            <>
                                                                                <p>Loading.....</p>
                                                                            </> :
                                                                            <>
                                                                               <p>OR</p> 
                                                                            </>
                                                                    }
                                                                
                                                            </center>
                                                        </div>
                                                        <div className='col-sm-3'>
                                                            <input type={'text'} placeholder='Search by Certificate' value={searchCertificate} onChange={(e) => searchByCertificate(e.target.value)} className='form-control form-control-sm' />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-sm">
                                                        <thead>
                                                            <tr>
                                                                <th>Dawn Datasheet</th>
                                                                <th>Customer/Address</th>
                                                                <th>Certificate</th>
                                                                <th>Equipment</th>
                                                                <th>Delete</th>
                                                                <th>Edit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(certificateList).length > 0 ? certificateList.map(c => (
                                                                <tr>
                                                                    <td>{c.certificate.dawn_data_sheet}</td>
                                                                    <td>{(c.users !== null) ? <>{c.users.name}<br />{c.users.address}</> : <></>}</td>
                                                                    <td>{c.certificate.c_certificate}</td>
                                                                    <td>{c.certificate.equipment}</td>
                                                                    <td>
                                                                        {
                                                                            (c.certificate.id === id) ?
                                                                                <>
                                                                                    <i style={{ color: 'red' }}>Deleting..</i>
                                                                                </> :
                                                                                <>
                                                                                    <i onClick={() => dellCertificate(c.certificate.id)} style={{ color: 'red' }}>Delete</i>
                                                                                </>
                                                                        }

                                                                    </td>
                                                                    <td>
                                                                        <i onClick={() => editCertificate(c.certificate.id, c.certificate.cer_id)} style={{ color: 'blue' }}>Edit</i>
                                                                    </td>
                                                                </tr>
                                                            )) :
                                                                <></>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <aside className="control-sidebar control-sidebar-dark"></aside>
                <Footer />
            </div>
        </>
    )
}

export default AllCertificates
