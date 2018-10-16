
const mongoose = require('mongoose');

const middleware = {
  requireFields: (reqFields) => (req, res, next) => {
    for(let field of reqFields) {
      if(!(field in req.body)) {
        const err = new Error(`Missing \`${field}\` in request body`);
        err.status = 400;
        return next(err);
      }
      if(req.body[field] === '') {
        const err = new Error(`Missing \`${field}\` contents in request body`);
        err.status = 400;
        return next(err);
      }
    }
    return next();
  },

  validateIds: (req, res, next) => {
    const {id: bodyId} = req.body;
    const {id: paramId} = req.params;

    if(bodyId) {
      if(!mongoose.Types.ObjectId.isValid(req.body.id)) {
        const err = new Error('The id is not valid');
        err.status = 400;
        return next(err);
      }
    }

    if(paramId) {
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const err = new Error('The id is not valid');
        err.status = 400;
        return next(err);
      }
    }

    if((paramId && bodyId) && (paramId !== bodyId)) {
      const err = new Error('Note id does not match. Check the note id in the request \
        body and in the URL');
      err.status = 400;
      return next(err);
    }

    return next();
  }

  
};

module.exports = middleware;