import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Button from 'components/utils/Button/Button';
import Input from 'components/utils/Input/Input';
import Helpers from 'helpers/Helpers';
import Modal from 'components/utils/Modal/Modal';
import Table from 'components/utils/Table/Table';
import { useAppContext } from 'context/AppContext';

const AccountPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({ currentPage: 0, maxPage: 0 });
  const [state, setState] = useAppContext();
  const [offset, setOffset] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState('');

  // fetch all accounts
  const fetchFunction = async ({ currentOffset }) => {
    setLoading(true);

    try {
      const { data: accountsData } = await axios.get(
        Helpers.urlBuilder({
          path: '/account/accounts',
          offset: currentOffset,
        })
      );

      setPageData({
        currentPage: accountsData.currentPage,
        maxPage: accountsData.maxPage,
      });

      setState({
        ...state,
        accounts: accountsData.accounts,
      });
    } catch (error) {
      toast.error(error.response.data.error.message || 'something went wrong', {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  // handle pagination
  const handlePaginate = async (e) => {
    let currentOffset = 0;

    if (e.target.name === 'next') {
      currentOffset = offset + 10;
      setOffset(offset + 10);
    } else {
      currentOffset = offset - 10;
      setOffset(offset - 10);
    }

    fetchFunction({ currentOffset });
  };

  // handle modal toggle
  const handleModal = (e) => {
    // set an account to unlink
    const accountId = e.target.name;
    setSelectedAccountId(accountId);
    // open modal
    setModalIsOpen(!modalIsOpen);
  };

  // handle unlinking of account
  const handleUnlink = async (e) => {
    setModalIsOpen(false);
    setLoading(true);

    try {
      const { data } = await axios.post(`/account/${selectedAccountId}/disconnect`);
      toast.success(data.data.message || 'Success', {
        position: 'top-right',
        duration: 4000,
      });

      setState({ ...state, accounts: data.data.accounts });
      navigate('/dashboard/accounts')
    } catch (error) {
      toast.error(error.response.data.error.message || 'Something went wrong', {
        position: 'top-right',
        duration: 4000,
      });
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    let currentOffset = 0;
    fetchFunction({ currentOffset });
  }, []);

  return (
    <>
      <Toaster />

      {modalIsOpen ? (
        <Modal>
          <span className='text-center my-8'>
            Are you sure you want to unlink this account?
          </span>
          <div className='flex flex-col justify-between items-center w-full lg:flex-row'>
            <Button
              customClass={'bg-red-100 text-red-600 mb-8  lg:mr-3 lg:mb-0'}
              handleClick={handleUnlink}
            >
              Yes
            </Button>
            <Button variant={'dark'} handleClick={handleModal}>
              No
            </Button>
          </div>
        </Modal>
      ) : (
        <div className='w-full h-screen pt-20 lg:p-8 lg:pt-4'>
          <div className='flex flex-col w-full max-w-screen-xl h-screen p-4 md:w-[80%] lg:ml-[20%]'>
            <h1 className='text-3xl font-bold'>Accounts</h1>
            <form className='w-full'>
              <div className='w-full flex flex-col md:flex-row md:justify-between'>
                <Input
                  type={'text'}
                  placeholder={'Search linked accounts'}
                  customClass={'my-6 p-4 outline-none md:w-3/4'}
                />
                <Button
                  type={'submit'}
                  variant={'dark'}
                  customClass={'my-3 md:my-6 md:w-1/4  md:ml-8'}
                >
                  Search
                </Button>
              </div>

              <div className='float-right'>
                <label className='text-gray-500' htmlFor='filter'>
                  Filter by:{' '}
                </label>
                <select
                  className='text-gray-500 py-2 px-4 border shadow-lg outline-none cursor-pointer'
                  name='filter'
                  id='filter'
                >
                  <option value=''>--None--</option>
                  <option value='PENDING'>Available</option>
                  <option value='ACTIVE'>Unavailable</option>
                </select>
              </div>
            </form>

            <Table customClass={'mt-8'}>
              <thead className='border-b text-white bg-blue-700 rounded-t'>
                <tr>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    #
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Institution
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Account Number
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Type
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Currency
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Balance
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {loading ? (
                <tr className='animate-pulse border-b'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <div className='bg-gray-300 rounded-sm w-4 p-2'></div>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='bg-gray-300 rounded-sm w-20 p-2'></div>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='bg-gray-300 rounded-sm w-12 p-2'></div>
                  </td>
                </tr>
              ) : (
                state.accounts.map((account, i) => (
                  <tr
                    className='border-b'
                    key={account._id}
                    data-testid='table-cell'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {i + 1}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {account.account.institution.name}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {account.account.accountNumber}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {account.account.type}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {account.account.currency}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {account.account.balance}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {account.meta['data_status']}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      <Button
                        variant={'dark'}
                        customClass={'bg-red-300 text-red-700 px-4 py-1'}
                        // save name of button as account id to know account id to unlink
                        name={account.account._id}
                        handleClick={handleModal}
                      >
                        Unlink
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </Table>

            <div className='flex flex-row justify-between items-center w-full my-4'>
              <span className='flex flex-col w-[80%]'>{`page ${pageData.currentPage} of ${pageData.maxPage}`}</span>
              <span className='flex flex-row'>
                <Button
                  variant={'dark'}
                  customClass={'py-1 px-3'}
                  disabled={pageData.currentPage === 1}
                  name={'previous'}
                  handleClick={handlePaginate}
                >
                  &#8592;
                </Button>
                <Button
                  variant={'dark'}
                  customClass={'py-1 px-3 ml-4'}
                  disabled={pageData.currentPage >= pageData.maxPage}
                  name={'next'}
                  handleClick={handlePaginate}
                >
                  &#8594;
                </Button>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPage;
