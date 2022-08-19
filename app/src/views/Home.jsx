import { useState } from 'react';
import Icons from 'components/utils/Icons/Icons';
import SignIn from 'components/auth/Login';
import SignUp from 'components/auth/Register';

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('SignUp');

  // shift between current authentication somponent (signIn || signUp)
  const handleComponentChange = (component) => {
    setActiveComponent(component)
  }

  return (
    <div className='flex flex-col w-full h-screen bg-black'>
      <div className='flex flex-col items-center w-4/5 max-w-lg px-4 py-8 bg-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md md:w-1/2 md:px-12'>
        <Icons icon='logo' fill={'#000'} />
        {activeComponent === 'SignUp' ? <SignUp handleComponentChange={handleComponentChange} />: <SignIn handleComponentChange={handleComponentChange} />}
      </div>
    </div>
  );
}
