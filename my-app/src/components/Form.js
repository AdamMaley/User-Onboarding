import React from 'react'
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const UserForm = ({values, handleChange}) => {
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
                    
               </label>

               <label htmlFor="email">
                   Email:
                    <Field
                    id="email"
                    type="text"
                    name="email"
                    />
                    
               </label>

               <label htmlFor="password">
                   Password:
                    <Field
                    id="password"
                    type="text"
                    name="password"
                    /> 
               </label>

                <Field className="dropdown" as="select" id="role" name="role">
                    <option 
                    disabled>Choose an option</option>
                    <option value="ui">UI</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                </Field> 
        
                <label className="checkbox-container" htmlFor="terms">
                    <Field 
                    type ="checkbox"
                    name="terms"
                    id="terms"
                    check={values.terms} />
                    I have read and agree to the Terms of Service.
                </label>


               <button>Submit!</button>
           </Form> 
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
    }
})(UserForm);

// replaced UserForm with FormikUserForm
export default FormikUserForm;