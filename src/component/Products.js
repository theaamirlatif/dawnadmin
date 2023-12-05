import React, { useState, useEffect, Component } from 'react'
import Header from './layout/Header'
import SideNav from './layout/SideNav'
import Footer from './layout/Footer'
import "./layout/css/style.css"


const Products = () => {
    const [cId, setId] = useState("")
    const [category, setCategory] = useState("")
    const [pName, setPName] = useState("")
    const [model, setModel] = useState("")
    const [image, setImage] = useState("")
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [description, setDescription] = useState("")
    const [buttonText, setButtonText] = useState("Save")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [productList, setProductList] = useState([])
    const [catList, setCatList] = useState([])


    useEffect(async () => {
        window.scrollTo(0, 0);
        getCategories()
    }, [])

    async function getCategories() {
        let catRes = await fetch(window.api + "categoryList")
        catRes = await catRes.json()
        setCatList(catRes)
    }

    async function getProducts(mainId) {
        setCategory(mainId)
        let proRes = await fetch(window.api + "productList/" + mainId)
        proRes = await proRes.json()
        setProductList(proRes)
        console.warn(proRes)
    }

    const handleImage = (file) => {
        setImage(file[0])
    }

    const handleImage1 = (file) => {
        setImage1(file[0])
    }

    const handleImage2 = (file) => {
        setImage2(file[0])
    }

    async function addProduct() {
        setButtonText("Saving...")
        const formData = new FormData()
        formData.append('id', cId)
        formData.append('category', category)
        formData.append('name', pName)
        formData.append('model', model)
        formData.append('image', image)
        formData.append('image1', image1)
        formData.append('image2', image2)
        formData.append('description', description)

        let result = await fetch(window.api + "addProduct", {
            method: 'POST',
            body: formData

        })
        result = await result.json()

        if (result.already) {
            setButtonText("Save")
            setSuccess(false)
            setError(true)
            window.scrollTo(0, 0)
        } else if (result.success) {
            setButtonText("Save")
            setError(false)
            setSuccess(true)
            setPName('')
            setModel('')
            setImage('')
            setImage1('')
            setImage2('')
            setDescription('')
            getCategories()
            getProducts(category)
            window.scrollTo(0, 0)
        }
    }

    function updateProduct(id, name, model, description) {
        setId(id)
        setPName(name)
        setModel(model)
        setDescription(description)
        setButtonText("Update")
    }

    async function delCustomer(id) {
        let delRes = await fetch(window.api + "delProduct/" + id)
        delRes = await delRes.json()
        setProductList([])
        setCategory('')
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
                                    <h1 className="m-0">Products</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Products Detail</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className='col-sm-12'>
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">All Products</h3>
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
                                                <div className='col-sm-3'>
                                                    <div className="form-group">
                                                        <label>Main Category</label>
                                                        <select value={category} onChange={(e) => getProducts(e.target.value)} className='form-control'>
                                                            <option value=''>--Select Category--</option>
                                                            {Object.keys(catList).length > 0 ? catList.map(c => (
                                                                <option value={c.id}>{c.name}</option>
                                                            )) :
                                                                <></>
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='col-sm-3'>
                                                    <div className="form-group">
                                                        <label>Enter Product Name </label>
                                                        <input type="text" value={pName} onChange={(e) => setPName(e.target.value)} className="form-control" placeholder="Enter Product Name" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-3'>
                                                    <div className="form-group">
                                                        <label>Enter Model</label>
                                                        <input type="email" value={model} onChange={(e) => setModel(e.target.value)} className="form-control" placeholder="Enter Model" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-3'>
                                                    <div className="form-group">
                                                        <label>Select First Image</label>
                                                        <input type="file" onChange={e => handleImage(e.target.files)} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-3'>
                                                    <div className="form-group">
                                                        <label>Select Second Image</label>
                                                        <input type="file" onChange={e => handleImage1(e.target.files)} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className='col-sm-3'>
                                                    <div className="form-group">
                                                        <label>Select Certificate Image</label>
                                                        <input type="file" onChange={e => handleImage2(e.target.files)} className="form-control" />
                                                    </div>
                                                </div>
                                                
                                                <div className='col-sm-3'>
                                               
                                                    <button type="submit" onClick={addProduct} className="btn btn-primary" disabled={
                                                        !category
                                                        || !pName
                                                        || !model
                                                        || !image
                                                        || !image1
                                                        || !image2
                                               
                                                    }>{buttonText}</button>
                                                </div>
                                            </div>
                                            <hr />
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name / Model</th>
                                                        <th>Description</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(productList).length > 0 ? productList.map(p => (
                                                        <tr>
                                                            <td><img src={window.storage + p.image} width={'50px'} height={'50px'} style={{ borderRadius: '40px' }} /></td>
                                                            <td>{p.name}<br /><i style={{ color: '#007BFF' }}>{p.model}</i></td>
                                                            <td>{p.description}</td>
                                                            <td>
                                                                <i onClick={() => updateProduct(p.id, p.name, p.model, p.description)} class="fas fa-user-edit" title='Edit Product'></i><br />
                                                                <i onClick={() => delCustomer(p.id)} class="fas fa-trash-alt" title='Delete Product'></i>
                                                            </td>
                                                        </tr>
                                                    )) :
                                                        <><p style={{ color: 'red' }}>Please Select Main Category...</p></>
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

export default Products;
