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
      author: "nugi",
    });
  },
  updateNote: async (parent, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        // find and update note with this id
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
};
