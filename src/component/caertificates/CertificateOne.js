import React, { useState, useEffect } from 'react'

const CertificateOne = () => {

    const editId = window.sessionStorage.getItem("editId")
    const cerId = window.sessionStorage.getItem("cerId")

    var curr = new Date()
    var date = curr.toISOString().substr(0, 10)

    var currto = new Date()
    currto.setDate(currto.getDate() + 365)
    var todate = currto.toISOString().substr(0, 10)

    const [buttonText, setButtonText] = useState("Save")
    const [cCertificate, setCCertificate] = useState("EG/UV - 9868")
    const [dawnDataSheet, setDawnDataSheet] = useState("")
    const [equipment, setEquipment] = useState("UV-VIS Spectrophotometer")
    const [section, setSection] = useState("Q.C Lab. (Instrument Room)")
    const [model, setModel] = useState("UV2300 II")
    const [labTemp, setLabTemp] = useState("25°C")
    const [instrId, setInstrId] = useState("EG/QC/EQP/07")
    const [labHumidity, setlabHumidity] = useState("50% RH")
    const [manufacturer, setManufacturer] = useState("DAWN")
    const [calibDate, setCalibDate] = useState(date)
    const [client, setClient] = useState("")
    const [nextCalib, setNextCalib] = useState(todate)
    const [issueDate, setIssueDate] = useState(date)
    const [phRange, setPhRange] = useState("")
    const [phResolution, setPhResolution] = useState("")
    const [strayLight, setStrayLight] = useState("")
    const [resolution, setResolution] = useState("")
    const [cell, setCell] = useState("")
    const [image, setImage] = useState("")
    // const [leakOb, setLeakOb] = useState("")
    // const [acOb, setAcOb] = useState("")
    // const [repOb, setRepOb] = useState("")
    // const [phOb, setPhOb] = useState("")
    // const [stOb, setStOb] = useState("")
    // const [resOb, setResOb] = useState("")
    // const [cellOb, setCellOb] = useState("")
    // const [comOb, setComOb] = useState("")
    // const [leakCri, setLeakCri] = useState("")
    // const [acCri, setAcCri] = useState("")
    // const [repCri, setRepCri] = useState("")
    // const [phCri, setPhCri] = useState("")
    // const [stCri, setStCri] = useState("")
    // const [resCri, setResCri] = useState("")
    // const [cellCri, setCellCri] = useState("")
    // const [comCri, setComCri] = useState("")
    const [traceMeasure, setTraceMeasure] = useState("The UV-VIS Spectrophotometer has been calibrated against (Toluene, Hexane, KCL, K2Cr2O7, Holmium Oxide) Standard solutions & certified reference materials, which are traceable to NIST (USA) and BAM Germany.Standard British Pharmacopoeial (2022) calibration procedure was adopted.")
    const [photoMetric, setPhotoMetric] = useState([{ waveLength: "", appliedValue: "", observedValue: "", tolerance: "" }])
    const [waveLengthWList, setWaveLengthWList] = useState([{ waveLengthW: "", observedW: "", toleranceW: "", deviationW: "" }])
    const [customerList, setCustomerList] = useState([])

    useEffect(async () => {
        window.scrollTo(0, 0)
        let cusRes = await fetch(window.api+"getCertificateData/"+editId+"/"+cerId)
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
        setPhRange(cusRes.certificateData.ph_range)
        setPhResolution(cusRes.certificateData.ph_resolution)
        setStrayLight(cusRes.certificateData.stray_light)
        setResolution(cusRes.certificateData.resolution)
        setCell(cusRes.certificateData.cell)
        setTraceMeasure(cusRes.certificateData.trace_measure)
        setPhotoMetric(cusRes.parameter1)
        setWaveLengthWList(cusRes.parameter2)
    }, [])



    // handle input change
    const handleInputChangeP = (e, index) => {
        const { name, value } = e.target
        const list = [...photoMetric]
        list[index][name] = value
        setPhotoMetric(list)
    }

    // handle click event of the Remove button
    const handleRemoveClickP = index => {
        const list = [...photoMetric]
        list.splice(index, 1)
        setPhotoMetric(list)
    }

    // handle click event of the Add button
    const handleAddClickP = () => {
        setPhotoMetric([...photoMetric, { waveLength: "", appliedValue: "", observedValue: "", tolerance: "" }])
    }

   

    // handle input change
    const handleInputChangeW = (e, index) => {
        const { name, value } = e.target
        const list = [...waveLengthWList]
        list[index][name] = value
        setWaveLengthWList(list)
    }

    // handle click event of the Remove button
    const handleRemoveClickW = index => {
        const list = [...waveLengthWList]
        list.splice(index, 1)
        setWaveLengthWList(list)
    }

    // handle click event of the Add button
    const handleAddClickW = () => {
        setWaveLengthWList([...waveLengthWList, { waveLengthW: "", observedW: "", toleranceW: "", deviationW: "" }])
    }

    const handleImage = (file) => {
        setImage(file[0])
    }

    async function Submit() {
        setButtonText("Saving")

        const formData = new FormData()
        formData.append('edit_id', editId)
        formData.append('cer_id', 1)
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
        formData.append('ph_range', phRange)
        formData.append('ph_resolution', phResolution)
        formData.append('ph_parameter', JSON.stringify(photoMetric))
        formData.append('wave_parameter', JSON.stringify(waveLengthWList))
        formData.append('stray_light', strayLight)
        formData.append('resolution', resolution)
        formData.append('cell', cell)
        formData.append('spectra', image)
        // formData.append('leak_ob', leakOb)
        // formData.append('leak_cri', leakCri)
        // formData.append('ac_ob', acOb)
        // formData.append('ac_cri', acCri)
        // formData.append('rep_ob', repOb)
        // formData.append('rep_cri', repCri)
        // formData.append('ph_ob', phOb)
        // formData.append('ph_cri', phCri)
        // formData.append('st_ob', stOb)
        // formData.append('st_cri', stCri)
        // formData.append('res_ob', resOb)
        // formData.append('res_cri', resCri)
        // formData.append('cell_ob', cellOb)
        // formData.append('cell_cri', cellCri)
        // formData.append('com_ob', comOb)
        formData.append('trace_measure', traceMeasure)
        console.warn(editId+"/"+client+"/"+cCertificate+"/"+dawnDataSheet+"/"+equipment+"/"+section+"/"+model+"/"+labTemp+"/"+instrId+"/"+labHumidity+"/"+manufacturer+"/"+calibDate+"/"+nextCalib+"/"+phRange+"/"+phResolution+"/"+JSON.stringify(photoMetric)+"/"+JSON.stringify(waveLengthWList)+"/"+strayLight+"/"+resolution+"/"+cell+"/"+image+"/"+traceMeasure)
        let result = await fetch(window.api + "addOneCertificate", {
            method: 'POST',
            body: formData
        })
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
                    <label>1: Photometric Accuracy.</label>
                    <div className='row'>
                        <div className='col-sm-1'>
                            <label>Range:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={phRange} onChange={(e) => setPhRange(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-4'></div>
                        <div className='col-sm-1'>
                            <label>Resolution:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={phResolution} onChange={(e) => setPhResolution(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-sm-4'>
                            <center>
                                <label>Wavelength (λmax nm)</label>
                            </center>
                        </div>
                        <div className='col-sm-4'>
                            <center>
                                <label>Observed Value Absorbance</label>
                            </center>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <center>
                                        <label>Applied Value</label>
                                    </center>
                                </div>
                                <div className='col-sm-6'>
                                    <center>
                                        <label>Observed Value</label>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <label>Tolerance (±0.01)</label>
                        </div>
                    </div>
                    {photoMetric.map((x, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="waveLength" className='form-control form-control-sm' value={x.waveLength} onChange={e => handleInputChangeP(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-2 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="appliedValue" className='form-control form-control-sm' value={x.appliedValue} onChange={e => handleInputChangeP(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-2 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="observedValue" className='form-control form-control-sm' value={x.observedValue} onChange={e => handleInputChangeP(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="tolerance" className='form-control form-control-sm' value={x.tolerance} onChange={e => handleInputChangeP(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {photoMetric.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClickP(i)}></i>}
                                        {photoMetric.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClickP}></i>}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(photoMetric)}</div> */}
                    <hr />
                    <label>2: Wavelength.</label>
                    <div className='row'>
                        <div className='col-sm-3'>

                            <label>Wave Length (nm)</label>

                        </div>
                        <div className='col-sm-3'>

                            <label>Observed  λmax nm </label>

                        </div>
                        <div className='col-sm-3'>

                            <label>Tolerance</label>

                        </div>
                        <div className='col-sm-3'>

                            <label>Deviation / Error Unit: nm </label>

                        </div>
                    </div>
                    {waveLengthWList.map((x, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="waveLengthW" className='form-control form-control-sm' value={x.waveLengthW} onChange={e => handleInputChangeW(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="observedW" className='form-control form-control-sm' value={x.observedW} onChange={e => handleInputChangeW(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="toleranceW" className='form-control form-control-sm' value={x.toleranceW} onChange={e => handleInputChangeW(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-2 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="deviationW" className='form-control form-control-sm' value={x.deviationW} onChange={e => handleInputChangeW(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {waveLengthWList.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClickW(i)}></i>}
                                        {waveLengthWList.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClickW}></i>}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(waveLengthWList)}</div> */}
                    <hr />
                    <div className='row' style={{ paddingBottom: '5px' }}>
                        <div className='col-sm-2'>
                            <label>3: Limit of Stray light.</label>
                        </div>
                        <div className='col-sm-10'>
                            <input type="text" value={strayLight} onChange={(e) => setStrayLight(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <div className='row' style={{ paddingBottom: '5px' }}>
                        <div className='col-sm-2'>
                            <label>4: Resolution.</label>
                        </div>
                        <div className='col-sm-10'>
                            <input type="text" value={resolution} onChange={(e) => setResolution(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <label>5: Cell.</label>
                        </div>
                        <div className='col-sm-10'>
                            <input type="text" value={cell} onChange={(e) => setCell(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-2'>
                            <label>Spectra Image</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type="file" onChange={e => handleImage(e.target.files)} className="form-control" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <lable>Traceability of Measurements:</lable>
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
                            || !calibDate || !nextCalib || !phRange || !phResolution || !strayLight || !resolution
                        }
                        className="btn btn-success"
                    >{buttonText}</button>
                </div>
            </div>
        </>
    )
}

export default CertificateOne
