import React, { useState, useEffect } from "react";
import delamenta from "../api/delamenta";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import api from "../api/axios";

const GET_URL = "/1.0.0/shifts_datatables";

function SyncLogAbsen() {
  const token = localStorage.getItem("token");
  const dmtoken = localStorage.getItem("delamenta-token");

  // for datatable from backend API
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");
  const countPerPage = 10;
  const [filterLog, setFilterLog] = useState("");

  const date = new Date();

  let currentDay = String(date.getDate() + 1).padStart(2, "0");
  let currentDayV2 = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();

  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  let currentDateV2 = `${currentYear}-${currentMonth}-${currentDayV2}`;

  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndtDate] = useState(currentDate);

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [logAbsen, setLogAbsen] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  // for log absen datatables
  var bodyFormData = new FormData();

  bodyFormData.append("draw", page);
  bodyFormData.append("length", countPerPage);
  bodyFormData.append("order[0][column]", sortColumn);
  bodyFormData.append("order[0][dir]", dir);
  bodyFormData.append("start", start);
  bodyFormData.append("search[value]", filterLog);
  // bodyFormData.append("columns[0][search][value]", "");
  bodyFormData.append("start_date", startDate);
  bodyFormData.append("end_date", endDate);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    setStartDate(value);
    setEndtDate(value);
    console.log(value);
  };

  const getVehicleList = async () => {
    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    try {
      await delamenta.get("/kendaraan/master?page=1&limit=10").then((res) => {
        setVehicleList(res.data.data.rows);
        console.log(res.data.data.rows);
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Coba login kembali",
      });
    }
  };

  const getLogAbsenDB = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api({
        method: "post",
        url: GET_URL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        setLogAbsen(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
      // setIsLoading(false)
      localStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Coba login kembali",
      });
      // setTimeout(function () {
      //   window.location.reload(true);
      // }, 1000);
    }
  };

  const handleSync = async () => {
    const tempDmId = [];
    const tempId = [];

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;

    Swal.fire({
      title: "Syncing",
      icon: "info",
      timer: 4000,
      timerProgressBar: true,
    });

    try {
      // get all the driver id from each vehicle delameta based on selected date
      for (const item of vehicleList) {
        await delamenta
          .get(
            `/transaksi-in/kendaraan?id_kendaraan=${item.id}&create_date=${selectedDate}`
          )
          .then((res) => {
            tempDmId.push(res.data.data.id_driver);
          });
      }
      // get all the driver number from log absen datatable based on selected date
      await api({
        method: "post",
        url: GET_URL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        res.data.data.forEach((element) => {
          tempId.push(element[2]);
        });
      });
      // compare which id is unique (not from both array)
      let uniqueDm = tempDmId.filter((o) => tempId.indexOf(o) === -1);
      let unique = tempId.filter((o) => tempDmId.indexOf(o) === -1);
      console.log(uniqueDm.concat(unique));

      const tempUnique = uniqueDm.concat(unique);
      // call function each unique id
      tempUnique.forEach((id) => {
        getDelamentaData(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDelamentaData = async (id) => {
    const temp = [];
    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    // push all the log absen data of the selected date from delameta
    try {
      for (const item of vehicleList) {
        await delamenta
          .get(
            `/transaksi-in/kendaraan?id_kendaraan=${item.id}&create_date=${currentDate}`
          )
          .then((res) => {
            temp.push(res.data.data);
          });
      }
      // check if there is a match between the id we passed and the id_driver
      let objData = temp.find((o) => o.id_driver === id);
      // create a new object if theres a match
      console.log(objData);

      const absenData = {
        number: objData.id_driver,
        date: selectedDate,
        tap_in_time: objData.waktu_login,
        tap_out_time: objData.waktu_logout,
      };
      // post the data to the backend
      await api.post("/1.0.0/shifts", absenData);
      temp = [];
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Menambahkan Data Log Absen",
        text: "Gagal menambahkan log absen!",
      });
    }
  };

  useEffect(() => {
    getLogAbsenDB();
    getVehicleList();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary shadow rounded"
        data-bs-toggle="modal"
        data-bs-target="#modalSyncAbsen"
      >
        <i className="fa-solid fa-clock nav-link-icon"></i> Sync
      </button>

      <div
        class="modal fade"
        id="modalSyncAbsen"
        tabindex="-1"
        aria-labelledby="modalSyncAbsenLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalSyncAbsenLabel">
                Sync Log Absen
              </h1>
            </div>
            <div class="modal-body">
              <form
                class="row g-3 needs-validation px-5"
                onSubmit={handleSync}
                autoComplete="off"
              >
                <div class="row g-3 pt-4">
                  <div class="col-md-12">
                    <label for="validationTanggalBC" class="form-label">
                      Tanggal Absen
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      id="validationTanggalBC"
                      placeholder="Contoh: 123"
                      name="tanggal"
                      value={selectedDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-6 text-end mt-4">
                    <button
                      type="button"
                      class="btn btn-secondary shadow rounded"
                      data-bs-dismiss="modal"
                    >
                      Tutup
                    </button>
                  </div>
                  <div className="col-6 text-start mt-4">
                    <button
                      class="btn btn-success shadow rounded"
                      type="submit"
                    >
                      Sync
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyncLogAbsen;
