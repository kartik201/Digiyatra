import React, { useState, useEffect } from 'react';
import './module.css';
import WelcomeModal from './welcome';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';

const airports = [
    { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport' },
    { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport' },
    { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport' },
    { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport' },
];

const mockFlights = [
    {
        airline: 'SpiceJet',
        logo: 'https://logowik.com/content/uploads/images/spicejet5998.logowik.com.webp',
        time: { departure: '20:08', arrival: '22:08' },
        duration: '2hr 15min',
        type: 'Non Stop',
        price: '₹7,350',
    },
    {
        airline: 'IndiGo',
        logo: 'https://logowik.com/content/uploads/images/indigo-airlines4856.logowik.com.webp',
        time: { departure: '21:08', arrival: '23:08' },
        duration: '2hr 15min',
        type: 'Non Stop',
        price: '₹7,650',
    },
    {
        airline: 'Akasa Air',
        logo: 'https://logowik.com/content/uploads/images/akasa-air4203.jpg',
        time: { departure: '14:08', arrival: '16:08' },
        duration: '2hr 15min',
        type: 'Non Stop',
        price: '₹8,180',
    },
    {
        airline: 'World Sun Aviation',
        logo: 'https://logowik.com/content/uploads/images/companhia-sol-de-seguros5700.logowik.com.webp',
        time: { departure: '17:08', arrival: '19:08' },
        duration: '2hr 15min',
        type: 'Non Stop',
        price: '₹8,350',
    },
];


const FlightSearchModule = () => {

    const [fromDropdownVisible, setFromDropdownVisible] = useState(false);
    const [toDropdownVisible, setToDropdownVisible] = useState(false);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [flights, setFlights] = useState([]);
    const [activeModule, setActiveModule] = useState('Search Flight');
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        setIsModalVisible(true);
    }, []);

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleSelect = (type, airport) => {
        if (type === 'from') {
            setFromValue(`${airport.code} - ${airport.city}`);
            setFromDropdownVisible(false);
        } else if (type === 'to') {
            setToValue(`${airport.code} - ${airport.city}`);
            setToDropdownVisible(false);
        }
    };

    const handleSearch = () => {
        setFlights(mockFlights);
    };

    const handleFlightSelect = () => {
        setActiveModule('Passenger Details');
    };

    const handleSidebarClick = (module) => {
        setActiveModule(module);
    };

    return (
        <div className="flight-module">
            <div className="sidebar">
                <ul>
                    {['Search Flight', 'Passenger Details', 'Select Seat', 'Boarding Pass', 'Self Check-in', 'Conclusion'].map(
                        (text) => (
                            <li
                                key={text}
                                className={activeModule === text ? 'active' : ''}
                                onClick={() => handleSidebarClick(text)}
                            >
                                {text}
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="flight-module">
                {isModalVisible && <WelcomeModal onClose={handleModalClose} />}
            </div>

            <div className="main-content">
                {activeModule === 'Search Flight' && (
                    <>
                        <h1>Search Flight</h1>
                        <div className="search-bar">
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="From"
                                    value={fromValue}
                                    onFocus={() => setFromDropdownVisible(true)}
                                    onChange={(e) => setFromValue(e.target.value)}
                                />
                                {fromDropdownVisible && (
                                    <div className="dropdown">
                                        {airports.map((airport) => (
                                            <div
                                                key={airport.code}
                                                className="dropdown-item"
                                                onClick={() => handleSelect('from', airport)}
                                            >
                                                <div className="airport-code">{`${airport.code} - ${airport.city}`}</div>
                                                <div className="airport-name">{airport.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <SwapHorizIcon className="icon" />

                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="To"
                                    value={toValue}
                                    onFocus={() => setToDropdownVisible(true)}
                                    onChange={(e) => setToValue(e.target.value)}
                                />
                                {toDropdownVisible && (
                                    <div className="dropdown">
                                        {airports.map((airport) => (
                                            <div
                                                key={airport.code}
                                                className="dropdown-item"
                                                onClick={() => handleSelect('to', airport)}
                                            >
                                                <div className="airport-code">{`${airport.code} - ${airport.city}`}</div>
                                                <div className="airport-name">{airport.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input type="date" className="input-field" />
                            <button className="search-button" onClick={handleSearch}>
                                <SearchIcon />
                            </button>
                        </div>

                        <div className="flight-cards">
                            {flights.map((flight, index) => (
                                <div className="flight-card" key={index}>
                                    <img src={flight.logo} alt={`${flight.airline} logo`} className="flight-logo" />
                                    <div className="flight-details">
                                        <div className="time">
                                            <span>{flight.time.departure}</span>
                                            <span>{flight.duration}</span>
                                            <span>{flight.time.arrival}</span>
                                        </div>
                                        <div className="route">
                                            <span>{fromValue.split(' ')[0]}</span>
                                            <span>{flight.type}</span>
                                            <span>{toValue.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                    <div className="price">
                                        <h2><span>{flight.price}</span></h2>
                                        <button className="select-button" onClick={handleFlightSelect}>
                                            SELECT
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeModule === 'Passenger Details' && (
                    <div className="passenger-details">
                        <div className="passenger-form">
                            <h2>Enter Details</h2>
                            <div className="passenger-input">
                                <label>First Name *</label>
                                <input type="text" placeholder="First Name" required />
                            </div>
                            <div className="passenger-input">
                                <label>Last Name *</label>
                                <input type="text" placeholder="Last Name" required />
                            </div>
                            <div className="passenger-input">
                                <label>Email Address *</label>
                                <input type="email" placeholder="Email Address" required />
                            </div>
                            <div className="webcam-section">

                                <label>
                                    Capture your face from different angles
                                    <span className="info-icon" title="Click the button below to enable webcam access.">
                                        ℹ
                                    </span>
                                </label>
                                <img className='gif' src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3EyZWR3ZTZiM3hqdXN3eW5rbzk3dTJ5YTViaTJ4OTBnY3ZmcDB2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2dcNghCBHUO2O22mbl/giphy.gif" alt="" />
                                <div className="webcam-preview">
                                    <video id="webcam" autoPlay muted playsInline />
                                </div>
                                <button
                                    className="webcam-button"
                                    onClick={() => {
                                        const video = document.getElementById('webcam');
                                        if (video && video.srcObject) {
                                            const stream = video.srcObject;
                                            const tracks = stream.getTracks();
                                            tracks.forEach((track) => track.stop());
                                            video.srcObject = null;
                                        } else {
                                            // Webcam is off; turn it on
                                            navigator.mediaDevices
                                                .getUserMedia({ video: true })
                                                .then((stream) => {
                                                    if (video) {
                                                        video.srcObject = stream;
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.error('Error accessing the webcam:', error);
                                                    alert('Unable to access webcam. Please check permissions.');
                                                });
                                        }
                                    }}
                                >
                                    WEBCAM
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};


export default FlightSearchModule;
