import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

const Buses = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  const TOTAL_ROWS = 10; // Total number of rows

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      return; // Seat is already booked
    }

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        if (prev.length >= 2) {
          setBookingStatus({
            type: 'error',
            message: 'You can only select up to 2 seats at a time.'
          });
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const handleBooking = () => {
    // Basic validation
    if (!studentId.trim() || !email.trim()) {
      setBookingStatus({
        type: 'error',
        message: 'Please fill in both Student ID and Email'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setBookingStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    // Basic student ID validation
    if (studentId.length < 5) {
      setBookingStatus({
        type: 'error',
        message: 'Please enter a valid Student ID'
      });
      return;
    }

    // Process booking
    setBookedSeats(prev => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
    setStudentId('');
    setEmail('');
    setBookingStatus({
      type: 'success',
      message: 'Booking confirmed! Details will be sent to your email.'
    });
  };

  const getSeatColor = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'bg-red-500';
    if (selectedSeats.includes(seatId)) return 'bg-green-500';
    return 'bg-gray-200 hover:bg-gray-300';
  };

  // Function to generate seat ID
  const getSeatId = (row, side, seat) => {
    if (side === 'right') {
      return row * 4 + seat + 2; // Two seats on right side
    }
    return row * 4 + seat; // Two seats on left side
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">University Bus Seat Booking</h1>
        
        {bookingStatus && (
          <Alert className={`mb-4 ${bookingStatus.type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {bookingStatus.message}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Seat Layout */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
            <div className="space-y-4">
              {/* Bus Front with Driver at top right */}
              <div className="w-full h-12 flex justify-end mb-8">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white text-sm">
                  Driver
                </div>
              </div>

              {/* Seats */}
              <div className="grid gap-4">
                {Array.from({ length: TOTAL_ROWS }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex justify-between">
                    {/* Left side - 2 seats */}
                    <div className="flex gap-2">
                      {[0, 1].map(seatNum => {
                        const seatId = getSeatId(rowIndex, 'left', seatNum);
                        return (
                          <button
                            key={`left-${seatNum}`}
                            onClick={() => handleSeatClick(seatId)}
                            disabled={bookedSeats.includes(seatId)}
                            className={`
                              w-12 h-12 rounded-lg transition-colors duration-200
                              flex items-center justify-center font-medium
                              ${getSeatColor(seatId)}
                              ${bookedSeats.includes(seatId) ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `}
                          >
                            {seatId + 1}
                          </button>
                        );
                      })}
                    </div>

                    {/* Aisle */}
                    <div className="w-8"></div>

                    {/* Right side - 2 seats */}
                    <div className="flex gap-2">
                      {[0, 1].map(seatNum => {
                        const seatId = getSeatId(rowIndex, 'right', seatNum);
                        return (
                          <button
                            key={`right-${seatNum}`}
                            onClick={() => handleSeatClick(seatId)}
                            disabled={bookedSeats.includes(seatId)}
                            className={`
                              w-12 h-12 rounded-lg transition-colors duration-200
                              flex items-center justify-center font-medium
                              ${getSeatColor(seatId)}
                              ${bookedSeats.includes(seatId) ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `}
                          >
                            {seatId + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Booking Form */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Selected Seats</label>
                <div className="py-2 px-3 bg-gray-100 rounded">
                  {selectedSeats.length > 0 
                    ? selectedSeats.map(id => id + 1).join(', ')
                    : 'No seats selected'}
                </div>
              </div>

              <div>
                <label htmlFor="studentId" className="block text-sm font-medium mb-2">Student ID</label>
                <Input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your student ID"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">University Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your university email"
                  className="w-full"
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleBooking}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Buses;