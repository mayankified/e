const jwt = require('jsonwebtoken');

// Creating the token and sending the token through it
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Calculate expiration date
    const expiresIn = process.env.COOKIE_EXPIRE || 24 * 60 * 60 * 1000; // Default to 1 day
    const expires = new Date(Date.now() + expiresIn);

    // Options for cookie
    const options = {
        expires,
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;


// OK REMEMBER COOKIE KE ANDAR HUM 3 VARIABLES PASS KRTE HE EK TU TOKEN AUR USKE VALUE AND THEN THE OPTIONS KE USKA SUCCESS MESSAGE KA HOGA AUR JO BHI MESSAGE HAME BHEJNA HO VO
