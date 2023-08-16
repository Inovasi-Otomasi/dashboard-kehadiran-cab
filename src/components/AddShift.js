import React, {useState} from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const BASE_URL= "/1.0.0/shifts"

function AddShift() { 

    const navigate = useNavigate()
    
    const [state, setState] = useState({
        number: null,
        name: "",
        shift_start: "",
        shift_end: "",
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
        const shiftData = {
            number: state.number,
            name: state.name,
            shift_start: state.shift_start,
            shift_end: state.shift_end,
        };
        try{
            const response = await axios.post(BASE_URL, shiftData);
            setState({
                number: 0,
                name: "",
                shift_start: "",
                shift_end: "",
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

    <div>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Daftar Data Shift
        </button>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-md-down">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Data Shift</h1>
                </div>
                <div class="modal-body">
                    <form class="row g-3 needs-validation px-5"  novalidate autoComplete='off'>
                        <div class="col-md-6">
                            <label for="validationCustom01" class="form-label">Nomor</label>
                            <input type="text " class="form-control" id="validationCustom01" 
                            placeholder="123456" name='number' value={state.number} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Nama</label>
                            <input type="text" class="form-control" id="validationCustom02" 
                            placeholder="Axxxxx" name='name' value={state.name} onChange={handleChange} required/>
                        </div>
                        
                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Jam Mulai Shift</label>
                            <input type="time" class="form-control" id="validationCustom03" 
                            placeholder='06:00:00' name='shift_start' value={state.shift_start} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom04" class="form-label">Jam Selesai Shift</label>
                            <input type="time" class="form-control" id="validationCustom03" 
                            placeholder='18:00:00' name='shift_end' value={state.shift_end} onChange={handleChange} required/>
                        </div>
                        
                    </form>
                </div>
                <div class="modal-footer d-flex flex-row justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                    <button class="btn btn-dark" type="submit" onClick={handleSubmit}>Tambahkan Data</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddShift