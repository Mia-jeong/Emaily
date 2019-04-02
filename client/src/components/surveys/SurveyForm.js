//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Survey Line", name: "subject" },
  { label: "Survey Body", name: "body" },
  { label: "Recipients List", name: "emails" }
];
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          component={SurveyField}
          type="text"
          key={name}
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            <i className="material-icons right">done</i>
            Next
          </button>
        </form>
      </div>
    );
  }
}
const validate = values => {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`;
    }
  });
  return errors;
};
export default reduxForm({ validate, form: "surveyForm" })(SurveyForm);
