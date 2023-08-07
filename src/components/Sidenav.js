import React, {useState} from "react";
import { navData } from "./NavData";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import styles from "./sidenav.module.css";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function Sidenav() {
  const [open, setopen] = useState(false);

  const toggleOpen = () => {
    setopen(!open);
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>
      {navData.map((item) => {
        return (
          <NavLink key={item.id} className={styles.sideitem} to={item.link}>
            {item.icon}
            <span className={open ? styles.linkText : styles.linkTextClosed}>
              {item.text}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}
