import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import $ from 'jquery';

import Map from './components/Map.jsx';
import Header from './components/Header.jsx';
import Itineraries from './components/Itineraries.jsx';
import NewItineraryModal from './components/NewItineraryModal.jsx';
import CurrentItineraryModal from './components/CurrentItineraryModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itineraries: [],
      currentItinerary: {},
      showItineraryModal: false,
      showCurrentItineraryModal: false
    }

    this.getItineraries = this.getItineraries.bind(this);
    this.openNewItinerary = this.openNewItinerary.bind(this);
    this.closeNewItinerary = this.closeNewItinerary.bind(this);
    this.openCurrentItinerary = this.openCurrentItinerary.bind(this);
    this.closeCurrentItinerary = this.closeCurrentItinerary.bind(this);
    this.handleItineraryClick = this.handleItineraryClick.bind(this);
  }

  openNewItinerary() {
    console.log('Calling new itinerary');
    this.setState({
      showItineraryModal: true
    });
  }

  closeNewItinerary() {
    this.setState({
      showItineraryModal: false
    });
  }

  openCurrentItinerary() {
    this.setState({
      showCurrentItineraryModal: true
    });
  }

  closeCurrentItinerary() {
    this.setState({
      showCurrentItineraryModal: false
    });
  }

  handleItineraryClick(clickedIndex) {
    this.setState({
      currentItinerary: this.state.itineraries[clickedIndex]
    });
    this.openCurrentItinerary();
  }

  getItineraries(userId) {
    $.get('/api/users/' + userId + '/itineraries', async (itineraries) => {
      // TODO: Replace static itinerary ids with data once db is hooked up
      //console.log(data);
      // var itineraryPromises = data.map(async (itinerary) => {
      //   return await $.get('api/itineraries/' + itinerary);
      // });
      // var newItineraries = await Promise.all(itineraryPromises);
      // console.log("newItineraries", newItineraries);
      console.log(itineraries);
      this.setState({
        itineraries: itineraries
      })
    });
  }

  componentDidMount() {
    this.getItineraries('Octodog');
  }

  updateCurrentItinerary() {
  }

  render () {
    return (
      <Grid>
        <Header />
        <Row className="show-grid">
          <Col md={5}>
            <Button bsStyle="primary" onClick={this.openNewItinerary}>Create New Itinerary</Button>
            <Itineraries itineraries={this.state.itineraries} handleItineraryClick={this.handleItineraryClick}/>
            <CurrentItineraryModal show={this.state.showCurrentItineraryModal} hide={this.closeCurrentItinerary} currentItinerary={this.state.currentItinerary}></CurrentItineraryModal>
            <NewItineraryModal show={this.state.showItineraryModal} hide={this.closeNewItinerary}></NewItineraryModal>
          </Col>
          <Col md={7}>
            <Map currentItinerary={this.state.currentItinerary}/>
          </Col>
        </Row>
     </Grid>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
