exports.prepareUserResponse = prepareUserResponse = takeUser => ({
  user: {
    email: takeUser.email,
    subscription: takeUser.subscription,
  },
});
