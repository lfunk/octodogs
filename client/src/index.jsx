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
import AddStopModal from './components/AddStopModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itineraries: [],
      currentItinerary: {},
      showItineraryModal: false,
      showCurrentItineraryModal: false,
      showAddStopModal: false,
    }

    this.getItineraries = this.getItineraries.bind(this);
    this.openNewItinerary = this.openNewItinerary.bind(this);
    this.handleSaveNewItinerary = this.handleSaveNewItinerary.bind(this);
    this.closeNewItinerary = this.closeNewItinerary.bind(this);
    this.handleItineraryClick = this.handleItineraryClick.bind(this);
    this.closeCurrentItinerary = this.closeCurrentItinerary.bind(this);
    this.handleAddStopClick = this.handleAddStopClick.bind(this);
    this.handleSaveStopClick = this.handleSaveStopClick.bind(this);
    this.closeAddStop = this.closeAddStop.bind(this);
  }

  getItineraries(userId) {
    let serverRoute = '/api/users/' + userId + '/itineraries';

    $.get(serverRoute, data => {
      console.log("data: ", data)
      this.setState({
        itineraries: data
      });
    });
  }

  openNewItinerary() {
    console.log('Calling new itinerary');
    this.setState({
      showItineraryModal: true
    });
  }

  handleSaveNewItinerary(newItin) {

   // this.setState({ itineraries: [...[newItin], this.state.itineraries] });
      this.setState({
      itineraries: [newItin].concat(this.state.itineraries)
  })
  //  this.handleItineraryClick(this.state.itineraries.length-1);
  }

  closeNewItinerary() {
    this.setState({
      showItineraryModal: false
    });
  }

  handleItineraryClick(clickedIndex) {
    this.setState({
      currentItinerary: this.state.itineraries[clickedIndex],
      showCurrentItineraryModal: true
    });
  }

  closeCurrentItinerary() {
    this.setState({
      showCurrentItineraryModal: false
    });
  }

  handleAddStopClick() {
    this.setState({
      showAddStopModal: true
    });
  }

  handleSaveStopClick(stopData) {
    let serverRoute = '/api/itineraries/' + this.state.currentItinerary._id + '/stops';
    let params = { stop: stopData };

    $.ajax({
      method: "PUT",
      url: serverRoute,
      data: JSON.stringify(params),
      contentType: 'application/json'
    }).done(updatedItinerary => {
      this.setState({
        currentItinerary: updatedItinerary
      }, () => this.getItineraries('Octodog'));
    });

    this.closeAddStop();
  }

  closeAddStop() {
    this.setState({
      showAddStopModal: false
    });
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.getItineraries('Octodog');
  }

  render () {
    return (
      <Grid>
        <Header />
        <Row className="show-grid">
          <Col md={5}>
            <Button bsStyle="primary" onClick={this.openNewItinerary}>Create New Itinerary</Button>
            <Itineraries itineraries={this.state.itineraries} handleItineraryClick={this.handleItineraryClick}/>
            <CurrentItineraryModal
              show={this.state.showCurrentItineraryModal}
              hide={this.closeCurrentItinerary}
              currentItinerary={this.state.currentItinerary}
              handleAddStopClick={this.handleAddStopClick}>
            </CurrentItineraryModal>
            <AddStopModal show={this.state.showAddStopModal} hide={this.closeAddStop} save={this.handleSaveStopClick}></AddStopModal>
            <NewItineraryModal show={this.state.showItineraryModal} hide={this.closeNewItinerary}
            save={this.handleSaveNewItinerary}>
            </NewItineraryModal>
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
