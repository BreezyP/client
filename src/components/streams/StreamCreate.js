import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { createStream } from "../../actions";

class StreamCreate extends React.Component{

    renderHelperText = () => {

        return "this is a test";

    };

    renderInput = (formProps) => {
        //formProps.input is shorthand for onChange={formProps.input.onChange} value={formProps.input.value}
        return (
            <div className="field">

                <TextField error={formProps.input.value === "" && formProps.meta.touched}
                           helperText={formProps.meta.touched && formProps.meta.error || ""}
                           id="standard-basic" label={formProps.label}{...formProps.input}/>
            </div>
            );
    };

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Title: "/>
                <Field name="description" component={this.renderInput} label="Description: "/>
                <Button variant="contained" type="submit" color="primary">Submit</Button>
            </form>
        );
    }
}

const validate = (formValues) => {

    const errors = {};

    if(!formValues.title){
        errors.title = 'You must enter a title.';
    }
    if(!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;

};

const formWrapped = reduxForm({ form: 'streamCreate', validate: validate })(StreamCreate);

export default connect(null, { createStream })(formWrapped);