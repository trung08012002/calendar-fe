import { Link } from 'react-router-dom';
import { Button, Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { PATH } from '@constants/routes';
import { PasswordInput } from '@molecules/PasswordInput';
import { TextInput } from '@molecules/TextInput';
import { signUpSchema } from '@utils/schemas/signup-schema';

export type SignupSchema = yup.InferType<typeof signUpSchema>;

interface SignupFormProps {
  onSubmit: (value: SignupSchema) => void;
}

export const SignUpForm = (props: SignupFormProps) => {
  const { onSubmit } = props;
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Field
          classNameWrapper='mb-2'
          name='username'
          label={'User Name'}
          size='xs'
          component={TextInput}
        />
        <Field
          classNameWrapper='mb-2'
          name='email'
          label={'Email'}
          size='xs'
          component={TextInput}
        />
        <Field
          classNameWrapper='mb-2'
          name='password'
          label={'Password'}
          type='password'
          size='xs'
          component={PasswordInput}
        />
        <Field
          classNameWrapper='mb-2'
          name='confirmPassword'
          label={'ConfirmPassword'}
          type='password'
          size='xs'
          component={PasswordInput}
        />

        <Center className='py-2'>
          <Button type='submit' style={{ width: '100%' }}>
            Sign Up
          </Button>
        </Center>
        <div className='mt-3 flex items-center justify-center text-xs'>
          <span>Do you have account?</span>
          <Link
            to={PATH.LOGIN_PAGE}
            className='ml-1 text-blue-500 no-underline hover:font-medium hover:text-blue-400'
          >
            Login
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
