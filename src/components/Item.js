import React from "react";

function Item(props) {
  let temp2 = [];
  let temp3 = "";

  if (props.item.vehicles !== "null" || null) {
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
