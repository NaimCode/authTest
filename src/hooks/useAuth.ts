import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import useAuthStore from '../store/auth';
import { useState } from 'react';

export interface TLogin {
    email: string,
    password: string
}

export interface TRegister extends TLogin {
    name: string,
    confirmPassword: string
}


const validator = {
    email: (value: string) => {
        if (!value) {
            return 'Email is required'
        }
        if (!value.includes('@')) {
            return 'Email is invalid'
        }
        return null
    },

    password: (value: string) => {
        if (!value) {
            return 'Password is required'
        }
        if (value.length < 8) {
            return 'Password is too short'
        }
        if (!/[A-Z]/.test((value))) {
            return 'Password must include at least one uppercase letter'
        }
        if (!/[a-z]/.test((value))) {
            return 'Password must include at least one lowercase letter'
        }

        return null
    },

    name: (value: string) => {
        if (!value) {
            return 'Name is required'
        }
        //contains only letters and spaces
        if (!/^[a-zA-Z ]+$/.test(value)) {
            return 'Name can only contain letters and spaces'
        }
        return null
    },

    confirmPassword: (value: string, values: TRegister) => {
        if (!value) {
            return 'Confirm password is required'
        }
        if (value !== values.password) {
            return 'Confirm password does not match'
        }
        return null
    }
}

export const useLogin = () => {
    const login = useAuthStore(store => store.login)
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<TLogin>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: validator.email,
            password: validator.password,
        },

    });

    const onSubmit = form.onSubmit((values: TLogin) => {
        console.log('values', values)
        setIsLoading(true)
        login(values).
            then(() => notifications.show({
                title: 'Success',
                message: 'Login successfully',
                color: 'green',
                autoClose: 5000,
            })).
            catch((err) => {
                notifications.show({
                    title: 'Error',
                    message: err.response.data,
                    color: 'red',
                    autoClose: 5000,
                })
            }).
            finally(() => setIsLoading(false))
    })

    const emailProps = form.getInputProps('email')
    const passwordProps = form.getInputProps('password')

    return { onSubmit, isLoading, emailProps, passwordProps }
}

export const useRegister = () => {
    const register = useAuthStore(store => store.register)
    const form = useForm<TRegister>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            name: validator.name,
            email: validator.email,
            password: validator.password,
            confirmPassword: validator.confirmPassword,
        }

    });

    const onSubmit = form.onSubmit((values: TRegister) => {
        register(values).
            then(() => notifications.show({
                title: 'Success',
                message: 'Register successfully',
                color: 'green',
                autoClose: 5000,
            })).
            catch((err) => notifications.show({
                title: 'Error',
                message: err.response.data,
                color: 'red',
                autoClose: 5000,
            }))
    })

    const nameProps = form.getInputProps('name')
    const emailProps = form.getInputProps('email')
    const passwordProps = form.getInputProps('password')
    const confirmPasswordProps = form.getInputProps('confirmPassword')

    return { onSubmit, nameProps, emailProps, passwordProps, confirmPasswordProps }
}