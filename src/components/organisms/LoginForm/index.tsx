import { Link } from 'react-router-dom';
import { Button, Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { PATH } from '@constants/routes';
import { PasswordInput } from '@molecules/PasswordInput';
import { TextInput } from '@molecules/TextInput';
import { signUpSchema } from '@utils/schemas/signup-schema';

const loginSchema = signUpSchema.pick(['email', 'password']);

export type LoginSchema = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (value: LoginSchema) => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Field
          classNameWrapper='mb-3'
          name='email'
          label={'email'}
          classNameError='min-h-0'
          component={TextInput}
        />

        <Field
          classNameWrapper='mb-3'
          name='password'
          label={'password'}
          classNameError='min-h-0'
          component={PasswordInput}
        />

        <Center className='w-full py-2'>
          <Button type='submit' style={{ width: '100%' }}>
            Login
          </Button>
        </Center>
        <div className='mt-3 flex items-center justify-center text-xs'>
          <span>Do not have account?</span>
          <Link
            to={PATH.SIGNUP_PAGE}
            className='text-malachite-500 hover:text-malachite-600 ml-1 no-underline hover:font-medium'
          >
            Sign Up
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
