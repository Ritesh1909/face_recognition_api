const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '6bd7b9180d584008ad51d8a1e3d6431d'
});


const handleApiCall = (req , res) => {
 
 app.models
 .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data => {
 	res.json(data);
 }).catch(err => res.status(400).json('unable to work with API'))
}

const handleApiCallFaces = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('unable to work with detection of Faces API'))
}

const handleImage = (req, res, db) => {
  
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage: handleImage, 
  handleApiCall: handleApiCall,
  handleApiCallFaces:handleApiCallFaces,
};
