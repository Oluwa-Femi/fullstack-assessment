import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAppContext } from 'context/AppContext';
import Input from 'components/utils/Input/Input';
import Button from 'components/utils/Button/Button';

export default function SignUp({ handleComponentChange }) {
  const [state, setState] = useAppContext();
  // loading 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // form state skeleton
  const [info, setInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  // handle change in input
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  //handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/auth/sign-up', info);
      // set bearer token for subsequent requests
      axios.defaults.headers.common = {
        Authorization: `Bearer ${data.data.token}`,
      };

      // set token and user credentials in local storage
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('token', JSON.stringify(data.data.token));

      // set global state
      setState({ ...state, token: data.data.token, user: data.data.user });

      navigate('/dashboard', { replace: true });
    } catch (error) {
      // use toaster to notify user of error and possible fix
      toast.error(error.response.data.error.message || 'something went wrong', {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <form className='flex flex-col items-center text-black py-6 w-full' onSubmit={handleSubmit}>
      <Toaster position='top-right' />

      <span className='flex flex-col mb-8'>
        Track all your expenses in one place
      </span>
      <div className='flex flex-col w-full md:flex-row md:justify-between'>
        <div className='form-control w-full my-3 md:w-1/2 md:mr-2'>
          <Input
            type={'text'}
            name={'firstname'}
            placeholder={'First Name'}
            required={true}
            handleChange={handleChange}
          />
        </div>
        <div className='form-control w-full my-3 md:w-1/2 md:ml-2'>
          <Input
            type={'text'}
            name={'lastname'}
            placeholder={'Last Name'}
            required={true}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className='form-control w-full my-3'>
        <Input
          type={'text'}
          name={'email'}
          placeholder={'Email'}
          required={true}
          handleChange={handleChange}
        />
      </div>
      <div className='form-control w-full my-3'>
        <Input
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          required={true}
          handleChange={handleChange}
        />
      </div>
      <div className='form-control w-full my-3'>
        <Button type={'submit'} disabled={loading} variant={'dark'} customClass={'uppercase'}>get started</Button>
      </div>

      <div className='inline text-sm text-blue-700'>
        Already have an account?{' '}
        <span
          className='underline cursor-pointer'
          onClick={() => handleComponentChange('SignIn')}
        >
          Sign in
        </span>
      </div>
    </form>
  );
}
