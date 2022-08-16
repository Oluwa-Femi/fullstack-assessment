export const firstnameRule = (firstname) => ({
  [firstname]: {
    presence: true,
    length: {
      minimum: 2
    }
  }
});

export const lastnameRule = (lastname) => ({
    [lastname]: {
      presence: true,
      length: {
        minimum: 2
      }
    }
  });

export const emailRule = {
  email: {
    presence: true,
    email: true
  }
};

export const passwordRule = (pwd) => ({
  [pwd]: {
    presence: true,
    length: {
      minimum: 8,
      maximum: 24
    }
  }
});
