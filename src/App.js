import classes from "./App.module.css";

import React, { Component } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { CSSTransition } from "react-transition-group";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const haveContacts = localStorage.getItem("contacts");
    if (haveContacts) {
      this.setState({
        contacts: JSON.parse(haveContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  Rename = (e) => {
    const value = e.target.value;
    this.setState({ filter: value });
  };

  Notify_exist_contact(contact) {
    const notify = () =>
      toast(`${contact.name} уже есть в контактах!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
  }

  addContact = (contact) => {
    const isOldContact = this.state.contacts.some(
      (oldContact) =>
        oldContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isOldContact) {
      toast.error(`${contact.name} уже есть в контактах`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (contact.name === "" || contact.number === "") {
      toast.error(`Введено пустое значение!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (contact.name.length < 3) {
      toast.error(`Введено слишком короткое имя!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (contact.number.length < 6) {
      toast.error(`Введен слишком короткий номер телефона!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };
  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
    return (
      <>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="fadePhone"
          unmountOnExit
        >
          <h1 className={classes.titleName}>Phonebook</h1>
        </CSSTransition>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ContactForm submitForm={this.addContact}></ContactForm>
        <h2 className={classes.minTitleName}>Contacts</h2>

        <CSSTransition
          in={contacts.length > 1}
          timeout={500}
          classNames="filterPhone"
          unmountOnExit
        >
          <Filter filter={filter} onRename={this.Rename}></Filter>
        </CSSTransition>

        <h2 className={classes.minTitleName}>Contacts List</h2>

        <ContactList
          contacts={filterContacts}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
