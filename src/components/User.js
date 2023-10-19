import React from "react";
import secureLocalStorage from "react-secure-storage";

function User() {
  const role = secureLocalStorage.getItem("role");

  return (
    <div className="d-flex justify-content-end px-5 mb-3">
      {role ? (
        <div className="text-center">
          <i class="fa-solid fa-user"></i>

          <label>{role}</label>
        </div>
      ) : null}
    </div>
  );
}

export default User;
