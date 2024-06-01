import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './styles.css';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      tickets: [],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, age } = this.state;
    let ticketPrice;
    if (age < 5) {
      ticketPrice = 0; // Ticket price is 0 if age is below 5
    } else if (age < 12) {
      ticketPrice = 350; // Ticket price is 350 if age is below 12
    } else {
      ticketPrice = 800; // Ticket price is 800 otherwise
    }
    const newTicket = { name, age: Number(age), ticketPrice };
    this.setState((prevState) => ({
      tickets: [...prevState.tickets, newTicket],
      name: '',
      age: ''
    }));
  };

  render() {
    const { name, age, tickets } = this.state;

    return (
      <main>
        <section className="about-us">
          <h2><center>Be ready for it. <strong>SUMMER OFFERS</strong> coming soon.</center></h2>
        </section>
        
        <section className="carousel-section">
        <div className="carousel-container">
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
              <img src="https://i.pinimg.com/564x/e5/6f/1d/e56f1d0ac8448e5923dbc97b3bc94951.jpg" alt="Roller Coaster" />
              <p className="legend">Roller Coasters</p>
            </div>
            <div>
              <img src="https://i.pinimg.com/564x/21/2b/3c/212b3ce7205850d7ac9821899ae9327f.jpg" alt="Water Rides" />
              <p className="legend">Water Rides</p>
            </div>
            <div>
              <img src="https://i.pinimg.com/736x/fa/f2/fd/faf2fd5a45fd84095565178c08e326e2.jpg" alt="Horror House" />
              <p className="legend">Horror House</p>
            </div>
            <div>
              <img src="https://i.pinimg.com/736x/63/58/73/6358733e8f29c443b420df9677fad110.jpg" alt="Kids Zone" />
              <p className="legend">Kids Zone</p>
            </div>
          </Carousel>
          </div>
        </section>

        <section className="plan-visit">
          <h2>Plan Your Visit</h2>
          <form onSubmit={this.handleSubmit} className="ticket-form">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn-plan-visit">Book Tickets</button>
          </form>
          
          {tickets.length > 0 && (
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Ticket Price</th>
                </tr>
              </thead>
              
              <tbody>
                {tickets.map((ticket, index) => (
                  <TicketRow key={index} ticket={ticket} />
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    );
  }
}

MainContent.propTypes = {
  ticket: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  })
};

const TicketRow = ({ ticket }) => (
  <tr>
    <td>{ticket.name}</td>
    <td>{ticket.age}</td>
    <td>${ticket.ticketPrice}</td>
  </tr>
);

TicketRow.propTypes = {
  ticket: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    ticketPrice: PropTypes.number.isRequired
  }).isRequired
};

export default MainContent;