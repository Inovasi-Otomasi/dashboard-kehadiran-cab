import React from "react";
import { Paper, Button, Card } from "@mui/material";
import { te } from "date-fns/locale";
import { getValue } from "@testing-library/user-event/dist/utils";

function Item(props) {
  const temp2 = [];
  const temp3 = "";

  if (props.item.vehicles !== "null" || null) {
    const temp2 = [];
    const temp = JSON.parse(props.item.vehicles);
    temp.forEach((element) => {
      temp2.push(element.label);
    });
    temp3 = temp2.toString();
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="text-center">
          <h2>Trayek {props.item.code}</h2>
          {temp2 !== null ? (
            <p>
              {temp3} - {temp2.length} Kendaraan
            </p>
          ) : (
            <p>Tidak ada Kendaraan</p>
          )}
        </div>

        {/* <Button className="CheckButton">Check it out!</Button> */}
      </div>
    </div>
  );
}

export default Item;
