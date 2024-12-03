import React, { useState, useEffect } from 'react';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import { LocationService, LocationEntry } from '../../services/LocationService';
import { TimeService, TimeEntry } from '../../services/TimeService';

const AddTrip: React.FC = () => {
  // Form state
  const [busId, setBusId] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [departureTime, setDepartureTime] = useState('');
  
  // Data states
  const [locations, setLocations] = useState<LocationEntry[]>([]);
  const [times, setTimes] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch locations and times when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [locationData, timeData] = await Promise.all([
          LocationService.getAllLocations(),
          TimeService.getAllTimes()
        ]);
        setLocations(locationData);
        setTimes(timeData);
      } catch (err) {
        setError('Failed to fetch required data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (time: string) => {
    // Convert 24-hour time to 12-hour format
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submit logic here
    console.log({
      busId,
      startLocation,
      destination,
      date,
      departureTime
    });
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add New Trip
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* Error Display */}
            {error && (
              <div className="mb-4.5 text-meta-1">
                {error}
              </div>
            )}

            {/* Bus ID */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Bus ID <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter bus ID"
                value={busId}
                onChange={(e) => setBusId(e.target.value)}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* Start Location Select */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Start Location <span className="text-meta-1">*</span>
              </label>
              <select
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Start Location</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Select */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Destination <span className="text-meta-1">*</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Destination</option>
                {locations.map((loc) => (
                  <option 
                    key={loc._id} 
                    value={loc._id}
                    disabled={loc._id === startLocation}
                  >
                    {loc.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Date <span className="text-meta-1">*</span>
              </label>
              <DatePickerOne />
            </div>

            {/* Departure Time Select */}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Departure Time <span className="text-meta-1">*</span>
              </label>
              <select
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Departure Time</option>
                {times.map((timeEntry) => (
                  <option key={timeEntry._id} value={timeEntry._id}>
                    {formatTime(timeEntry.time)}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
            >
              Add Trip
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTrip;