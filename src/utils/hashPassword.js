import bcrypt from 'bcryptjs';

const comparePassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

export default comparePassword;
