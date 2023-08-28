import { useForm } from '@mantine/form';

export interface TLogin {
  email: string,
  password: string
}

export interface TRegister extends TLogin {
  name: string,
  termsAndCondition: boolean
  confirmPassword: string
}

export const useLogin = () => {
  const form = useForm<TLogin>({

    validate: {
    },

  });

  const onSubmit = form.onSubmit((values: TLogin) => {})

  return { form, onSubmit }
}

export const useRegister = () => {
  const form = useForm<TRegister>({
    initialValues: {
      name:            '',
      email:           '',
      password:        '',
      confirmPassword: '',
      termsAndCondition: false
    },

    validate: {
    }

  });

  const onSubmit = form.onSubmit((values: TRegister) =>{})

  return { form, onSubmit}
}