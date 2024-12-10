import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { LocationService } from '../../services/LocationService';
import { TimeService } from '../../services/TimeService';
import BackgroundImage from "../../assets/bg1.jpg";

const BusTicketBooking = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [locations, setLocations] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [locationsData, timeSlotsData] = await Promise.all([
          LocationService.getAllLocations(),
          TimeService.getAllTimes()
        ]);
        setLocations(locationsData);
        setTimeSlots(timeSlotsData);
      } catch (err) {
        setError('Failed to load booking data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      from,
      to,
      date,
      departureTime
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading booking information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          filter: "brightness(50%)"
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">BOOK YOUR BUS TICKET</h1>
        <p className="text-lg md:text-xl mb-8 text-center">Choose Your Destinations And Dates To Reserve A Ticket</p>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-4xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select departure city</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc.location}>
                    {loc.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select destination city</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc.location}>
                    {loc.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Departure Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Departure Time</label>
              <select
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select departure time</option>
                {timeSlots.map((slot) => (
                  <option key={slot._id} value={slot.time}>
                    {slot.time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Find Tickets
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusTicketBooking;