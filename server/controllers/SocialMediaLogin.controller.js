const path = require('path');
const User = require('../models/User');
const axios = require('axios');
const querystring = require('querystring');
const Github_Access_URL = 'https://github.com/login/oauth/access_token';
const Github_User_URL = 'https://api.github.com/user';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const jwtToken = require('jsonwebtoken');
const { UserNameParse } = require('../utils');
require('../config/passport'); // Import the passport configuration
const googleCallback = (req, res) => {
  const user = req.user;
  if (!user || !user.verify) {
    console.error('Authentication Error:', err);
    return res.redirect(process.env.CLIENT);
  }
  const jwtData = jwtToken.sign(
    {
      displayname: user.displayname,
      email: user.email,
      avatar: user.avatar,
      name: user?.name,
      _id: user._id,
    },
    process.env.JWTSECREAT
  );
  res.cookie('uid', jwtData, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  return res.redirect(process.env.CLIENT);
};
// Step 1: Redirect to GitHub for OAuth
//github
const GithubRedirect = async (req, res) => {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = `${process.env.SERVER}/api/auth/github/callback`;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
  );
};

const GithubCallback = async (req, res) => {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECREAT;
  const redirect_uri = `${process.env.SERVER}/api/auth/github/callback`;

  try {
    // Step 1: Exchange the code for an access token
    const response = await axios.post(
      Github_Access_URL,
      querystring.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;

    // Step 2: Get user details
    const userResponse = await axios.get(Github_User_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    let user = await User.findOne({
      email: userResponse.data.email
        ? userResponse.data.email
        : userResponse.data.login,
    }).lean();
    if (!user) {
      let hashedUsername = await UserNameParse(
        userResponse.data.email
          ? userResponse.data.email
          : userResponse.data.login + '@dna.com'
      );
      user = await new User({
        name: userResponse.data.name,
        displayname: hashedUsername,
        email: userResponse.data.email
          ? userResponse.data.email
          : userResponse.data.login,
        password: null,
        avatar: userResponse.data.avatar_url,
        verify: true,
      }).save();
    }

    // JWT token creation and redirect
    const jwtPayload = {
      displayname: user.displayname,
      email: userResponse.data.email
        ? userResponse.data.email
        : userResponse.data.login,
      avatar: user.avatar,
      name: user?.name,
      _id: user?._id,
      createdAt: user?.createdAt,
    };
    const jwtData = jwtToken.sign(jwtPayload, process.env.JWTSECREAT);
    res.cookie('uid', jwtData, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.redirect(process.env.CLIENT);
  } catch (error) {
    console.error(
      'Error during GitHub OAuth:',
      error.response ? error.response.data : error.message
    );
    res.status(500).send('Authentication failed');
  }
};

module.exports = { googleCallback, GithubCallback, GithubRedirect };
