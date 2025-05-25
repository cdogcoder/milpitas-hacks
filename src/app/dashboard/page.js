"use client";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

export default function Page() {
  const [fakeResponders, setFakeResponders] = useState([
    {name: 'Tom', lat: 33.7455, lng: -117.8677},
    {name: 'John', lat: 33.653, lng: -117.795},
    {name: 'Kevin', lat: 33.717, lng: -117.831}
  ])
  const [responders, setResponders] = useState([]);
  const collectionRef = collection(db, "responders")

  const setResponderLogs = async () => {
    const docs = await getDocs(collectionRef);
    setResponders(docs.docs.map((doc) => ({...doc.data(), id: doc.id})));
  }

  useEffect(() => {
    setResponderLogs();
  }, [responders])

  return (
    <>
      <div className="min-h-screen bg-black text-white">

        <div className="p-6 flex justify-center">
          <div className="dashboard-container">
            <h1 className="text-3xl font-semibold mb-4">
              Manage Your Responder Database
            </h1>
            <MapWithNoSSR responders={fakeResponders} />

            <div className="mt-6 bg-white text-black p-4 rounded-md">
              <div className="mb-4">
                <div className="flex gap-2 flex-wrap">
                  <button className="bg-gray-200 px-3 py-1 rounded">
                    Availability
                  </button>
                  <button className="bg-gray-200 px-3 py-1 rounded">
                    City
                  </button>
                  <button className="bg-gray-300 px-3 py-1 rounded">
                    + More filters
                  </button>
                </div>
                <div className="mt4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border px-3 py-1 rounded"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Name</th>
                  <th>Profession</th>
                  <th>Availability</th>
                  <th>City</th>
                  <th>Deploy</th>
                </tr>
              </thead>
              <tbody>
                {responders.map((responder, index) => (
                  <tr key={index} className="border-b">
                    <td>{responder.responderName}</td>
                    <td>{responder.responderProfession}</td>
                    <td
                      className={
                        responder.responderAvailability === "Available"
                          ? "text-green-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                      }
                    >
                      {responder.responderAvailability === "Available" ? "Available" : "Busy" }
                    </td>
                    <td>{responder.responderCity}</td>
                    <td className="flex gap-2 items-center">
                      {responder.responderAvailability === "Available" ? (
                        <button className="noti-button text-white bg-red-500 px-2 py-1 rounded" onClick={(event) => {
                          event.target.textContent = "SENT"
                          event.target.style.cssText = "background-color: #b40000;"
                        }}>
                          SEND NOTIFICATION
                        </button>
                      ) : (
                        <button
                          className="text-white bg-gray-400 px-2 py-1 rounded"
                          disabled
                        >
                          Unavailable
                        </button>
                      )}
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx global>{`
  :root {
    --bg-dark: #121212;
    --bg-darker: #0f0f0f;
    --text-light: #ffffff;
    --text-muted: #cfcfcf;
    --accent-red: #e10600;
    --gray-btn: #444;
    --transition: all 250ms ease;
  }

  .font-geist-mono {
  font-family: var(--font-geist-mono);
}

  body, html {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-light);
    font-size: 0.9rem;
  }

  .smart-mono {
  font-family: 'Smart Mono', monospace;
  letter-spacing: 1px;
}


  .dashboard-container {
  background-color: white;
  color: black;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 960px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Fix white background for table rows too */
.dashboard-container table {
  background-color: white;
}

/* Make the map, filters, and table match container width */
.dashboard-container > * {
  width: 100%;
}

/* Spacing under map */
.dashboard-container .mt-6 {
  margin-top: 2rem !important;
}

/* Fix vertical gap between filter buttons and search */
.dashboard-container .mb-4 {
  margin-bottom: 2.5rem;
}

.dashboard-container .mb-4 .mt4 {
  margin-top: 1rem;
}


  .flex.gap-2 button {
    background-color: var(--gray-btn);
    color: white;
    border: none;
    padding: 0.4rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    transition: var(--transition);
  }

/* Pagination buttons styled like filter buttons */

  input[type="text"] {
    padding: 0.5rem 0.75rem;
    border: 1px solid #888;
    background-color: var(--bg-darker);
    color: white;
    border-radius: 0.5rem;
  }

  input[type="text"]::placeholder {
    color: #aaa;
  }

  input[type="text"]:focus {
    outline: none;
    border-color: var(--accent-red);
  }
  
  /* Make table cells fill more width and text larger */
table td, table th {
  font-size: 1rem;
  padding: 1.2rem 1rem;
}

/* Force table width to fill container fully */
table {
  width: 100%;
  table-layout: fixed;
}

/* Fix spacing between action buttons */
td .flex.gap-2 {
  gap: 1rem;
}

/* Explicitly make both action buttons take space */
td .flex.gap-2 button {
  min-width: 140px;
}

/* Center the continue button */
button.bg-red-600 {
  display: block;
  margin: 0 auto;
}

/* Stack input below buttons with spacing */
.flex.justify-between {
  flex-wrap: wrap;
  gap: 9rem;
}

  /* GAP BETWEEN FILTER BUTTONS */
.flex.gap-2 {
  display: flex;
  gap: 1.1rem !important; /* Add more spacing between Status, City, More filters */
}

/* DEPLOY BUTTON AREA – SPACE BETWEEN BUTTONS */
td .flex {
  gap: 1.2rem !important; /* More space between "Send Notification" and "✏️" */
  flex-wrap: wrap;
}

/* ENSURE TABLE FILLS FULL WIDTH */
table {
  width: 100%;
  table-layout: fixed;
}

/* MAKE TEXT LARGER FOR BETTER FILLING SPACE */
td, th {
  font-size: 1rem !important;
  padding: 1.25rem 1rem !important;
}

/* CENTER THE RED CONTINUE BUTTON */
.flex.justify-center {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

button.bg-red-600 {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: var(--accent-red);
  border: none;
  border-radius: 0.6rem;
}


  table {
    background-color: var(--text-light);
    color: black;
    width: 100%;
    margin-top: 1rem;
    border-collapse: collapse;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  th {
    padding: 1rem;
    background-color: #1e1e1e;
    text-align: left;
    font-weight: 600;
  }
    th {
  color: white;
    }

  thead tr {
  border-top: 3px solid black;
      }


  td {
    padding: 1rem;
    border-top: 1px solid #2c2c2c;
  }

  .text-green-600 {
    color: #22c55e;
  }

  .text-yellow-600 {
    color: #facc15;
  }

  button.bg-red-500 {
    background-color: var(--accent-red);
    color: white;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
    border-radius: 0.5rem;
    border: none;
  }

  button.bg-gray-400 {
    background-color: #666;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    border: none;
  }

  button.px-2 {
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .flex.justify-between {
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  button.bg-red-600 {
    background-color: var(--accent-red);
    padding: 0.6rem 1.5rem;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 0.6rem;
  }

  button.bg-red-600:hover {
    background-color: #b40000;
  }

 

`}</style>
    </>
  );
}
