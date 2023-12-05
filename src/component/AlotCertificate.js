import React, { useState, useEffect } from 'react'
import Header from './layout/Header'
import SideNav from './layout/SideNav'
import Footer from './layout/Footer'
import CertificateOne from './caertificates/CertificateOne'
import CertificateTwo from './caertificates/CertificateTwo'
import CertificateThree from './caertificates/CertificateThree'
import CertificateFour from './caertificates/CertificateFour'
import CertificateFive from './caertificates/CertificateFive'
import CertificateSix from './caertificates/CertificateSix'
import CertificateSeven from './caertificates/CertificateSeven'
import CertificateEight from './caertificates/CertificateEight'
import CertificateNine from './caertificates/CertificateNine'
import CertificateTen from './caertificates/CertificateTen'
import CertificateEleven from './caertificates/CertificateEleven'
import CertificateTwelve from './caertificates/CertificateTwelve'
import CertificateThirteen from './caertificates/CertificateThirteen'
import CertificateFourteen from './caertificates/CertificateFourteen'
import CertificateFifteen from './caertificates/CertificateFifteen'
import CertificateSixteen from './caertificates/CertificateSixteen'
import CertificateSeventeen from './caertificates/CertificateSeventeen'
import CertificateEighteen from './caertificates/CertificateEighteen'
import CertificateNineteen from './caertificates/CertificateNineteen'
import CertificateTwenty from './caertificates/CertificateTwenty'
import CertificateTwentyOne from './caertificates/CertificateTwentyOne'
import CertificateTwentyTwo from './caertificates/CertificateTwentyTwo'
import CertificateTwentyThree from './caertificates/CertificateTwentyThree'
import CertificateTwentyFour from './caertificates/CertificateTwentyFour'
import CertificateTwentyFive from './caertificates/CertificateTwentyFive'
import CertificateTwentySix from './caertificates/CertificateTwentySix'
import CertificateTwentySeven from './caertificates/CertificateTwentySeven'
import CertificateTwentyEight from './caertificates/CertificateTwentyEight'
import CertificateTwentyNine from './caertificates/CertificateTwentyNine'
import CertificateThirty from './caertificates/CertificateThirty'
import CertificateThirtyOne from './caertificates/CertificateThirtyOne'
import CertificateThirtyTwo from './caertificates/CertificateThirtyTwo'
import CertificateThirtyThree from './caertificates/CertificateThirtyThree'
import CertificateThirtyFour from './caertificates/CertificateThirtyFour'
import CertificateThirtyFive from './caertificates/CertificateThirtyFive'
import CertificateOther from './caertificates/CertificateOther'
import CertificateThirtySeven from './caertificates/CertificateThirtySeven'
import CertificateThirtyEight from './caertificates/CertificateThirtyEight'
import CertificateThiryNine from './caertificates/CertificateThiryNine'

const AlotCertificate = () => {

    const cerId = window.sessionStorage.getItem("cerId")
    const editId = window.sessionStorage.getItem("editId")
    const [certificate, setCertificate] = useState("")
    const [type, setType] = useState("")


    return (
        <>
            <div className="wrapper">
                <Header />
                <SideNav />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            {
                                (cerId || editId) ?
                                    <>
                                    </> :
                                    <>
                                        <div className="row mb-2">
                                            <div className="col-sm-3">
                                                <h1 className="m-0">Certificates</h1>
                                            </div>
                                            <div className='col-sm-3'>
                                                <select value={type} onChange={(e) => setType(e.target.value)} className='form-control form-control-sm'>
                                                    <option value='0'>--Select Type--</option>
                                                    <option value='1'>Accredited</option>
                                                    <option value='2'>Non-Accredited</option>
                                                </select>
                                            </div>
                                            <div className='col-sm-3'>
                                                <select value={certificate} onChange={(e) => setCertificate(e.target.value)} className='form-control form-control-sm'>
                                                    <option value="">--Select Certificate--</option>
                                                    {
                                                        (type == 1) ?
                                                            <>
                                                                <option value="10">Timer (Bottle Filling Machine)*</option>
                                                                <option value="14">Pressure Gauge (Autoclave)*</option>
                                                                <option value="21">Autoclave</option>
                                                                <option value="9">Magnehelic Gauge </option>
                                                                <option value="7">Vacuum Gauge (Leakage Tester)</option>
                                                                <option value="37">Dissolution Test Apparatus</option>
                                                                <option value="38">Other Certificate</option>
                                                            </> :
                                                            (type == 2) ?
                                                                <>
                                                                    <option value="1">UV-VIS Spectrophotometer </option>
                                                                    <option value="2">HPLC Column Oven</option>
                                                                    <option value="3">HPLC Detector</option>
                                                                    <option value="4">HPLC Pump </option>
                                                                    <option value="5">HPLC Injector </option>
                                                                    <option value="6">Liquid Particle Counter </option>
                                                                    <option value="8">Manometer</option>
                                                                    <option value="11">Temperature Controller (Bottle Filling Machine)</option>
                                                                    <option value="12">Air Sampler</option>
                                                                    <option value="13">FTIR Spectrophotometer</option>
                                                                    <option value="15">Stability Chamber</option>
                                                                    <option value="16">Centrifuge  M/C</option>
                                                                    <option value="17">Analytical Balance</option>
                                                                    <option value="18">Karl Fischer </option>
                                                                    <option value="19">Particle Counter</option>
                                                                    <option value="20">Anemometer</option>
                                                                    <option value="22">Microscope</option>
                                                                    <option value="23">Moisture Analyzer</option>
                                                                    <option value="24">pH Meter</option>
                                                                    <option value="25">Conductivity Meter</option>
                                                                    <option value="26">Dead Weight Box</option>
                                                                    <option value="27">Dead Weight Box(MRL)</option>
                                                                    <option value="28">Disintegration Test Apparatus.</option>
                                                                    <option value="29">Friability Tester</option>
                                                                    <option value="30">Laminar Flow cabinet</option>
                                                                    <option value="31">Polarimeter</option>
                                                                    <option value="32">Potentiometer</option>
                                                                    <option value="33">Refrectometer</option>
                                                                    <option value="34">Thermometer</option>
                                                                    <option value="35">Weighing Balance</option>
                                                                    <option value="39">Hygrometer</option>
                                                                    <option value="36">Other Certificate</option>
                                                                </> :
                                                                <></>
                                                    }
                                                </select>

                                            </div>
                                            <div className="col-sm-3">
                                                <ol className="breadcrumb float-sm-right">
                                                    <li className="breadcrumb-item"><a href="#">Certificates</a></li>
                                                    <li className="breadcrumb-item active">Alot Certificate</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    {
                                        (certificate == 1 || cerId == 1) ?
                                            <>
                                                <CertificateOne />
                                            </> :
                                            (certificate == 2 || cerId == 2) ?
                                                <>
                                                    <CertificateTwo />
                                                </> :
                                                (certificate == 3 || cerId == 3) ?
                                                    <>
                                                        <CertificateThree />
                                                    </> :
                                                    (certificate == 4 || cerId == 4) ?
                                                        <>
                                                            <CertificateFour />
                                                        </> :
                                                        (certificate == 5 || cerId == 5) ?
                                                            <>
                                                                <CertificateFive />
                                                            </> :
                                                            (certificate == 6 || cerId == 6) ?
                                                                <>
                                                                    <CertificateSix />
                                                                </> :
                                                                (certificate == 7 || cerId == 7) ?
                                                                    <>
                                                                        <CertificateSeven />
                                                                    </> :
                                                                    (certificate == 8 || cerId == 8) ?
                                                                        <>
                                                                            <CertificateEight />
                                                                        </> :
                                                                        (certificate == 9 || cerId == 9) ?
                                                                            <>
                                                                                <CertificateNine />
                                                                            </> :
                                                                            (certificate == 10 || cerId == 10) ?
                                                                                <>
                                                                                    <CertificateTen />
                                                                                </> :
                                                                                (certificate == 11 || cerId == 11) ?
                                                                                    <>
                                                                                        <CertificateEleven />
                                                                                    </> :
                                                                                    (certificate == 12 || cerId == 12) ?
                                                                                        <>
                                                                                            <CertificateTwelve />
                                                                                        </> :
                                                                                        (certificate == 13 || cerId == 13) ?
                                                                                            <>
                                                                                                <CertificateThirteen />
                                                                                            </> :
                                                                                            (certificate == 14 || cerId == 14) ?
                                                                                                <>
                                                                                                    <CertificateFourteen />
                                                                                                </> :
                                                                                                (certificate == 15 || cerId == 15) ?
                                                                                                    <>
                                                                                                        <CertificateFifteen />
                                                                                                    </> :
                                                                                                    (certificate == 16 || cerId == 16) ?
                                                                                                        <>
                                                                                                            <CertificateSixteen />
                                                                                                        </> :
                                                                                                        (certificate == 17 || cerId == 17) ?
                                                                                                            <>
                                                                                                                <CertificateSeventeen />
                                                                                                            </> :
                                                                                                            (certificate == 18 || cerId == 18) ?
                                                                                                                <>
                                                                                                                    <CertificateEighteen />
                                                                                                                </> :
                                                                                                                (certificate == 19 || cerId == 19) ?
                                                                                                                    <>
                                                                                                                        <CertificateNineteen />
                                                                                                                    </> :
                                                                                                                    (certificate == 20 || cerId == 20) ?
                                                                                                                        <>
                                                                                                                            <CertificateTwenty />
                                                                                                                        </> :
                                                                                                                        (certificate == 21 || cerId == 21) ?
                                                                                                                            <>
                                                                                                                                <CertificateTwentyOne />
                                                                                                                            </> :
                                                                                                                            (certificate == 22 || cerId == 22) ?
                                                                                                                                <>
                                                                                                                                    <CertificateTwentyTwo />
                                                                                                                                </> :
                                                                                                                                (certificate == 23 || cerId == 23) ?
                                                                                                                                    <>
                                                                                                                                        <CertificateTwentyThree />
                                                                                                                                    </> :
                                                                                                                                    (certificate == 24 || cerId == 24) ?
                                                                                                                                        <>
                                                                                                                                            <CertificateTwentyFour />
                                                                                                                                        </> :
                                                                                                                                        (certificate == 25 || cerId == 25) ?
                                                                                                                                            <>
                                                                                                                                                <CertificateTwentyFive />
                                                                                                                                            </> :
                                                                                                                                            (certificate == 26 || cerId == 26) ?
                                                                                                                                                <>
                                                                                                                                                    <CertificateTwentySix />
                                                                                                                                                </> :
                                                                                                                                                (certificate == 27 || cerId == 27) ?
                                                                                                                                                    <>
                                                                                                                                                        <CertificateTwentySeven />
                                                                                                                                                    </> :
                                                                                                                                                    (certificate == 28 || cerId == 28) ?
                                                                                                                                                        <>
                                                                                                                                                            <CertificateTwentyEight />
                                                                                                                                                        </> :
                                                                                                                                                        (certificate == 29 || cerId == 29) ?
                                                                                                                                                            <>
                                                                                                                                                                <CertificateTwentyNine />
                                                                                                                                                            </> :
                                                                                                                                                            (certificate == 30 || cerId == 30) ?
                                                                                                                                                                <>
                                                                                                                                                                    <CertificateThirty />
                                                                                                                                                                </> :
                                                                                                                                                                (certificate == 31 || cerId == 31) ?
                                                                                                                                                                    <>
                                                                                                                                                                        <CertificateThirtyOne />
                                                                                                                                                                    </> :
                                                                                                                                                                    (certificate == 32 || cerId == 32) ?
                                                                                                                                                                        <>
                                                                                                                                                                            <CertificateThirtyTwo />
                                                                                                                                                                        </> :
                                                                                                                                                                        (certificate == 33 || cerId == 33) ?
                                                                                                                                                                            <>
                                                                                                                                                                                <CertificateThirtyThree />
                                                                                                                                                                            </> :
                                                                                                                                                                            (certificate == 34 || cerId == 34) ?
                                                                                                                                                                                <>
                                                                                                                                                                                    <CertificateThirtyFour />
                                                                                                                                                                                </> :
                                                                                                                                                                                (certificate == 35 || cerId == 35) ?
                                                                                                                                                                                    <>
                                                                                                                                                                                        <CertificateThirtyFive />
                                                                                                                                                                                    </> :
                                                                                                                                                                                    (certificate == 36 || cerId == 36) ?
                                                                                                                                                                                        <>
                                                                                                                                                                                            <CertificateOther />
                                                                                                                                                                                        </> :
                                                                                                                                                                                        (certificate == 37 || cerId == 37) ?
                                                                                                                                                                                            <>
                                                                                                                                                                                                <CertificateThirtySeven />
                                                                                                                                                                                            </> :
                                                                                                                                                                                            (certificate == 38 || cerId == 38) ?
                                                                                                                                                                                                <>
                                                                                                                                                                                                    <CertificateThirtyEight />
                                                                                                                                                                                                </> :
                                                                                                                                                                                                (certificate == 39 || cerId == 39) ?
                                                                                                                                                                                                    <>
                                                                                                                                                                                                        <CertificateThiryNine />
                                                                                                                                                                                                    </> :
                                                                                                                                                                                                    <></>
                                    }
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

export default AlotCertificate
