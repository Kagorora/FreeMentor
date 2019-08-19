import userModal from '../model/users';

class adminController {
  static allUsers(req, res) {
    if (req.user.userType === 'admin') {
      return res.status(200).json({
        status: 200,
        data: userModal,
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Forbirden route',
    });
  }

  static changeUserType(req, res) {
    if (req.user.userType === 'admin') {
      const { userId } = req.params;
      // eslint-disable-next-line radix
      const foundUser = userModal.find(usr => usr.id === parseInt(userId));
      if (foundUser && foundUser.userType === 'user') {
        const updatedUser = {
          id: foundUser.id, firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email, password: foundUser.password, address: foundUser.address, bio: foundUser.bio, occupation: foundUser.occupation, expertise: foundUser.expertise, userType: 'mentor',
        };
        userModal[userModal.indexOf(foundUser)] = updatedUser;
        return res.status(200).json({
          status: 200,
          message: 'User account changed to mentor',
          data: updatedUser,
        });
      }
      return res.status(400).json(({
        status: 400,
        error: 'user is already a mentor or admin',
      }));
    }
    return res.status(404).json({
      status: 404,
      error: 'Forbirden route',
    });
  }
}

export default adminController;
