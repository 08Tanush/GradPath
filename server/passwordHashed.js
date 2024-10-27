const bcrypt = require('bcrypt');

const getHashedString = async (inputString) => {
    try {
        const saltRounds = 10; // The number of salt rounds (adjustable for complexity)
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedString = await bcrypt.hash(inputString, salt);
        return hashedString;
    } catch (error) {
        console.error('Error hashing string:', error);
        throw error;
    }
};

// Example usage
getHashedString('hashed_pass').then(hashed => console.log('Hashed string:', hashed));