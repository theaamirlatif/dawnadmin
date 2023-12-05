import React, { useState, useEffect } from 'react'

const CertificateFive = () => {

    const editId = window.sessionStorage.getItem("editId")
    const cerId = window.sessionStorage.getItem("cerId")

    var curr = new Date()
    var date = curr.toISOString().substr(0, 10)

    var currto = new Date()
    currto.setDate(currto.getDate() + 365)
    var todate = currto.toISOString().substr(0, 10)

    const [buttonText, setButtonText] = useState("Save")
    const [cCertificate, setCCertificate] = useState("EG/HPLC-I-9879")
    const [dawnDataSheet, setDawnDataSheet] = useState("")
    const [equipment, setEquipment] = useState("HPLC Injector")
    const [section, setSection] = useState("QC. Lab. (Instrument Room)")
    const [model, setModel] = useState("N/A")
    const [labTemp, setLabTemp] = useState("25°C")
    const [instrId, setInstrId] = useState("EG/QC/EQP/10")
    const [labHumidity, setlabHumidity] = useState("50% RH")
    const [manufacturer, setManufacturer] = useState("WUFING")
    const [calibDate, setCalibDate] = useState(date)
    const [client, setClient] = useState("")
    const [nextCalib, setNextCalib] = useState(todate)
    const [issueDate, setIssueDate] = useState(date)
    const [relativeStandardDeviation, setRelativeStandardDeviation] = useState("0.05%, (Limit 2%)")
    const [traceMeasure, setTraceMeasure] = useState("The HPLC Injector has been calibrated against Pre-calibrated set of dead weight, Model/Make: China/M1, that is traceable to the certificate number APCIC/MF (260); ILO # 425/10.06.21, PCSIR which in turns traceable to Procedure # LLC/APCIC/MCP/01, Cal.Lab-M24, Report # CC-10687 NPSL Pakistan")
    const [volume, setVolume] = useState([{ volume: "", tolerance: "", results: "" }])
    const [customerList, setCustomerList] = useState([])

    useEffect(async () => {
        window.scrollTo(0, 0);
        let cusRes = await fetch(window.api + "getCertificateData/" + editId + "/" + cerId)
        cusRes = await cusRes.json()
        setCustomerList(cusRes.customers)
        setCCertificate(cusRes.certificateData.c_certificate)
        setDawnDataSheet(cusRes.certificateData.dawn_data_sheet)
        setEquipment(cusRes.certificateData.equipment)
        setSection(cusRes.certificateData.section)
        setModel(cusRes.certificateData.model)
        setLabTemp(cusRes.certificateData.lab_temp)
        setInstrId(cusRes.certificateData.instr_id)
        setlabHumidity(cusRes.certificateData.lab_humidity)
        setManufacturer(cusRes.certificateData.manufacturer)
        setCalibDate(cusRes.certificateData.calib_date)
        setClient(cusRes.certificateData.user_id)
        setNextCalib(cusRes.certificateData.next_calib)
        setIssueDate(cusRes.certificateData.issue_date)
        setRelativeStandardDeviation(cusRes.certificateData.relative_standard_deviation)
        setTraceMeasure(cusRes.certificateData.trace_measure)
        setVolume(cusRes.parameter1)
    }, [])



    // handle input change
    const handleInputChangeV = (e, index) => {
        const { name, value } = e.target
        const list = [...volume]
        list[index][name] = value
        setVolume(list)
    }

    // handle click event of the Remove button
    const handleRemoveClickV = index => {
        const list = [...volume]
        list.splice(index, 1)
        setVolume(list)
    }

    // handle click event of the Add button
    const handleAddClickV = () => {
        setVolume([...volume, { volume: "", tolerance: "", results: "" }])
    }

    async function Submit() {
        setButtonText("Saving")

        const formData = new FormData()
        formData.append('edit_id', editId)
        formData.append('cer_id', 5)
        formData.append('user_id', client)
        formData.append('c_certificate', cCertificate)
        formData.append('dawn_data_sheet', dawnDataSheet)
        formData.append('equipment', equipment)
        formData.append('section', section)
        formData.append('model', model)
        formData.append('lab_temp', labTemp)
        formData.append('instr_id', instrId)
        formData.append('lab_humidity', labHumidity)
        formData.append('manufacturer', manufacturer)
        formData.append('calib_date', calibDate)
        formData.append('next_calib', nextCalib)
        formData.append('issue_date', issueDate)
        formData.append('volume_parameter', JSON.stringify(volume))
        formData.append('relative_standard_deviation', relativeStandardDeviation)
        formData.append('trace_measure', traceMeasure)

        let result = await fetch(window.api + "addFiveCertificate", {
            method: 'POST',
            body: formData
        });
        result = await result.json()

        if (result.success) {
            setButtonText("Saved Successfully")
            sessionStorage.removeItem('editId')
            sessionStorage.removeItem('cerId')
        }
    }
    return (
        <>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Add Certificate Details</h3>
                </div>
                <div className="card-body">

                    <label>Main Entries:</label>

                    <div className='row'>
                        <div className='col-sm-3'>
                            <label>Certificate #:</label>
                            <input type='text' value={cCertificate} onChange={(e) => setCCertificate(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Dawn Data Sheet No.:</label>
                            <input type='text' value={dawnDataSheet} onChange={(e) => setDawnDataSheet(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Equipment:</label>
                            <input type='text' value={equipment} onChange={(e) => setEquipment(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Section:</label>
                            <input type='text' value={section} onChange={(e) => setSection(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Model/Type: </label>
                            <input type='text' value={model} onChange={(e) => setModel(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Laboratory Temperature: </label>
                            <input type='text' value={labTemp} onChange={(e) => setLabTemp(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Instrument ID: </label>
                            <input type='text' value={instrId} onChange={(e) => setInstrId(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Laboratory Humidity: </label>
                            <input type='text' value={labHumidity} onChange={(e) => setlabHumidity(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Manufacturer: </label>
                            <input type='text' value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Issue Date:</label>
                            <input type='date' value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Calibrated Date:</label>
                            <input type='date' value={calibDate} onChange={(e) => setCalibDate(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Client:</label>
                            <select value={client} onChange={(e) => setClient(e.target.value)} className='form-control form-control-sm'>
                                <option value="">--Select Client--</option>
                                {Object.keys(customerList).length > 0 ? customerList.map(c => (
                                    <option value={c.id}>{c.name}({c.address})</option>
                                )) : <></>}
                            </select>
                        </div>
                        <div className='col-sm-3'>
                            <label>Next Calibration Date:</label>
                            <input type='date' value={nextCalib} onChange={(e) => setNextCalib(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <hr />
                    <label>Volume:</label>

                    <br />
                    <div className='row'>
                        <div className='col-sm-4'>
                            <center>
                                <label>Injection Volume</label>
                            </center>
                        </div>
                        <div className='col-sm-4'>
                            <center>
                                <label>Peak Area</label>
                            </center>
                        </div>
                        <div className='col-sm-4'>
                            <label>Results</label>
                        </div>

                    </div>
                    {volume.map((x, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="volume" className='form-control form-control-sm' value={x.volume} onChange={e => handleInputChangeV(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="tolerance" className='form-control form-control-sm' value={x.tolerance} onChange={e => handleInputChangeV(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="results" className='form-control form-control-sm' value={x.results} onChange={e => handleInputChangeV(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {volume.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClickV(i)}></i>}
                                        {volume.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClickV}></i>}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                    <hr />
                    <div className='col-sm-3'>
                        <label>Relative Standard Deviation: </label>
                        <input type='text' value={relativeStandardDeviation} onChange={(e) => setRelativeStandardDeviation(e.target.value)} className='form-control form-control-sm' />
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <lable><b>Traceability of Measurements:</b></lable>
                            <textarea className='form-control' value={traceMeasure} onChange={(e) => setTraceMeasure(e.target.value)}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button
                        style={{ float: 'right' }}
                        onClick={Submit}
                        disabled={
                            !client || !cCertificate || !dawnDataSheet || !equipment || !section || !model || !labTemp || !instrId || !labHumidity || !manufacturer
                            || !calibDate || !nextCalib
                        }
                        className="btn btn-success"
                    >{buttonText}</button>
                </div>
            </div>
        </>
    )
}

export default CertificateFive
