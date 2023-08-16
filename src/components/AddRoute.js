import React, {useState} from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const BASE_URL= "/1.0.0/routes"

function AddRoute() { 

    const navigate = useNavigate()
    
    const [state, setState] = useState({
        number: null,
        code: "",
        start_point: "",
        end_point: "",
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
        const routeData = {
            number: state.number,
            code: state.code,
            start_point: state.start_point,
            end_point: state.end_point,
        };
        try{
            const response = await axios.post(BASE_URL, routeData);
            console.log(response.status, response.data)
            setState({
                number: 0,
                code: "",
                start_point: "",
                end_point: "",
                total_income: 0
            })
            Swal.fire({
                icon: 'success',
                title: 'Menambahkan Data Rute',
                text: 'Sukses menambahkan rute!',
            })
            setTimeout(function(){
                window.location.reload();
            }, 500);


        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Menambahkan Data Rute',
                text: 'Gagal menambahkan rute!',
            })
        }
    }

  return (  

    <div>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Daftar Data Route
        </button>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-md-down">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Data Route</h1>
                </div>
                <div class="modal-body">
                    <form class="row g-3 needs-validation px-5"  novalidate autoComplete='off'>
                        <div class="col-md-6">
                            <label for="validationCustom01" class="form-label">Nomor</label>
                            <input type="text" class="form-control" id="validationCustom01" 
                            placeholder="123456" name='number' value={state.number} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Kode</label>
                            <input type="text" class="form-control" id="validationCustom02" 
                            placeholder="Axxxxx" name='code' value={state.code} onChange={handleChange} required/>
                        </div>
                        
                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Titik Awal Rute</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='Depok' name='start_point' value={state.start_point} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom04" class="form-label">Titik Akhir Rute</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='Kemanggisan' name='end_point' value={state.end_point} onChange={handleChange} required/>
                        </div>
                        
                        <hr/>
                        <label>Tambahkan Stop</label>
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

export default AddRoute