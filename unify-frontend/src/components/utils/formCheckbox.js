import { prepareDataForValidation } from 'formik'
import React from 'react'

const FormCheckbox = (props) => {

    const {name, label, formik} = props
    const error = formik['touched'][name] && formik['errors'][name]

    return (
        <div className="checkbox-wrapper">
            <input 
                type="checkbox"
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik['values'][name] || ''}
                id={name} 
                className={`bg-gray-200 border-2 rounded py-2 px-4 leading-tight focus:outline-none 
                    ${error
                        ? `border-red-600 border-red-600`
                        : `focus:outline-none focus:bg-white focus:border-blue-500`
                    }
                `}
            />
            <label htmlFor={name}>
                {props.children}
            </label>
            {error
                ? (<span className="mt-2 text-sm text-red-600">{formik['errors'][name]}</span>)
                : (null)}
        </div>
    )
}

export default FormCheckbox