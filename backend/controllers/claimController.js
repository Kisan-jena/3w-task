import userModel from "../models/userModels.js";
import claimsHistoryModel from "../models/calimsHistory.js";

const claimPoints = async (req, res) => {
    try {
        const { userId } = req.params;
        const { points } = req.body;

        // Validation
        if (!(points >= 1 && points <= 10)) {
            return res.status(400).json({ message: "Invalid or missing points (1 to 10)" });
        }

        // Update totalPoints using $inc (atomic & efficient)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { totalPoints: points } },
            { new: true } // Return updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create claim history entry
        const history = await claimsHistoryModel.create({
            userId,
            points,
            timeStamp: Date.now()
        });

        res.status(200).json({
            message: "Points claimed successfully",
            user: updatedUser,
            history
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getUserClaimHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get claim history for the user (no database sorting)
        const claimHistory = await claimsHistoryModel.find({ userId });

        // Manual sorting logic using loop (for future reference)
        // Instead of .sort({ timeStamp: -1 }) we implement bubble sort to sort by timeStamp (newest first)
        for (let i = 0; i < claimHistory.length - 1; i++) {
            for (let j = 0; j < claimHistory.length - 1 - i; j++) {
                // Compare timestamps - if current is older than next, swap them
                if (claimHistory[j].timeStamp < claimHistory[j + 1].timeStamp) {
                    // Swap elements to put newer timestamps first
                    let temp = claimHistory[j];
                    claimHistory[j] = claimHistory[j + 1];
                    claimHistory[j + 1] = temp;
                }
            }
        }
        // Now claimHistory is sorted by timeStamp in descending order (newest first)

        res.status(200).json({
            message: "Claim history retrieved successfully",
            user: {
                id: user._id,
                name: user.name,
                totalPoints: user.totalPoints
            },
            claimHistory,
            totalClaims: claimHistory.length
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export { claimPoints, getUserClaimHistory };
