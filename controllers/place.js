const Place = require("../models/place");
const user = require("../models/user");

exports.postPlace = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const artistName = req.body.artistName;
  const lng = req.body.lng;
  const lat = req.body.lat;
  const dateUploaded = req.body.dateUploaded;
  console.log("Third");
  // console.log("USER: " + JSON.stringify(req.session));

  const place = new Place({
    title: title,
    imageUrl: imageUrl,
    artistName: artistName,
    lat: lat,
    lng: lng,
    dateUploaded: dateUploaded,
    userId: req.session.user,
  });
  console.log(place);

  place
    .save()
    .then((result) => {
      console.log("place created!!!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getPlaces = (req, res, next) => {
  Place.find()
    .then((places) => {
      res.send({ places: places });
    })
    .catch((err) => console.log(err));
};

exports.postDelete = (req, res, next) => {
  console.log("delete place route being hit!!!");
  console.log(req.body);
  const prodId = req.body.productId;
  console.log(prodId);
  Place.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => console.log("place destroyed!!"))
    .catch((err) => console.log(err));
};
