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