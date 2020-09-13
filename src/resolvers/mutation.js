const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('gravatar');

module.exports = {
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'nugi',
    });
  },
  updateNote: async (parent, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        // find and update note that has this id
        _id: id,
      },
      {
        // ini yang akan di update
        $set: {
          content: content,
        },
      },
      {
        // this is just to show newly updated data back to us
        new: true,
      }
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // normalize email address
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bcrypt.hash(password, 10);
    // create the gravatar url
    const avatar = gravatar.url(email);

    try {
      // crete user's document
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      // if there's a problem creating the account, throw an error
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // normalize email address
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      // ini artinya, cari match di user dengan username OR email ini
      // jadi, saat login, user cukup masukkan username ATAU email
      $or: [{ email }, { username }],
    });
    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }
    // if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }
    // ambil user id dan buat tokennya
    // app hanya akan mengenali user dari id token nya, bukan username, email, atau password
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
