import React, { Component } from 'react';
import {
    Form,
    Text,
    TextArea,
    RadioGroup,
    Radio,
    Checkbox,
    Select,
    Option
} from 'informed';

const FormField = ({ field, errors }) => {
    let Field;
    let FieldOption;
    let className;
    let optionClassName;

    switch (field.type) {
        case 'textarea':
            Field = TextArea;
            className = 'textarea';
            break;
        case 'radio':
            Field = RadioGroup;
            FieldOption = Radio;
            break;
            className = 'radio-group';
            optionClassName = 'radio';
        case 'checkbox':
            Field = Checkbox;
            className = 'checkbox';
            break;
        case 'select':
            Field = Select;
            FieldOption = Option;
            className = 'select';
            optionClassName = 'option';
            break;
        default:
            Field = Text;
            className = 'text';
    }

    const options =
        field.options &&
        field.options.map((opt, i) => (
            <label className="radio-label" key={`${field.id}-${opt.id}`}>
                <FieldOption
                    value={opt.value}
                    id={opt.id}
                    className={optionClassName}
                >
                    {opt.label}
                </FieldOption>
            </label>
        ));
    return (
        <div className={`form-field field-${field.type}`}>
            <label htmlFor={field.id} className="label">
                {field.label}
            </label>

            <Field
                type={field.type}
                field={field.name}
                id={field.id}
                className={`input input-${className}`}
            >
                {options}
            </Field>
            {errors && <p className="field-error">{errors[0]}</p>}
        </div>
    );
};

class PnwForm extends Component {
    render() {
        const { fields, onSubmit, errors } = this.props;
        return (
            <Form onSubmit={formState => onSubmit(formState)}>
                {fields.map(field => (
                    <FormField
                        key={field.id}
                        field={field}
                        errors={errors?.[field.name]}
                    />
                ))}
                <div className="form-field">
                    <button type="submit" className="input input-submit">
                        Submit
                    </button>
                </div>
            </Form>
        );
    }
}

export default PnwForm;
