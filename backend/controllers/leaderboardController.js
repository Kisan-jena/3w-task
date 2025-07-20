import userModel from "../models/userModels.js";

// Leaderboard showing both approaches
const getLeaderboard = async (req, res) => {
    try {
        // Get all users without sorting
        const users = await userModel.find().select('name totalPoints');

        // APPROACH 1: Manual sorting logic using bubble sort (for future reference)
        const bubbleSortUsers = [...users]; // Create copy for bubble sort
        for (let i = 0; i < bubbleSortUsers.length - 1; i++) {
            for (let j = 0; j < bubbleSortUsers.length - 1 - i; j++) {
                // Compare totalPoints - if current is lower than next, swap them
                if (bubbleSortUsers[j].totalPoints < bubbleSortUsers[j + 1].totalPoints) {
                    // Swap elements to put higher points first
                    let temp = bubbleSortUsers[j];
                    bubbleSortUsers[j] = bubbleSortUsers[j + 1];
                    bubbleSortUsers[j + 1] = temp;
                }
            }
        }
        // Now bubbleSortUsers array is sorted by totalPoints in descending order (highest first)

        // APPROACH 2: Using .sort() method (commented for reference)
        // const sortedUsers = users.sort((a, b) => b.totalPoints - a.totalPoints);
        // Explanation of .sort() method:
        // - .sort() takes a compare function (a, b)
        // - If return value is > 0, 'b' comes before 'a' 
        // - If return value is < 0, 'a' comes before 'b'
        // - b.totalPoints - a.totalPoints gives descending order (highest first)
        // - For ascending order, use: a.totalPoints - b.totalPoints

        // APPROACH 2: Actual .sort() implementation (commented out)
        // const sortUsers = [...users]; // Create copy for .sort method
        // const sortedUsers = sortUsers.sort((a, b) => b.totalPoints - a.totalPoints);
        
        // Both approaches give same result - you can use either bubbleSortUsers or sortedUsers

        // Add ranking to each user (using bubble sort result)
        const leaderboard = bubbleSortUsers.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            totalPoints: user.totalPoints,
            userId: user._id
        }));

        res.status(200).json({
            message: "Leaderboard retrieved successfully",
            leaderboard,
            totalUsers: leaderboard.length
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export { getLeaderboard};
