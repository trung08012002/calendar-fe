import { Anchor } from '@mantine/core';
import Logo from '@assets/calendar-logo.png';
import { PATH } from '@constants';

const HEIGHT_IMAGE = 50;

export const UnSignedHeader = () => (
  <header>
    <div className='flex items-center'>
      <Anchor href={PATH.ROOT_PAGE}>
        <img src={Logo} height={HEIGHT_IMAGE} />
      </Anchor>
    </div>
  </header>
);
