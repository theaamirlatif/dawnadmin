import React, { useState, useEffect } from 'react'

const CertificateThirtySeven = () => {

    const editId = window.sessionStorage.getItem("editId")
    const cerId = window.sessionStorage.getItem("cerId")

    var curr = new Date()
    var date = curr.toISOString().substr(0, 10)

    var currto = new Date()
    currto.setDate(currto.getDate() + 365)
    var todate = currto.toISOString().substr(0, 10)

    const [buttonText, setButtonText] = useState("Save")
    const [cCertificate, setCCertificate] = useState("MRL /DIS-7891")
    const [dawnDataSheet, setDawnDataSheet] = useState("")
    const [equipment, setEquipment] = useState("Dissolution Test Apparatus")
    const [section, setSection] = useState("IPQC.")
    const [model, setModel] = useState("2020+")
    const [labTemp, setLabTemp] = useState("25°C")
    const [instrId, setInstrId] = useState("GSM-075")
    const [labHumidity, setlabHumidity] = useState("50% RH")
    const [manufacturer, setManufacturer] = useState("Curio")
    const [calibDate, setCalibDate] = useState(date)
    const [client, setClient] = useState("")
    const [nextCalib, setNextCalib] = useState(todate)
    const [issueDate, setIssueDate] = useState(date)
    const [phRange, setPhRange] = useState("")
    const [unit, setUnit] = useState("")
    const [phResolution, setPhResolution] = useState("")
    const [phRange1, setPhRange1] = useState("")
    const [unit1, setUnit1] = useState("")
    const [phResolution1, setPhResolution1] = useState("")
    const [phRange2, setPhRange2] = useState("")
    const [unit2, setUnit2] = useState("")
    const [phResolution2, setPhResolution2] = useState("")
    const [traceMeasure, setTraceMeasure] = useState("1: The Dissolution test apparatus has been calibrated against pre-calibrated digital Thermometer, Sr. # 20180203809/Digital, Model/Make: Flank/F-8855, that is traceable to the certificate number APCIC/TL(566); ILO # 1306/29.03.2021, PCSIR which in turns traceable to Procedure # LLC/APCIC/TCP/01 LLC, Cal.Lab- T16, T17, T37, T34 & T2, Report # 111796, 12042 & 11177 NPSL Pakistan. 2:The Dissolution test apparatus has been calibrated pre-calibrated tachometer, Sr. # 1.500703/Photo type, Model/Make: Taiwan/DT-2268, that is traceable to the certificate number APCIC/EL (175); ILO # 512/11.03.2021, PCSIR which in turns traceable to Procedure # LLC/APCIC/RCP/01 LLC, Cal.Lab- f6 & f8, Report # 11034 & 11036 NPSL Pakistan. 3: The Dissolution test apparatus has been calibrated against pre-calibrated timer , Model/Make: KADIO/KD-1069, that is traceable to the certificate number APCIC/EL (174); ILO # 512/11.03.2021, PCSIR which in turns traceable to Procedure # LLC/APCIC/WCP/01 LLC, Cal.Lab- t2 & t3, Report # 11035 & 11161 NPSL Pakistan.")

    const [dsParameters, setDsParameters] = useState([{ appliedValue: "", observedValue: "", deviation: "" }])
    const [ds1Parameters, setDs1Parameters] = useState([{ appliedValue: "", observedValue: "", deviation: "" }])
    const [ds2Parameters, setDs2Parameters] = useState([{ appliedValue: "", observedValue: "", deviation: "", uncertainty: "" }])
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
        setInstrId(cusRes.certificateData.instr_id)
        setlabHumidity(cusRes.certificateData.lab_humidity)
        setManufacturer(cusRes.certificateData.manufacturer)
        setCalibDate(cusRes.certificateData.calib_date)
        setClient(cusRes.certificateData.user_id)
        setNextCalib(cusRes.certificateData.next_calib)
        setIssueDate(cusRes.certificateData.issue_date)
        setUnit(cusRes.certificateData.unit)
        setUnit1(cusRes.certificateData.unit1)
        setUnit2(cusRes.certificateData.unit2)
        setPhRange(cusRes.certificateData.ph_range)
        setPhResolution(cusRes.certificateData.ph_resolution)
        setPhRange1(cusRes.certificateData.ph_range1)
        setPhResolution1(cusRes.certificateData.ph_resolution1)
        setPhResolution2(cusRes.certificateData.ph_resolution2)
        setTraceMeasure(cusRes.certificateData.trace_measure)
        setDsParameters(cusRes.parameter1)
        setDs1Parameters(cusRes.parameter2)
        setDs2Parameters(cusRes.parameter3)
    }, [])

    
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const list = [...dsParameters]
        list[index][name] = value
        setDsParameters(list)
    }

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...dsParameters]
        list.splice(index, 1)
        setDsParameters(list)
    }

    // handle click event of the Add button
    const handleAddClick = () => {
        setDsParameters([...dsParameters, { appliedValue: "", observedValue: "", deviation: "" }])
    }

    

    // handle input change
    const handleInputChange1 = (e, index) => {
        const { name, value } = e.target
        const list = [...ds1Parameters]
        list[index][name] = value
        setDs1Parameters(list)
    }

    // handle click event of the Remove button
    const handleRemoveClick1 = index => {
        const list = [...ds1Parameters]
        list.splice(index, 1)
        setDs1Parameters(list)
    }

    // handle click event of the Add button
    const handleAddClick1 = () => {
        setDs1Parameters([...ds1Parameters, { appliedValue: "", observedValue: "", deviation: "" }])
    }

    

    // handle input change
    const handleInputChange2 = (e, index) => {
        const { name, value } = e.target
        const list = [...ds2Parameters]
        list[index][name] = value
        setDs2Parameters(list)
    }

    // handle click event of the Remove button
    const handleRemoveClick2 = index => {
        const list = [...ds2Parameters]
        list.splice(index, 1)
        setDs2Parameters(list)
    }

    // handle click event of the Add button
    const handleAddClick2 = () => {
        setDs2Parameters([...ds2Parameters, { appliedValue: "", observedValue: "", deviation: "", uncertainty: "" }])
    }

    async function Submit() {
        setButtonText("Saving")

        const formData = new FormData()
        formData.append('edit_id', editId)
        formData.append('cer_id', 37)
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
        formData.append('ph_range1', phRange1)
        formData.append('ph_resolution', phResolution)
        formData.append('ph_resolution1', phResolution1)
        formData.append('ph_resolution2', phResolution2)
        formData.append('unit', unit)
        formData.append('unit1', unit1)
        formData.append('unit2', unit2)
        formData.append('ds_Parameters', JSON.stringify(dsParameters))
        formData.append('ds1_Parameters', JSON.stringify(ds1Parameters))
        formData.append('ds2_Parameters', JSON.stringify(ds2Parameters))
        formData.append('trace_measure', traceMeasure)

        let result = await fetch(window.api + "addThirtySevenCertificate", {
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
                    <div className='row'>
                        <div className='col-sm-1'>
                            <label>Range:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={phRange} onChange={(e) => setPhRange(e.target.value)} className='form-control form-control-sm' />
                        </div>

                        <div className='col-sm-1'>
                            <label>Resolution:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={phResolution} onChange={(e) => setPhResolution(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-1'>
                            <label>Unit:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={unit} onChange={(e) => setUnit(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <br />
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
                            <label>Error</label>
                        </div>
                    </div>
                    {dsParameters.map((t, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="appliedValue" className='form-control form-control-sm' value={t.appliedValue} onChange={e => handleInputChange(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="observedValue" className='form-control form-control-sm' value={t.observedValue} onChange={e => handleInputChange(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="deviation" className='form-control form-control-sm' value={t.deviation} onChange={e => handleInputChange(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {dsParameters.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClick(i)}></i>}
                                        {dsParameters.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClick}></i>}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(dsParameters)}</div>  */}
                    <hr />
                    <div className='row'>
                        <div className='col-sm-1'>
                            <label>Range:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={phRange1} onChange={(e) => setPhRange1(e.target.value)} className='form-control form-control-sm' />
                        </div>

                        <div className='col-sm-1'>
                            <label>Resolution:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={phResolution1} onChange={(e) => setPhResolution1(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-1'>
                            <label>Unit:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={unit1} onChange={(e) => setUnit1(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-sm-4'>
                            <center>
                                <label>Values on the Reference Equipment</label>
                            </center>
                        </div>
                        <div className='col-sm-4'>
                            <center>
                                <label>Avg Value on the Unit Under Calibration</label>
                            </center>
                        </div>
                        <div className='col-sm-4'>
                            <label>Error </label>
                        </div>
                    </div>
                    {ds1Parameters.map((t, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="appliedValue" className='form-control form-control-sm' value={t.appliedValue} onChange={e => handleInputChange1(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="observedValue" className='form-control form-control-sm' value={t.observedValue} onChange={e => handleInputChange1(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="deviation" className='form-control form-control-sm' value={t.deviation} onChange={e => handleInputChange1(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {ds1Parameters.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClick1(i)}></i>}
                                        {ds1Parameters.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClick1}></i>}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(ds1Parameters)}</div>  */}
                    <hr />
                    <div className='row'>

                        <div className='col-sm-1'>
                            <label>Resolution:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={phResolution2} onChange={(e) => setPhResolution2(e.target.value)} className='form-control form-control-sm' />
                        </div>
                        <div className='col-sm-1'>
                            <label>Unit:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={unit2} onChange={(e) => setUnit2(e.target.value)} className='form-control form-control-sm' />
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-sm-3'>
                            <center>
                                <label>Applied Value</label>
                            </center>
                        </div>
                        <div className='col-sm-3'>
                            <center>
                                <label>Observed Value</label>
                            </center>
                        </div>
                        <div className='col-sm-3'>
                            <center>
                                <label>Error Unit:</label>
                            </center>
                        </div>
                        <div className='col-sm-3'>
                            <label>Uncertainty</label>
                        </div>
                    </div>
                    {ds2Parameters.map((t, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="appliedValue" className='form-control form-control-sm' value={t.appliedValue} onChange={e => handleInputChange2(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="observedValue" className='form-control form-control-sm' value={t.observedValue} onChange={e => handleInputChange2(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="deviation" className='form-control form-control-sm' value={t.deviation} onChange={e => handleInputChange2(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-2 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="uncertainty" className='form-control form-control-sm' value={t.uncertainty} onChange={e => handleInputChange2(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {ds2Parameters.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClick2(i)}></i>}
                                        {ds2Parameters.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClick2}></i>}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(ds2Parameters)}</div>  */}
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

export default CertificateThirtySeven