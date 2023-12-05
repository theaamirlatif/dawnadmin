import React, { useState, useEffect } from 'react'
import Header from './layout/Header'
import SideNav from './layout/SideNav'
import Footer from './layout/Footer'
import "./layout/css/style.css"

const Team = () => {

    const [id, setId] = useState("")
    const [tName, setTName] = useState("")
    const [tDesignation, setTDesignation] = useState("")
    const [image, setImage] = useState("")
    const [buttonText, setButtonText] = useState("Save")
    const [success, setSuccess] = useState("")
    const [teamList, setTeamList] = useState([])

    useEffect(async () => {
        window.scrollTo(0, 0);
        getTeam()
    }, [])

    async function getTeam(){
        let teamRes = await fetch(window.api + "teamList")
        teamRes = await teamRes.json()
        setTeamList(teamRes)
    }

    const handleImage = (file) => {
        setImage(file[0])
    }

    async function addTeam() {
        setButtonText("Saving...")
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', tName)
        formData.append('designation', tDesignation)
        formData.append('image', image)

        let result = await fetch(window.api + "addTeam", {
            method: 'POST',
            body: formData

        })
        result = await result.json()
        if (result.success) {
            setButtonText("Save")
            setSuccess(true)
            setTName('')
            setTDesignation('')
            setImage('')
            setId('')
            getTeam()
            window.scrollTo(0, 0)
        }
    }

    function updateTeam(id, name, designation) {
        setId(id)
        setTName(name)
        setTDesignation(designation)
        setButtonText("Update")
    }

    async function delTeam(id){
        let delRes = await fetch(window.api+"delTeam/"+id)
        delRes = await delRes.json()
        getTeam()
    }
    return(
    <>
        <div className="wrapper">
            <Header />
            <SideNav />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Team</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">All Team</li>
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
                                        <h3 className="card-title">Add Team Member</h3>
                                    </div>
                                    <div className="card-body">
                                        {success ?
                                            <div className="alert alert-success alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                Done Successfully..
                                            </div> :
                                            <></>
                                        }
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className="form-group">
                                                    <label>Team Member Name</label>
                                                    <input type="text" value={tName} onChange={(e) => setTName(e.target.value)} className="form-control" placeholder="Enter Name" />
                                                </div>
                                            </div>
                                            <div className='col-sm-12'>
                                                <div className="form-group">
                                                    <label>Team Member Designation</label>
                                                    <input type="text" value={tDesignation} onChange={(e) => setTDesignation(e.target.value)} className="form-control" placeholder="Enter Designation" />
                                                </div>
                                            </div>
                                            <div className='col-sm-12'>
                                                <div className="form-group">
                                                    <label>Team Member Image</label>
                                                    <input type="file" onChange={e => handleImage(e.target.files)} className="form-control" />
                                                </div>
                                            </div>
                                            <button type="submit" onClick={addTeam} className="btn btn-primary" disabled={
                                                !tName
                                                || !tDesignation
                                            }>{buttonText}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-9'>
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">All Team Members</h3>
                                    </div>

                                    <div className="card-body p-0">
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Designation</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(teamList).length > 0 ? teamList.map(t => (
                                                    <tr>
                                                        <td><img src={window.storage + t.image} width={'40px'} style={{ borderRadius: '40px' }} /></td>
                                                        <td>{t.name}</td>
                                                        <td>{t.designation}</td>
                                                        <td>
                                                            <i onClick={() => updateTeam(t.id, t.name, t.designation)} class="fas fa-user-edit" title='Edit user'></i>
                                                        </td>
                                                        <td>
                                                            <i onClick={() => delTeam(t.id)} class="fas fa-trash-alt" title='Delete Team'></i>
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
};

export default Team;
