import React from 'react';

const RouteSchedule = () => {
  const scheduleData = [
    {
      users: "1. Students & Teachers (City Route)",
      route: "Shalbagan-Satellite Town-Shaheb Bazar-New Market-Monzur Mor-Kazla-RUET",
      departureRUET: ["9:00 AM", "10:00 AM", "12:30 PM", "3:00 PM"],
      departurePlace: [
        "Shalbagan: 9:10 AM",
        "Monjur Mor: 10:10 AM",
        "New Market: 12:40 PM",
        "Kazla: 3:10 PM"
      ],
      arrivalRUET: ["9:20 AM", "10:30 AM", "1:00 PM", "3:20 PM"]
    },
    {
      users: "2. Students & Teachers (Chandrima Route)",
      route: "Kazla-Baya Road-Chandrima-Abdulpur-RUET",
      departureRUET: ["9:00 AM", "1:00 PM"],
      departurePlace: ["Kazla: 9:10 AM", "Chandrima: 1:10 PM"],
      arrivalRUET: ["9:30 AM", "1:30 PM"]
    },
    {
      users: "3. Students & Teachers (Binodpur Route)",
      route: "Kazla-Binodpur-Biharir More-Kadirgonj-RUET",
      departureRUET: ["9:00 AM", "1:00 PM"],
      departurePlace: ["Binodpur: 9:10 AM", "Kadirgonj: 1:10 PM"],
      arrivalRUET: ["9:30 AM", "1:30 PM"]
    },
    {
      users: "4. Students & Teachers (Nawhata Route)",
      route: "Amanura-Sonadanga-Sialkol-Sagorpara-Sugonda-Kaligram-RUET",
      departureRUET: ["9:00 AM"],
      departurePlace: ["Amanura: 9:10 AM"],
      arrivalRUET: ["9:30 AM"]
    },
    {
      users: "5. Female Students (Residential Hall)",
      route: "RUET to Hall",
      departureRUET: ["9:45 AM", "10:00 AM", "1:00 PM", "2:15 PM"],
      departurePlace: [],
      arrivalRUET: []
    },
    {
      users: "6. Students & Teachers (Campus Trip)",
      route: "RUET-Satmatha-Muktijoddha Mor-RUET",
      departureRUET: ["9:00 AM", "1:00 PM"],
      departurePlace: ["Satmatha: 9:10 AM", "Muktijoddha Mor: 1:10 PM"],
      arrivalRUET: ["9:20 AM", "1:20 PM"]
    },
    {
      users: "7. Campus Trip (RUET to RUET)",
      route: "RUET-Satmatha-RUET",
      departureRUET: ["9:00 AM"],
      departurePlace: ["Satmatha: 9:10 AM"],
      arrivalRUET: ["9:20 AM"]
    }
  ];

  return (
    <div className="p-4">
      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className="p-6 bg-blue-50 rounded-t-lg">
          <h1 className="text-2xl font-bold text-center">
            Rajshahi University of Engineering & Technology
          </h1>
          <div className="text-center text-gray-600">
            <p className="font-semibold">Administrative Branch, Transport Department</p>
            <p>Notice</p>
            <p>Date: 20/10/2024</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700">
              All students and teachers are hereby informed that from 20/10/2024 until further notice,
              the bus schedule for the transportation from various routes to RUET has been revised.
              The detailed schedule is as follows:
            </p>
          </div>
          
          <div className="text-xl font-semibold mb-4">Time Schedule</div>
          <div className="text-lg font-medium mb-2">For Students and Teachers (During Weekdays)</div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-3 text-left font-semibold border">Users</th>
                  <th className="p-3 text-left font-semibold border">Route</th>
                  <th className="p-3 text-left font-semibold border">Departure Time (RUET)</th>
                  <th className="p-3 text-left font-semibold border">Departure Time (Designated Place)</th>
                  <th className="p-3 text-left font-semibold border">Arrival Time (RUET)</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((schedule, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">{schedule.users}</td>
                    <td className="p-3 border">{schedule.route}</td>
                    <td className="p-3 border">
                      {schedule.departureRUET.map((time, i) => (
                        <div key={i}>{time}</div>
                      ))}
                    </td>
                    <td className="p-3 border">
                      {schedule.departurePlace.map((place, i) => (
                        <div key={i}>{place}</div>
                      ))}
                    </td>
                    <td className="p-3 border">
                      {schedule.arrivalRUET.map((time, i) => (
                        <div key={i}>{time}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Please note that these schedules are subject to change and it is recommended to confirm
            the timings regularly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSchedule;