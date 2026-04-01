import { fetchUserDetails } from "../../services/BankServices/userDetails.js";

export const userDetailsController = async (req, res, next) => {

    const userId = req.user.userId;

    const data = await fetchUserDetails(userId);

    if (!data) {
        throw new Error('Internal error while fetching user details in service controller');
    }

    res
    .status(200)
    .json(data)
}