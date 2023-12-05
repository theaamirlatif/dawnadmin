import React, { useState, useEffect } from 'react'
import Header from './layout/Header'
import SideNav from './layout/SideNav'
import Footer from './layout/Footer'
import "./layout/css/style.css"

const Customers = () => {

    const [cId, setId] = useState("")
    const [cName, setCName] = useState("")
    const [cMobile, setCMobile] = useState("")
    const [cAddress, setCAddress] = useState("")
    const [cEmail, setCEmail] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [buttonText, setButtonText] = useState("Save")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [customerList, setCustomerList] = useState([])


    useEffect(async () => {
        window.scrollTo(0, 0);
        getCustomer()
    }, [])

    async function getCustomer(){
        let cusRes = await fetch(window.api + "customerList")
        cusRes = await cusRes.json()
        setCustomerList(cusRes)
    }


    async function addCustomer() {
        setButtonText("Saving...")
        const formData = new FormData()
        formData.append('id', cId)
        formData.append('name', cName)
        formData.append('mobile', cMobile)
        formData.append('address', cAddress)
        formData.append('email', cEmail)
        formData.append('password', cPassword)

        let result = await fetch(window.api + "addCustomer", {
            method: 'POST',
            body: formData

        })
        result = await result.json()

        if (result.already) {
            setButtonText("Save")
            setSuccess(false)
            setError(true)
            window.scrollTo(0, 0)
        }
        else if (result.success) {
            setButtonText("Save")
            setError(false)
            setSuccess(true)
            setCName('')
            setCMobile('')
            setCAddress('')
            setCEmail('')
            setCPassword('')
            getCustomer()
            window.scrollTo(0, 0)
        }
    }

    function updateCustomer(id, name, mobile, address, email, password) {
        setId(id)
        setCName(name)
        setCMobile(mobile)
        setCAddress(address)
        setCEmail(email)
        setCPassword(password)
        setButtonText("Update")
    }

    async function delCustomer(id){
        let delRes = await fetch(window.api+"delCustomer/"+id)
        delRes = await delRes.json()
        getCustomer()
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
                                    <h1 className="m-0">Customers</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Customers</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Add Customer</h3>
                                        </div>
                                        <div className="card-body">
                                            {success ?
                                                <div className="alert alert-success alert-dismissible">
                                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                    Done Successfully..
                                                </div> :
                                                <></>
                                            }
                                            {error ?
                                                <div className="alert alert-danger alert-dismissible">
                                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                    <h5><i className="icon fas fa-ban"></i> Alert!</h5>
                                                    Email already registered..
                                                </div> :
                                                <></>
                                            }
                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <div className="form-group">
                                                        <label>Enter Customer Name</label>
                                                        <input type="text" value={cName} onChange={(e) => setCName(e.target.value)} className="form-control" placeholder="Enter Customer Name" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12'>
                                                    <div className="form-group">
                                                        <label>Enter Customer Mobile </label>
                                                        <input type="number" value={cMobile} onChange={(e) => setCMobile(e.target.value)} className="form-control" placeholder="Enter Customer Mobile" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12'>
                                                    <div className="form-group">
                                                        <label>Enter Customer Email</label>
                                                        <input type="email" value={cEmail} onChange={(e) => setCEmail(e.target.value)} className="form-control" placeholder="Enter Email" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12'>
                                                    <div className="form-group">
                                                        <label>Enter Password</label>
                                                        <input type="password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} className="form-control" placeholder="Password" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12'>
                                                    <div className="form-group">
                                                        <label>Enter Customer Address</label>
                                                        <textarea value={cAddress} onChange={(e) => setCAddress(e.target.value)} className='form-control' placeholder='Enter Address'>
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <button type="submit" onClick={addCustomer} className="btn btn-primary" disabled={
                                                    !cName
                                                    || !cMobile
                                                    || !cEmail
                                                    || !cPassword
                                                    || !cAddress
                                                }>{buttonText}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-9'>
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">All Customers</h3>
                                        </div>

                                        <div className="card-body p-0">
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Name / Address</th>
                                                        <th>Mobile</th>
                                                        <th>Email / Password</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(customerList).length > 0 ? customerList.map(c => (
                                                        <tr>
                                                            <td>{c.name}<br /><span style={{ fontSize: '13px' }}>{c.address}</span></td>
                                                            <td>{c.mobile}</td>
                                                            <td>{c.email}<br /><span style={{ color: 'red' }}>{c.password}</span></td>
                                                            <td>
                                                                <i onClick={() => updateCustomer(c.id, c.name, c.mobile, c.address, c.email, c.password)} class="fas fa-user-edit" title='Edit user'></i>
                                                            </td>
                                                            <td>
                                                                <i onClick={() => delCustomer(c.id)} class="fas fa-trash-alt" title='Delete User'></i>
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
                <aside className="control-sidebar control-sidebar-dark"></aside>
                <Footer />
            </div>
        </>
    )
}

export default Customers
