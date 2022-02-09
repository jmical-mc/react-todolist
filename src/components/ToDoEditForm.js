import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../helpers/toDoItemApi';
import { Formik } from 'formik';
import { SubmitButton, TextInput, Label, Select, ErrorMsg } from '../helpers/theme';
import * as _ from 'ramda';

const ToDoEditForm = () => {
    let { itemId } = useParams();
    let navigate = useNavigate();

    const [item, setItem] = useState({ toDoItem: null, fetched: false, disabled: false });

    useEffect(async () => {
        const itemResponse = await get(itemId);

        setItem({ toDoItem: itemResponse, fetched: true });
    }, [])

    return (
        <div>
            Edit form for {itemId}
            {item.fetched
                ? <Formik
                    initialValues={item.toDoItem}
                    onSubmit={(values) => {
                        console.log(values);
                        navigate(-1);
                    }}
                    validate={(values) => {
                        let errors = {};

                        if (!values.content) {
                            errors.content = 'Required';
                        } else if (values.content.length < 3) {
                            errors.content = 'Too short. Minium 3 characters...'
                        } else if (values.content.includes('ass')) {
                            errors.content = 'Mind your language'
                        }

                        if (_.isEmpty(errors)) {
                            setItem(prev => ({ ...prev, disabled: false }));
                        } else {
                            setItem(prev => ({ ...prev, disabled: true }));
                        }

                        return errors;
                    }}
                    render={({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Label>
                                Content *
                                <ErrorMsg>{errors.content}</ErrorMsg>
                                <TextInput
                                    name='content'
                                    onChange={handleChange}
                                    value={values.content}
                                />
                            </Label>

                            <Label>
                                Priority
                                <Select name='priority' onChange={handleChange}
                                    value={values.priority}>
                                    <option value='low'>Low</option>
                                    <option value='high'>High</option>
                                    <option value='urgent'>Urgent</option>
                                </Select>
                            </Label>

                            <Label>
                                Done?
                                <input type='checkbox' name='done' value={values.done}
                                    checked={values.done} onChange={handleChange} />
                            </Label>
                            <br />
                            <SubmitButton type='submit' disabled={item.disabled}>Update</SubmitButton>
                        </form>
                    )}
                />
                : <p>Loading....</p>
            }
        </div>
    );
}

export default ToDoEditForm;