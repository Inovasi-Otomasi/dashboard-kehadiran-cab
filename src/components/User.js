import React from "react";
import secureLocalStorage from "react-secure-storage";

function User() {
  const role = secureLocalStorage.getItem("role");

  return (
    <div className="d-flex justify-content-end">
      {role ? (
        <div className="d-flex flex-column">
          <i className="fa-solid fa-user text-center"></i>
          <label>{role}</label>
        </div>
      ) : null}
    </div>
  );
}

export default User;
