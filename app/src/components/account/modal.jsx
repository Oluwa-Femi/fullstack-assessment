import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import MonoConnect from '@mono.co/connect.js';
import { useAppContext } from 'context/AppContext';
import Modal from 'components/utils/Modal/Modal';
import Icons from 'components/utils/Icons/Icons';
import Button from 'components/utils/Button/Button';

export default function AccountModal() {
  const [state, setState] = useAppContext();
  const [loading, setLoading] = useState(false);

  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: async ({ code }) => {
        setLoading(true);

        try {
          const { data } = await axios.post('/account/connect', { code });
          setState({ ...state, user: { ...state.user, accountsCount: 1 } });
          toast.success(data.data.message, {
            duration: 4000,
            position: 'top-right',
          });
        } catch (error) {
          toast.error(
            error.response.data.error.message || 'something went wrong',
            {
              duration: 4000,
              position: 'top-right',
            }
          );
        } finally {
          setLoading(false);
        }
      },
      key: process.env.REACT_APP_MONO_PUB_KEY,
    });

    monoInstance.setup();

    return monoInstance;
  }, []);

  const handleClick = () => {
    monoConnect.open();
  };

  return (
    <>
      <Toaster />

      <Modal>
        <div className='flex flex-col items-center'>
          <Icons icon={'padlock'} fill={'#FFF'} />
          <div className='flex flex-col items-center mt-4 mb-12'>
            <span className='flex flex-col text-3xl mb-4'>Final Step</span>
            <span>Link your Bank Account in seconds</span>
          </div>
          <Button
            type={'button'}
            variant={'light'}
            disabled={loading}
            handleClick={handleClick}
            customClass={'font-bold'}
          >
            <span className='flex flex-row justify-between items-center w-1/2'>
              {loading ? 'PLEASE WAIT...' : 'LINK NOW'}
              <Icons icon={'link'} />
            </span>
          </Button>
        </div>
      </Modal>
    </>
  );
}
