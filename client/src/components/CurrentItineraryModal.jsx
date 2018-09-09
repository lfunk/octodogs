import React from 'react';
import StopEntry from './StopEntry.jsx';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import $ from 'jquery';

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 107, bottom: 0, left: 290, right: 0,
  width: 441,
};

const backdropStyle = {
  position: 'fixed',
  top: 107, bottom: 0, left: 290, right: 0,
  zIndex: 'auto',
  backgroundColor: '#fff',
  opacity: 1,
  width: 441
};

class CurrentItineraryModal extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit() {
    if (this.hasValidInput()) {
      var data = this.formatData();
      console.log(data); // UPDATE ME
    }
  }

  formatData() {
    var data = {};

    $('.data').each(function() {
      data[$(this).attr('field')] = $(this).val();
    });

    data = {
      name: data.name,
      description: data.desc,
      dates: {
        start: new Date(data.start),
        end: new Date(data.end),
      },
      privacy: data.privacy
    };

    return data;
  }

  render() {
    return(
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.hide}
          aria-labelledby="ModalHeader"
          style={modalStyle}
          backdropStyle={backdropStyle}
          animation={false}
        >
          <Modal.Header>

            <Modal.Title> {this.props.currentItinerary.name} </Modal.Title>

          </Modal.Header>
          <Modal.Body>

            {!this.props.currentItinerary.stops ?
              <div>none</div>
            :
              <div>
                <h5> {this.props.currentItinerary.stops.length} {this.props.currentItinerary.stops.length === 1 ? 'stop' : 'stops'} on this itinerary</h5>

                <ListGroup componentClass="ul">
                  {this.props.currentItinerary.stops.map((stop, index) =>
                    <StopEntry
                      stop={stop}
                      key={stop._id}
                      index={index}
                    />
                  )}
                </ListGroup>
              </div>
            }

          </Modal.Body>
          <Modal.Footer>

            <Button bsStyle="primary" onClick={this.submit}>Add Stop</Button>
            <Button onClick={this.props.hide}>Close</Button>

          </Modal.Footer>
        </Modal>
      </div>

    )
  }
}

export default CurrentItineraryModal;