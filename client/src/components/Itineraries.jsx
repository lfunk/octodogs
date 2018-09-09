import React from 'react';
import ItineraryEntry from './ItineraryEntry.jsx';
import { ListGroup } from 'react-bootstrap';

var Itineraries = (props) => (
  <div className="itinerary">

    <h5> You have {props.itineraries.length} saved {props.itineraries.length === 1 ? 'itinerary' : 'itineraries'} </h5>

    <ListGroup componentClass="ul">
      {props.itineraries.map((itinerary, index) =>
        <ItineraryEntry
          itinerary={itinerary}
          key={itinerary._id}
          index={index}
          handleItineraryClick={props.handleItineraryClick}
        />
      )}
    </ListGroup>

  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Itineraries.propTypes = {
  itineraries: React.PropTypes.array.isRequired
};

export default Itineraries;