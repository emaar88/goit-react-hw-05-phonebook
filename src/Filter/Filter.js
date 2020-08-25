import React from "react";
import PropTypes from "prop-types";
import classes from "./Filter.module.css";

const Filter = ({ filter, onRename }) => {
  return (
    <>
      <div className={classes.container}>
        <form className={classes.form}>
          <label>Find contacts by name</label>
          <input
            className={classes.formFilter}
            type="text"
            value={filter}
            onChange={onRename}
          />
        </form>
      </div>
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default Filter;
