import React from 'react'

const FormField = (props) => {

    const {name, label, formik} = props
    const error = formik['touched'][name] && formik['errors'][name]

    return (
        <div className="input-wrapper">
            <label htmlFor={name}>
                {label}
            </label>

            <input 
                {...props} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik['values'][name] || ''}
                id={props.name} 
                className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                    ${error
                        ? `border-red-600 border-red-600`
                        : `focus:outline-none focus:bg-white focus:border-blue-500`
                    }
                `}
            />
            {error
                ? (<span className="mt-2 text-sm text-red-600">{formik['errors'][name]}</span>)
                : (null)}
        </div>
    )
}

export default FormField