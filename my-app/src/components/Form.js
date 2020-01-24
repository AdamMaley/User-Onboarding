import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const UserForm = ({
    values,
    errors,
    touched,
    status
}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log('status has changed',
        status);
        status && setUsers( users =>
            [...users, status])
    }, [status]);
        return (
        <div className="user-form">
           <Form>
               <label htmlFor="name">
                   Name:
                    <Field 
                    id="name"
                    type="text"
                    name="name"
                    />
                    {touched.name && errors.name && <p className="errors">{errors.name}</p>}
                    
               </label>

               <label htmlFor="email">
                   Email:
                    <Field
                    id="email"
                    type="text"
                    name="email"
                    />
                    {touched.email && errors.email && <p className="errors">{errors.email}</p>}
                    
               </label>

               <label htmlFor="password">
                   Password:
                    <Field
                    id="password"
                    type="text"
                    name="password"
                    /> 
                    {touched.password && errors.password && <p className="errors">{errors.password}</p>}

               </label>

                <Field className="dropdown" as="select" id="role" name="role">
                    <option 
                    disabled>Choose an option</option>
                    <option value="ui">UI</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                </Field> 
        <br></br>
                <label className="checkbox-container" htmlFor="terms">
                    <Field 
                    id="terms"
                    type ="checkbox"
                    name="terms"
                    check={values.terms} />
                    I have read and agree to the Terms of Service.
                </label>

        <br></br>
               <button type="submit">Submit!</button>
           </Form> 
           {users.map(user => (
               <ul key={user.id}>
                <li>Name: {user.name}</li>
                <li>Email:{user.email}</li>
                <li>Role: {user.role}</li>
               </ul>
           ))}
        </div>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, role, terms}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            role: role || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required("Please enter a valid password of 10 characters or more")
    }),
    handleSubmit(values, {setStatus}) {
        console.log("submitting...", values);
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log("success", res);
            //sends a status update through props in UserForm with value as res.data content
            setStatus(res.data)

            //clears form inputs, from FormikBag
            // resetForm();
        })
        .catch(err => 
            console.log(err.response)
            );
    }
})(UserForm);

// replaced UserForm with FormikUserForm
export default FormikUserForm;