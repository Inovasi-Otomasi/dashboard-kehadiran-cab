import React, {useState} from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


const BASE_URL= "/1.0.0/routes"

function AddRoute() { 

    const navigate = useNavigate()
    
    const [state, setState] = useState({
        number: null,
        code: "",
        start_point: "",
        end_point: "",
        total_income: null
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
            total_income: state.total_income
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
            setTimeout(function(){
                window.location.reload();
            }, 500);


        } catch (error) {
            console.log(error)
        }
    }

  return (  

    <div className='container-fluid pt-4 text-lg-start'>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Daftar Data Route
        </button>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-md-down">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Data Route</h1>
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

                        <div class="col-md-6">
                            <label for="validationCustom03" class="form-label">Total Pendapatan</label>
                            <input type="text" class="form-control" id="validationCustom03" 
                            placeholder='1xxxxxxx' name='total_income' value={state.total_income} onChange={handleChange} required/>
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

export default AddRoute