export const failure = (code, status, message = 'An error occurred', res) => {
    const errorObject = {
      status,
      message
    };
  
    return res.status(code).send(errorObject);
  };

  export const success = (res, code, data = {}) => {
    const successObject = {
      status: 'success',
      data
    };
  
    return res.status(code).send(successObject);
  };