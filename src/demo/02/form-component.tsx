import { FormEvent, useCallback, useMemo, useState } from 'react'

/**
 * @description useForm
 * @author qingsds
 */
const useForm = (validators: { [key: string]: any }) => {
    const [values, setValues] = useState<{ [key: string]: any }>({})
    const [errors, setErrors] = useState<{ [key: string]: any }>()

    const setFieldValue = useCallback(
        (name: string, value: any) => {
            setValues(values => ({ ...values, [name]: value }))
            // 表单验证
            if (validators[name]) {
                const errMessage = validators[name](value)
                setErrors(errors => ({ ...errors, [name]: errMessage || null }))
            }
        },
        [validators]
    )

    return { values, errors, setFieldValue }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const validators = useMemo(
        () => ({
            name: function (value: string) {
                if (value.length <= 1) {
                    return 'Name length should be no less than 2.'
                }
                return null
            },
            email: function (value: string) {
                if (!value.includes('@')) {
                    return 'Invalid email address'
                }
                return null
            },
        }),
        []
    )
    const { values, errors, setFieldValue } = useForm(validators)

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>email :</label>
                <input
                    type='text'
                    value={values.email || ''}
                    onChange={e => setFieldValue('email', e.target.value)}
                />
                {values.email && (
                    <span style={{ color: 'red' }}>{errors?.email}</span>
                )}
            </div>
            <div>
                <label>name :</label>
                <input
                    type='text'
                    value={values.name || ''}
                    onChange={e => setFieldValue('name', e.target.value)}
                />
                {values.email && (
                    <span style={{ color: 'red' }}>{errors?.name}</span>
                )}
            </div>
            <br />
            <button type={'submit'}>提交</button>
        </form>
    )
}
