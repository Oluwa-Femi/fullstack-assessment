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

  export const getUserPassword = async (Model, _id) => {
    const doc = await Model.findOne({ _id })
      .select('-__v')
      .lean()
      .exec()
      .then((result) => result)
      .catch((error) => error);
    return doc;
  };

  export const updatePassword = async (Model, data) => {
    const { _id, password } = data;
    const doc = await Model.findOneAndUpdate(
      { _id },
      {
        $set: { password }
      },
      { upsert: true, new: true }
    )
      .select('-__v')
      .lean()
      .exec()
      .then((result) => result)
      .catch((error) => error);
    return doc;
  };