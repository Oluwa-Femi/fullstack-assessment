export const findByField = async (Model, firstname, lastname, email ) => {
    const doc = await Model.find({
      $or: [{ firstname }, { lastname }, { email } ]
    })
      .select('firstname lastname email')
      .lean()
      .exec()
      .then((result) => result)
      .catch((error) => error);
    return doc;
  };

  export const getOneByEmail = async (Model, email) => {
    const doc = await Model.findOne({ email })
      .select(
        'email firstname lastname password'
      )
      .exec()
      .then((result) => result)
      .catch((error) => error);
    return doc;
  };

  export const getOneByEmailUser = async (Model, email) => {
    const doc = await Model.findOne({ email })
      .lean()
      .exec()
      .then((result) => result)
      .catch((error) => error);
    return doc;
  };