import { useNavigate } from 'react-router-dom';
import { Image, LoadingOverlay, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { UnSignedHeader } from '@atoms/UnsignedHeader';
import { BIG_Z_INDEX } from '@constants';
import { PATH } from '@constants';
import { SignUpForm, SignupSchema } from '@organisms/SignupForm';
import { useSignUpUserMutation } from '@redux/api/authenticationApi';
import { ErrorResponse } from 'types';
import { httpClient, saveAccessTokenToLS, toastify } from '@utils';
import Girl1 from '@assets/girl.jpeg';
import Girl2 from '@assets/girl2.jpeg';

export const SignUpPage = () => {
  const [signUpUser] = useSignUpUserMutation();
  const [visible, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const onSubmit = (values: SignupSchema) => {
    const { username, email, password } = values;
    open();
    signUpUser({ username, email, password }).then((res) => {
      if (res.data) {
        httpClient.setToken(res.data.data.token);
        saveAccessTokenToLS(res.data.data.token);
        close();
        navigate(PATH.ROOT_PAGE);
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
        close();
      }
    });
  };

  return (
    <div className='h-screen w-screen'>
      <div className='h-headerHeight flex items-center bg-blue-400 px-4'>
        <UnSignedHeader />
      </div>
      <div className='h-contentHeight flex flex-col justify-center gap-7'>
        <div className='flex h-[405px] items-center justify-evenly'>
          <div className='mt-3'>
            <Image className='h-64 w-80 object-contain' src={Girl1} />
          </div>
          <div className='relative w-[400px] rounded border bg-white px-6 py-5 shadow-[0px_0px_15px_rgba(0,0,0,0.2)]'>
            <LoadingOverlay
              visible={visible}
              zIndex={BIG_Z_INDEX}
              overlayProps={{ radius: 'sm', blur: 2 }}
              loaderProps={{ color: 'green' }}
            />
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col justify-between gap-2 text-center'>
                <span className='text-xl font-bold text-blue-500'>
                  Sign Up Form
                </span>
              </div>
              <SignUpForm onSubmit={onSubmit} />
            </div>
          </div>
          <div>
            <Image className='h-72 w-80 object-contain' src={Girl2} />
          </div>
        </div>
      </div>
    </div>
  );
};
