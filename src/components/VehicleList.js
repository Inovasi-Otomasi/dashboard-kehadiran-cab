import React, { useState, useEffect } from "react";
import api from "../api/axios";
// import DataTable from "react-data-table-component";

const token = localStorage.getItem("token");

function VehicleList() {
  const [routes, setRoutes] = useState([]);

  const getData = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get("/1.0.0/routes").then((res) => {
        setRoutes(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex flex-row gap-5">
      {routes.length
        ? routes.map((item) => {
            return (
              <div className="col-3-md">
                <div className="card">
                  <div className="card-body">
                    <h5 className="text-center fw-light">Trayek {item.code}</h5>
                    <ul className="list-group ">
                      {JSON.parse(item.vehicles).map((vh) => {
                        return (
                          <li className="list-group-item fw-bolder">
                            {vh.label}
                          </li>
                        );
                      })}
                    </ul>
                    {/* <VehicleTable
                      number={item.number}
                      vehicles={JSON.parse(item.vehicles)}
                    /> */}
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default VehicleList;
