import * as Yup from 'yup';

import { MESSAGES } from '@constants';
import { MINIMUM_PASSWORD_LENGTH } from '@constants';

const handleConfirmPasswordYup = (refString: string) =>
  Yup.string()
    .required(MESSAGES.REQUIRED_PASSWORD)
    .min(MINIMUM_PASSWORD_LENGTH, MESSAGES.PASSWORD_AT_LEAST_SIX_CHARACTERS)

    .oneOf([Yup.ref(refString)], MESSAGES.PASSWORDS_DO_NOT_MATCH);

export const signUpSchema = Yup.object().shape({
  username: Yup.string().required(MESSAGES.REQUIRED_USERNAME),
  email: Yup.string()
    .email(MESSAGES.INVALID_EMAIL)
    .required(MESSAGES.REQUIRED_EMAIL),
  password: Yup.string()
    .required(MESSAGES.REQUIRED_PASSWORD)
    .min(MINIMUM_PASSWORD_LENGTH, MESSAGES.PASSWORD_AT_LEAST_SIX_CHARACTERS),
  confirmPassword: handleConfirmPasswordYup('password'),
});
