import React from "react";
import styles from "./Loader.module.css";

export default (props)=> {
		return (
			<div className={`${styles.loading__spinner} ${props.loading?styles.show:''}`}>
              <img src ="images/ajax-loader.gif" className={`${styles.loading__spinnerimg}`} alt="spinner img"/>
            </div>
		);
}
