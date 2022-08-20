import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAppContext } from 'context/AppContext';
import Input from 'components/utils/Input/Input';
import Button from 'components/utils/Button/Button';
  
export default function SignIn({ handleComponentChange }) {
  const [state, setState] = useAppContext();
  // loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // form state skeleton
  const [info, setInfo] = useState({
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
      const { data } = await axios.post('/auth/login', info);
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
    <form
      className='flex flex-col items-center text-black py-6 w-full'
      onSubmit={handleSubmit}
    >
      <Toaster />

      <span className='flex flex-col mb-8'>Securely login to your account</span>
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
      <div className='flex fex-row justify-between w-full my-4'>
        <span className='flex flex-col text-sm'>Remember me</span>
        <span className='flex flex-col text-sm'>Forgot password?</span>
      </div>
      <div className='form-control w-full my-3'>
        <Button type={'submit'} disabled={loading} variant={'dark'} customClass={'uppercase'}>
          log in
        </Button>
      </div>
      <div className='inline text-sm text-blue-700'>
        Don't have an account?{' '}
        <span
          className='underline cursor-pointer'
          onClick={() => handleComponentChange('SignUp')}
        >
          Sign up
        </span>
      </div>
    </form>
  );
}
