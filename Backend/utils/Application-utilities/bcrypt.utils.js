import bcrypt from 'bcryptjs';
import { User } from '../../models/user.model.js';
import { errorResponse } from '../responseHandling-&-AsyncHandling/errorResponse.js';

export async function bcryptCompare(mobileNo, password) {
    const user = await User.findOne({ mobileNo: mobileNo });
    if (!user) {
        throw new errorResponse(401, 'Invalid mobileNo', 'User doesnt exist with this mobile number');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword === false) {
        throw new errorResponse(401, 'Invalid password', 'Password is incorrect');
    }

    return user._id;

}