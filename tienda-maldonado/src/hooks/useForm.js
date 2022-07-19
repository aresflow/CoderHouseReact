import { useState } from 'react'

export const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState('');

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const validate = (values) => {
        if(values.email !== values.email2) {
            setErrors('El email debe coincidir')
        }

        if(values.email === values.email2) {
            setErrors('Los email coinciden')
        }

        if(values.email !== '' && values.name !== '' && values.phone !== '' && values.email === values.email2) {
            setErrors('Campos rellenados correctamente')
        }

        return errors;
    }

    return [ values, errors, handleInputChange , validate];

}