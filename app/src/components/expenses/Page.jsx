import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import Button from 'components/utils/Button/Button';
import Input from 'components/utils/Input/Input';
import Helpers from 'helpers/Helpers';
import Table from 'components/utils/Table/Table';
import { useAppContext } from 'context/AppContext';

const ExpensesPage = () => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({ currentPage: 0, maxPage: 0 });
  const [offset, setOffset] = useState(0);
  const [state, setState] = useAppContext();

  const fetchFunction = async ({ currentOffset }) => {
    setLoading(true);

    try {
      const { data: accountsData } = await axios.get(
        Helpers.urlBuilder({ path: '/account/accounts' })
      );

      // get the information of the first accout
      const accountId = accountsData.accounts[0].account._id;
      // use accountID to fetch transaction information for this account
      const { data: transactionsData } = await axios.get(
        Helpers.urlBuilder({ path: `/account/${accountId}/transactions`, offset: currentOffset })
    )

      setPageData({
        currentPage: transactionsData.currentPage,
        maxPage: transactionsData.maxPage,
      });

      setState({
        ...state,
        transactions: transactionsData.transactions
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


  const handleClick = async (e) => {
    let currentOffset = 0;
    if (e.target.name === 'next') {
      currentOffset = offset + 10
      setOffset(offset + 10);
    } else {
      currentOffset = offset - 10
      setOffset(offset - 10);
    }

    fetchFunction({ currentOffset });
  };

  useEffect(() => {
        let currentOffset = 0;
        fetchFunction({ currentOffset });  
  }, []);

  return (
    <>
      <Toaster />
        <div className='w-full h-screen pt-20 lg:p-8 lg:pt-4'>
          <div className='flex flex-col w-full max-w-screen-xl h-screen p-4 md:w-[80%] lg:ml-[20%]'>
            <h1 className='text-3xl font-bold'>Expenses</h1>
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
                    Type
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium w-[300px] text-white-100 px-6 py-4 text-left'
                  >
                    Narration
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Date
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-white-100 px-6 py-4 text-left'
                  >
                    Category
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
                state.transactions.map((transaction, i) => (
                  <tr
                    className='border-b'
                    key={transaction._id}
                    data-testid='table-cell'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {i + 1}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {transaction.type}
                    </td>
                    <td className='text-sm text-gray-900 text-ellipses truncate font-light max-w-[300px] px-6 py-4 overflow-hidden whitespace-nowrap'>
                      {transaction.narration}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {moment(transaction.date).format('mm-d-yyyy')}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {transaction.category}
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
                  name={'previous'}
                  disabled={pageData.currentPage === 1}
                  handleClick={handleClick}
                >
                  &#8592;
                </Button>
                <Button
                  variant={'dark'}
                  customClass={'py-1 px-3 ml-4'}
                  name={'next'}
                  disabled={pageData.currentPage >= pageData.maxPage}
                  handleClick={handleClick}
                >
                  &#8594;
                </Button>
              </span>
            </div>
          </div>
        </div>
    </>
  );
};

export default ExpensesPage;
