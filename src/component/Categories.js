import React, { useState, useEffect } from 'react'
import Header from './layout/Header'
import SideNav from './layout/SideNav'
import Footer from './layout/Footer'
import "./layout/css/style.css"

const Categories = () => {

    const [id, setId] = useState("")
    const [pName, setPName] = useState("")
    const [buttonText, setButtonText] = useState("Save")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [catList, setCatList] = useState([])

    useEffect(async () => {
        window.scrollTo(0, 0);
        getCategory()
    }, [])

    async function getCategory(){
        let catRes = await fetch(window.api+"categoryList")
        catRes = await catRes.json()
        setCatList(catRes)
    }

    async function addCategory() {
        setButtonText("Saving...")
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', pName)

        let result = await fetch(window.api + "addCategory", {
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
            setSuccess(true)
            setError(false)
            setPName('')
            setId('')
            getCategory()
            window.scrollTo(0, 0)
        }
    }

    function updateCategory(id, name) {
        setId(id)
        setPName(name)
        setButtonText("Update")
    }

    async function delCategory(id){
        let delRes = await fetch(window.api+"delCategory/"+id)
        delRes = await delRes.json()
        getCategory()
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
                                    <h1 className="m-0">Categories</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Product Categories</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Add Category</h3>
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
                                                    Name Already Saved..
                                                </div> :
                                                <></>
                                            }
                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <div className="form-group">
                                                        <label>Product Category Name</label>
                                                        <input type="text" value={pName} onChange={(e) => setPName(e.target.value)} className="form-control" placeholder="Enter Name" />
                                                    </div>
                                                </div>
                                                <button type="submit" onClick={addCategory} className="btn btn-primary" disabled={
                                                    !pName
                                                }>{buttonText}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-8'>
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">All Product Categories</h3>
                                        </div>

                                        <div className="card-body p-0">
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(catList).length > 0 ? catList.map(c => (
                                                        <tr>
                                                            <td>{c.name}</td>
                                                            <td>
                                                                <i onClick={() => updateCategory(c.id, c.name)} class="fas fa-user-edit" title='Edit user'></i>
                                                            </td>
                                                            <td>
                                                                <i onClick={() => delCategory(c.id)} class="fas fa-trash-alt" title='Delete Team'></i>
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

export default Categories
