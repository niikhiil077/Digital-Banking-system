import { Bank } from "../../models/bank.model.js";
import { User } from "../../models/user.model.js"

export const fetchUserDetails = async (userId) => {

    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new Error('User id is invalid while providing userDetails');
    }

    const bank = await Bank.findOne({ accountHolderId: userId });

    if (!bank) {
        throw new Error('Error fetching users bank from userId while sending user Details')
    }

    const data = {
        user: {
            name: user.name,
            mobileNo: user.mobileNo,
            email: user.email,
            branch: user.branch,
            accType: user.accType
        },
        bank: {
            accNo: bank.accNo,
            IFSCcode: bank.IFSCcode,
            balance: bank.balance
        }

    }

    return data;

}