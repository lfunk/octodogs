const express = require('express');
const router = express.Router();
const controller = require('../../db/controllers/itinerary.js');

router.route('/')
  .post(function(req, res) {
    // TODO: This should save a new itinerary to the database
    // Uncomment the below and delete the extra res.send when the controller is ready.
    let itinerary = req.body;
    console.log("itinerary received: ", itinerary);
    controller.saveNewItinerary(itinerary, function(err, result) {
      if (err) {
        return console.error(err);
      }
      res.send('Itinerary saved.'); // change as needed
      //res.send('POST on /api/itineraries'); // DELETE ME WHEN DONE
    });
  });

// Get an itinerary by its ID
router.route('/:itinid')
  .get(function(req, res) {
    let itinId = req.params.itinid;
    controller.getItineraryById(itinId, function(err, result) {
      if (err) {
        return console.error(err);
      }
      res.send(result[0]);
    });
  });

router.route('/:itinid')
  .put(function(req, res) {
    let itinId = req.params.itinid;
    // TODO: This should update an itinerary non-stop information. Use PUT /:itinid/stops to save new stops
    // Uncomment the below and delete the extra res.send when the controller is ready.
    /*
    controller.updateItineraryInfo(itinId, update, function(err, result) {
      if (err) {
        return console.error(err);
      }
      res.send('Itinerary updated.'); // change as needed
    */
    res.send('PUT on /api/itineraries/' + itinId); // DELETE ME WHEN DONE
  });

// Get all stops in an itinerary
router.route('/:itinid/stops')
  .get(function(req, res) {
    let itinId = req.params.itinid;
    controller.getItineraryById(itinId, function(err, result) {
      if (err) {
        return console.error(err);
      }
      res.send(result[0].stops);
    });
  });

router.route('/:itinid/stops')
  .put(function(req, res) {
    let itinId = req.params.itinid;
    // TODO: This should save a new stop to an itinerary
    // Uncomment the below and delete the extra res.send when the controller is ready.
    /*
    controller.saveNewStop(itinId, stop, function(err, result) {
      if (err) {
        return console.error(err);
      }
      res.send('Stop saved.'); // change as needed
    */
    res.send('PUT on /api/itineraries/' + itinId + '/stops'); // DELETE ME WHEN DONE
  });

// TODO: Some kind of route to update a stop? Maybe PUT on /:itinid/stops/:index

module.exports = router;