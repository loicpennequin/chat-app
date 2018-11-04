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
    let { type, id, label, name, options, onChange, ...rest } = field;

    let Field;
    let FieldOption;
    let className;
    let optionClassName;

    switch (type) {
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

    options = options?.map((opt, i) => (
        <label className="radio-label" key={`${id}-${opt.id}`}>
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
        <div className={`form-field field-${type}`}>
            {label ? (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            ) : null}
            <Field
                type={type}
                field={name}
                id={id}
                className={`input input-${className}`}
                onChange={onChange && (e => onChange(e.target.value))}
                {...rest}
            >
                {options}
            </Field>
            {errors && <p className="field-error">{errors[0]}</p>}
        </div>
    );
};

class PnwForm extends Component {
    render() {
        const { fields, onSubmit, errors, SubmitButton, ...rest } = this.props;
        return (
            <Form onSubmit={formState => onSubmit(formState)} {...rest}>
                {fields.map(field => (
                    <FormField
                        key={field.id}
                        field={field}
                        errors={errors?.[field.name]}
                    />
                ))}
                {SubmitButton ? (
                    <SubmitButton />
                ) : (
                    <div className="form-field">
                        <button type="submit" className="input input-submit">
                            Submit
                        </button>
                    </div>
                )}
            </Form>
        );
    }
}

export default PnwForm;
