import React from "react";
import Contact from "../Contact/Contact";
import PropTypes from "prop-types";
import classes from "./ContactList.module.css";
import "./ContactList.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div className={classes.container}>
      <TransitionGroup component="ul">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <CSSTransition
              key={contact.id}
              timeout={500}
              classNames="Contact"
              unmountOnExit
            >
              <li key={contact.id} className={classes.li}>
                <Contact
                  {...contact}
                  deleteContact={() => deleteContact(contact.id)}
                />
              </li>
            </CSSTransition>
          ))
        ) : (
          <li className={classes.alert}>No have contacts!</li>
        )}
      </TransitionGroup>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
