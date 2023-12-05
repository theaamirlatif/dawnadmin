import React, { useState, useEffect } from 'react'

const CertificateTwentyFour = () => {

    const editId = window.sessionStorage.getItem("editId")
    const cerId = window.sessionStorage.getItem("cerId")
    
    var curr = new Date()
    var date = curr.toISOString().substr(0, 10)

    var currto = new Date()
    currto.setDate(currto.getDate() + 365)
    var todate = currto.toISOString().substr(0, 10)

    const [buttonText, setButtonText] = useState("Save")
    const [cCertificate, setCCertificate] = useState("EP/pHM-0846")
    const [dawnDataSheet, setDawnDataSheet] = useState("")
    const [equipment, setEquipment] = useState("pH Meter")
    const [section, setSection] = useState("QC. Lab.")
    const [model, setModel] = useState("IS-126")
    const [labTemp, setLabTemp] = useState("25°C")
    const [instrId, setInstrId] = useState("N/A")
    const [labHumidity, setlabHumidity] = useState("50% RH")
    const [manufacturer, setManufacturer] = useState("INMARK")
    const [calibDate, setCalibDate] = useState(date)
    const [client, setClient] = useState("")
    const [nextCalib, setNextCalib] = useState(todate)
    const [issueDate, setIssueDate] = useState(date)
    const [phRange, setPhRange] = useState("")
    const [phResolution, setPhResolution] = useState("")
    const [unit, setUnit] = useState("pH")
    const [unit1, setUnit1] = useState("°C")
    const [traceMeasure, setTraceMeasure] = useState("The pH Meter has been calibrated against reference Buffer Solution, pH7.01, Product Nmae # Buffer Solution , Product Code# HI7007/1L. Standardize by using two standard solutions prepaired by using NIST Standard Reference Methods.  	SRM 185I 	SRM 186-I-g/ SRM 186-II-g mixture. Which is traceable to reference number# 27K85")
    const [performanceTesting, setPerformanceTesting] = useState("Temperature indicator, Steam Chart, Complete system suitability , Six places were selected for steam chart, Six places were selected for temperature indicators")
    const [observations, setObservations] = useState("In Steam Chart; color is changed as specified on chart. Result; Pink color changed into green. This color is changed when pressure reaches to 15 pound and temperature reaches to 121°C.  , There is no growth observed in media control sample., Steam, chemical integrator was also applied for third complete performance verification of autoclave. 3M ComplyTM SteriGageTM Class 5 references # 1243 were used in performance. There are two marks (reject or accept) on integrator. After completion; accepted mark was highlighted that means autoclave is working as per cGMP or ICH guidelines.")
    const [methodUsed, setMethodUsed] = useState("Direct Comparison with indicator, integrator, and observation")

    const [phmParameters, setPhmParameters] = useState([{ appliedValue: "", observedValue: "", deviation: "" }]);
    const [phm1Parameters, setPhm1Parameters] = useState([{ appliedValue: "", observedValue: "", deviation: "" }]);
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
        setPhRange(cusRes.certificateData.ph_range)
        setPhResolution(cusRes.certificateData.ph_resolution)
        setTraceMeasure(cusRes.certificateData.trace_measure)
        setPhmParameters(cusRes.parameter1)
        setPhm1Parameters(cusRes.parameter2)
    }, [])

    
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...phmParameters];
        list[index][name] = value;
        setPhmParameters(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...phmParameters];
        list.splice(index, 1);
        setPhmParameters(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setPhmParameters([...phmParameters, { appliedValue: "", observedValue: "", deviation: "" }]);
    };

    

    // handle input change
    const handleInputChange1 = (e, index) => {
        const { name, value } = e.target;
        const list = [...phm1Parameters];
        list[index][name] = value;
        setPhm1Parameters(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick1 = index => {
        const list = [...phm1Parameters];
        list.splice(index, 1);
        setPhm1Parameters(list);
    };

    // handle click event of the Add button
    const handleAddClick1 = () => {
        setPhm1Parameters([...phm1Parameters, { appliedValue: "", observedValue: "", deviation: "" }]);
    };


    async function Submit() {
        setButtonText("Saving")

        const formData = new FormData()
        formData.append('edit_id', editId)
        formData.append('cer_id', 24)
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
        formData.append('unit', unit)
        formData.append('unit1', unit1)
        formData.append('phm_Parameters', JSON.stringify(phmParameters))
        formData.append('phm1_Parameters', JSON.stringify(phm1Parameters))
        formData.append('trace_measure', traceMeasure)

        let result = await fetch(window.api + "addTwentyFourCertificate", {
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
                    {phmParameters.map((a, i) => {
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
                                        {phmParameters.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClick(i)}></i>}
                                        {phmParameters.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClick}></i>}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                    <div className='row'>
                        <div className='col-sm-1'>
                            <label>Unit:</label>
                        </div>
                        <div className='col-sm-3'>
                            <input type='text' value={unit1} onChange={(e) => setUnit1(e.target.value)} className='form-control form-control-sm' />
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
                    {phm1Parameters.map((a1, i) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '10px' }}>
                                            <input type="text" name="appliedValue" className='form-control form-control-sm' value={a1.appliedValue} onChange={e => handleInputChange1(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="observedValue" className='form-control form-control-sm' value={a1.observedValue} onChange={e => handleInputChange1(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 p-0">
                                        <div style={{ marginLeft: '2px' }}>
                                            <input type="text" name="deviation" className='form-control form-control-sm' value={a1.deviation} onChange={e => handleInputChange1(e, i)} />
                                        </div>
                                    </div>
                                    <div className="col-sm-1" style={{ paddingTop: '8px' }}>
                                        {phm1Parameters.length !== 1 && <i className='fas fa-times-circle' onClick={() => handleRemoveClick1(i)}></i>}
                                        {phm1Parameters.length - 1 === i && <i className='fas fa-plus-circle' onClick={handleAddClick1}></i>}
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

export default CertificateTwentyFour