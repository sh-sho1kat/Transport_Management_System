import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import BackgroundImage from "../../assets/bg1.jpg";

const BusTicketBooking = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [departTime, setDepartTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ from, to, departDate, departTime });
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)]"> {/* Adjust 64px to match your navbar height */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          filter: "brightness(50%)"
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">BOOK YOUR BUS TICKET</h1>
        <p className="text-lg md:text-xl mb-8 text-center">Choose Your Destinations And Dates To Reserve A Ticket</p>
        
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md mb-8 transition duration-300">
          Book Now
        </button>
        
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-4xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="from" className="block text-gray-300 mb-2">From</label>
              <input
                type="text"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="From"
              />
            </div>
            <div>
              <label htmlFor="to" className="block text-gray-300 mb-2">To</label>
              <input
                type="text"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="To"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="depart" className="block text-gray-300 mb-2">Depart Date</label>
              <div className="relative">
                <input
                  type="date"
                  id="depart"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div>
              <label htmlFor="departTime" className="block text-gray-300 mb-2">Departure Time</label>
              <div className="relative">
                <input
                  type="time"
                  id="departTime"
                  value={departTime}
                  onChange={(e) => setDepartTime(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded transition duration-300">
            Find Tickets
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusTicketBooking;