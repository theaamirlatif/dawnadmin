import React, { useState, useEffect } from 'react'

const CertificateThirtyFive = () => {

    const editId = window.sessionStorage.getItem("editId")
    const cerId = window.sessionStorage.getItem("cerId")

    var curr = new Date()
    var date = curr.toISOString().substr(0, 10)

    var currto = new Date()
    currto.setDate(currto.getDate() + 365)
    var todate = currto.toISOString().substr(0, 10)

    const [buttonText, setButtonText] = useState("Save")
    const [cCertificate, setCCertificate] = useState("MRL /WB-7844")
    const [dawnDataSheet, setDawnDataSheet] = useState("")
    const [equipment, setEquipment] = useState("Weighing Balance")
    const [section, setSection] = useState("R.M.S  (Ceph.)")
    const [model, setModel] = useState("YH-T6")
    const [labTemp, setLabTemp] = useState("25°C")
    const [tempLabel, setTempLabel] = useState("")
    const [instrId, setInstrId] = useState("WHM-060")
    const [labHumidity, setlabHumidity] = useState("50% RH")
    const [humLabel, setHumLabel] = useState("")
    const [manufacturer, setManufacturer] = useState("YAOHUA")
    const [calibDate, setCalibDate] = useState(date)
    const [client, setClient] = useState("")
    const [nextCalib, setNextCalib] = useState(todate)
    const [issueDate, setIssueDate] = useState(date)
    const [phRange, setPhRange] = useState("")
    const [phResolution, setPhResolution] = useState("")
    const [unit, setUnit] = useState("Kg")
    const [traceMeasure, setTraceMeasure] = useState("The Weighing Balance has been calibrated against Pre-calibrated set of dead weight, Model/Make: China/M1, that is traceable to the certificate number APCIC/MF (260); ILO # 425/10.06.21, PCSIR which in turns traceable to Procedure # LLC/APCIC/MCP/01, Cal.Lab-M24, Report # CC-10687 NPSL Pakistan.")

    const [wbParameters, setWbParameters] = useState([{ appliedValue: "", observedValue: "", deviation: "" }]);

    const [customerList, setCustomerList] = useState([])

    useEffect(async () => {
        window.scrollTo(0, 0);
        let cusRes = await fetch(window.api+"getCertificateData/"+editId+"/"+cerId)
        cusRes = await cusRes.json()
        setCustomerList(cusRes.customers)
        setCCertificate(cusRes.certificateData.c_certificate)
        setDawnDataSheet(cusRes.certificateData.dawn_data_sheet)
        setEquipment(cusRes.certificateData.equipment)
        setSection(cusRes.certificateData.section)
        setModel(cusRes.certificateData.model)
        setLabTemp(cusRes.certificateData.lab_temp)
        setTempLabel(cusRes.certificateData.temp_label)
        setInstrId(cusRes.certificateData.instr_id)
        setlabHumidity(cusRes.certificateData.lab_humidity)
        setHumLabel(cusRes.certificateData.hum_label)
        setManufacturer(cusRes.certificateData.manufacturer)
        setCalibDate(cusRes.certificateData.calib_date)
        setClient(cusRes.certificateData.user_id)
        setNextCalib(cusRes.certificateData.next_calib)
        setIssueDate(cusRes.certificateData.issue_date)
        setUnit(cusRes.certificateData.unit)
        setPhRange(cusRes.certificateData.ph_range)
        setPhResolution(cusRes.certificateData.ph_resolution)
        setTraceMeasure(cusRes.certificateData.trace_measure)
        setWbParameters(cusRes.parameter1)

    }, [])

    
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const list = [...wbParameters]
        list[index][name] = value
        setWbParameters(list)
    }

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...wbParameters]
        list.splice(index, 1)
        setWbParameters(list)
    }

    // handle click event of the Add button
    const handleAddClick = () => {
        setWbParameters([...wbParameters, { appliedValue: "", observedValue: "", deviation: "" }])
    }


    async function Submit() {
        setButtonText("Saving")

        const formData = new FormData()
        formData.append('edit_id', editId)
        formData.append('cer_id', 35)
        formData.append('user_id', client)
        formData.append('c_certificate', cCertificate)
        formData.append('dawn_data_sheet', dawnDataSheet)
        formData.append('equipment', equipment)
        formData.append('section', section)
        formData.append('model', model)
        formData.append('lab_temp', labTemp)
        formData.append('temp_label', tempLabel)
        formData.append('instr_id', instrId)
        formData.append('lab_humidity', labHumidity)
        formData.append('hum_label', humLabel)
        formData.append('manufacturer', manufacturer)
        formData.append('calib_date', calibDate)
        formData.append('next_calib', nextCalib)
        formData.append('issue_date', issueDate)
        formData.append('ph_range', phRange)
        formData.append('ph_resolution', phResolution)
        formData.append('unit', unit)
        formData.append('wb_Parameters', JSON.stringify(wbParameters))
        formData.append('trace_measure', traceMeasure)

        let result = await fetch(window.api + "addThirtyFiveCertificate", {
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
                            <label>
                                <select className='select_class' value={tempLabel} onChange={(e) => setTempLabel(e.target.value)}>
                                    <option value="L">Laboratory</option>
                                    <option value="R">Room</option>
                                </select>
                                Temperature: </label>
                            <input type='text' value={labTemp} onChange={(e) => setLabTemp(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Instrument ID: </label>
                            <input type='text' value={instrId} onChange={(e) => setInstrId(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>
                                <select className='select_class' value={humLabel} onChange={(e) => setHumLabel(e.target.value)}>
                                    <option value="L">Laboratory</option>
                                    <option value="R">Room</option>
                                </select>
                                Humidity: </label>
                            <input type='text' value={labHumidity} onChange={(e) => setlabHumidity(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-3'>
                            <label>Model/Type: </label>
                            <input type='text' value={model} onChange={(e) => setModel(e.target.value)} className='form-control form-control-sm' />
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

                    <div className='row'>
                        <div className='col-sm-1'>
                            <label>Unit:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={unit} onChange={(e) => setUnit(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <center>
                                <label>Values on the Reference Equipment</label>
                            </center>
                        </div>
                        <div className='col-sm-4'>
                            <center>
                                <label>Value on the Unit Under Calibration </label>
                            </center>
                        </div>
                        <div className='col-sm-4'>
                            <label>Deviation / Error</label>
                        </div>
                    </div>
                    {wbParameters.map((a, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="appliedValue" className='form-control form-control-sm' value={a.appliedValue} onChange={e => handleInputChange(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="observedValue" className='form-control form-control-sm' value={a.observedValue} onChange={e => handleInputChange(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="deviation" className='form-control form-control-sm' value={a.deviation} onChange={e => handleInputChange(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {wbParameters.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClick(i)}></i>}
                                        {wbParameters.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClick}></i>}
                                    </div>
                                </div>
                            </>
                        )
                    })}

                    <hr />
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

export default CertificateThirtyFive