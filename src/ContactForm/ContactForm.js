import React, { Component } from "react";
import classes from "./ContactForm.module.css";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  resetForm = () => {
    this.setState({ name: "", number: "" });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.props.submitForm(contact);
    this.resetForm();
  };
  render() {
    const { name, number } = this.state;
    return (
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <label>
            Name
            <br />
            <input
              type="text"
              name="name"
              id={name}
              className={classes.inputText}
              placeholder="Input name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Number
            <br />
            <input
              type="text"
              name="number"
              id={number}
              className={classes.inputText}
              placeholder="Input phone number"
              value={number}
              onChange={this.handleChange}
            />
          </label>
          {/* <button className={classes.button} type="submit">
            Add Contact
          </button> */}
          <Button variant="primary" type="submit" size="lg" block>
            Add Contact
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
