import React, {useState, useEffect} from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { use } from 'echarts';
import Swal from 'sweetalert2';


const BASE_URL= "/1.0.0/drivers"

function AddDriver() { 

    const navigate = useNavigate()
    
    const [shifts, setShifts] = useState([]);

    const getShift = async () => {
        try {
            await axios.get('/1.0.0/shifts').then((response) => {
              setShifts(response.data);
              console.log(response.data)
            });
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        getShift()
    }, [])
    
    const [state, setState] = useState({
        number: null,
        name: "",
        nik: null,
        no_sim: null,
        rfid: "",
        shift_id: null,
        address: "",
        start_working: "",
        position: "",
        level_menu: "",
        status: "",
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const driverData = {
            number: state.number,
            name: state.name,
            nik: state.nik,
            no_sim: state.no_sim,
            rfid: state.rfid,
            shift_id: state.shift_id,
            address: state.address,
            start_working: state.start_working,
            position: state.position,
            level_menu: state.level_menu,
            status: state.status,
            username: state.username,
            password: state.password,
        };
        try{
            const response = await axios.post(BASE_URL, driverData);
            console.log(response.status, response.data)
            setState({
                number: 0,
                name: "",
                nik: 0,
                no_sim: 0,
                rfid: "",
                shift_id: 0,
                address: "",
                start_working: "",
                position: "",
                level_menu: "",
                status: "",
                username: "",
                password: "",
            })
            Swal.fire({
                icon: 'success',
                title: 'Menambahkan Data Shift',
                text: 'Sukses menambahkan shift!',
            })
            setTimeout(function(){
                window.location.reload();
            }, 500);


        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Menambahkan Data Shift',
                text: 'Gagal menambahkan shift!',
            })
        }
    }

  return (  

    <div className='container-fluid text-lg-start'>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Daftar Data Driver
        </button>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-md-down">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Data Driver</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3 needs-validation px-5"  novalidate onSubmit={handleSubmit} autoComplete='off'>
                        <div class="col-md-6">
                            <label for="validationCustom01" class="form-label">Nomor</label>
                            <input type="text" class="form-control" id="validationCustom01" 
                            placeholder="123456" name='number' value={state.number} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Nama</label>
                            <input type="text" class="form-control" id="validationCustom02" 
                            placeholder="John Doe" name='name' value={state.name} onChange={handleChange} required/>
                        </div>
                        
                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">NIK</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='3xxxxxxxxxxx' name='nik' value={state.nik} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom04" class="form-label">Nomor SIM</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='2xxxxxxxxxxx' name='no_sim' value={state.end_point} onChange={handleChange} required/>
                        </div>

                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">RFID</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='1xxxxxxx' name='rfid' value={state.rfid} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Shift</label>
                            <select class="form-select" aria-label="Default select example" required onChange={value => handleChange(value)} name='shift_id'>
                                <option selected disabled>Pilih disini</option>
                                {shifts.map((shift) => 
                                    <option value={state.shift_id}>{shift.id}</option>
                                )}
                            </select>
                            {/* <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='1xxxxxxx' name='shift_id' value={state.shift_id} onChange={handleChange} required/> */}
                        </div>

                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Address</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='Depok' name='address' value={state.address} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom04" class="form-label">Tanggal Mulai Bekerja</label>
                            <input type="datetime-local" class="form-control" id="validationCustom03" 
                            placeholder='20/10/2000' name='start_working' value={state.start_working} onChange={handleChange} required/>
                        </div>

                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Jabatan</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='Driver' name='position' value={state.position} onChange={handleChange} required/>
                        </div>
                        
                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Level Menu</label>
                            <select class="form-select" aria-label="Default select example" required onChange={value => handleChange(value)} name='level_menu'>
                                <option selected disabled>Pilih Level Menu</option>
                                <option value={state.level_menu == "A" } >A</option>
                                <option value={state.level_menu == "B" } >B</option>
                                <option value={state.level_menu == "C" } >C</option>
                                <option value={state.level_menu == "D" } >D</option>
                            </select>
                            
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom04" class="form-label">Status</label>
                            <select class="form-select" aria-label="Default select example" required onChange={value => handleChange(value)} name='status'>
                                <option selected disabled>Pilih Level Menu</option>
                                <option value={state.status == "Aktif" } >Aktif</option>
                                <option value={state.status == "Non-Aktif" } >Non-Aktif</option>
                                <option value={state.status == "Mengundurkan diri" } >Mengundurkan diri</option>
                                <option value={state.status == "Dipecat" } >Dipecat</option>
                            </select>
                            
                        </div>

                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Username</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='JohnDoe123' name='username' value={state.username} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom04" class="form-label">Password</label>
                            <input type="password" class="form-control" id="validationCustom03" 
                            placeholder='********' name='password' value={state.password} onChange={handleChange} required/>
                        </div>

                        
                        <div class="col-12 text-lg-end">
                            <button class="btn btn-primary" type="submit">Submit Form</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDriver