import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import axios from '../api/axios'

function DriverDetail() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        id:id,
        number: 0,
        name: "",
        nik: "",
        no_sim: "",
        rfid: "",
        shift_id: 0,
        address: "",
        start_working: "",
        position: "",
        level_menu: "",
        status: "",
        username: ""
    })

    useEffect(() => {
        axios.get('/1.0.0/drivers/' + id)
        .then(res => setState({
            ...state,
            number: res.data.number,
            name: res.data.name,
            nik: res.data.nik,
            no_sim: res.data.no_sim,
            rfid: res.data.rfid,
            shift_id:res.data.shift_id,
            address: res.data.address,
            start_working: res.data.start_working,
            position: res.data.position,
            level_menu: res.data.level_menu,
            username: res.data.username,
            status:res.data.status
        }))
        .catch(err => console.log(err))
    }, [])


  return (
    <div className='container-fluid'>
        <h1 className='text-center mb-4'>Detail Driver {state.number}</h1>
        <div className='row g-3'>
            <div className='col-md-6'>
                <label>Nama</label>
                <h5>{state.name}</h5>
            </div>
            <div className='col-md-6'>
                <label>Nomor</label>
                <h5>{state.number}</h5>
            </div>

            <div className='col-md-6'>
                <label>NIK</label>
                <h5>{state.nik}</h5>
            </div>
            <div className='col-md-6'>
                <label>Nomor SIM</label>
                <h5>{state.no_sim}</h5>
            </div>

            <div className='col-md-6'>
                <label>RFID</label>
                <h5>{state.rfid}</h5>
            </div>
            <div className='col-md-6'>
                <label>ID Shift</label>
                <h5>{state.shift_id}</h5>
            </div>

            <div className='col-md-6'>
                <label>Alamat</label>
                <h5>{state.address}</h5>
            </div>
            <div className='col-md-6'>
                <label>Tanggal Mulai Bekerja</label>
                <h5>{state.start_working}</h5>
            </div>

            <div className='col-md-6'>
                <label>Username</label>
                <h5>{state.username}</h5>
            </div>

            <div className='col-md-6'>
                <label>Jabatan</label>
                <h5>{state.position}</h5>
            </div>

            <div className='col-md-6'>
                <label>Level Menu</label>
                <h5>{state.level_menu}</h5>
            </div>
            <div className='col-md-6'>
                <label>Status</label>
                <h5>{state.status}</h5>
            </div>

            <div class="col-12 text-lg-end">
                <button class="btn btn-dark" type="submit" onClick={() => navigate(-1)}>Kembali</button>
            </div>
        </div>
    </div>
  )
}

export default DriverDetail