"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function ResponderPage() {
  const router = useRouter();
  // const responders = Array(9).fill({
  //   name: "Dr. Emily Sanchez",
  //   tags: ["Profession", "City", "Availability", "Team"],
  // });
  const [responders, setResponders] = useState([]);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState("");
  const [teamName, setTeamName] = useState("");
  const collectionRef = collection(db, "responders");
  const [currentResponder, setCurrentResponder] = useState("");

  const setResponderLogs = async () => {
    const docs = await getDocs(collectionRef);
    setResponders(docs.docs.map((doc) => ({...doc.data(), id: doc.id})));
  }

  useEffect(() => {
    setResponderLogs();
  }, [responders])

  const addNewResponder = async () => {
    await addDoc(collectionRef, {
      responderName: name,
      responderProfession: profession,
      responderCity: city,
      responderAvailability: availability,
      responderTeamName: teamName,
    });
    const addResponderDialog = document.querySelector("dialog");
    setResponderLogs()
    addResponderDialog.close();
  };

  const editResponderLog = async () => {
    const selectedResponderDoc = doc(db, "responders", currentResponder);
    const editName = document.querySelector('.editName');
    const editProfession = document.querySelector('.editProfession');
    const editCity = document.querySelector('.editCity');
    const editAvailability = document.querySelector('.editAvailability');
    const editTeamName = document.querySelector(".editTeamName");
    console.log(selectedResponderDoc)
    await updateDoc(selectedResponderDoc, {
      id: currentResponder,
      responderName: editName.value,
      responderCity: editCity.value,
      responderAvailability: editAvailability.value,
      responderProfession: editProfession.value,
      responderTeamName: editTeamName.value
    })
    setResponderLogs();
  }

  const deleteResponderLog = async (id) => {
    const docRef = doc(db, 'responders', id);
    await deleteDoc(docRef);
    setResponderLogs();
  }

  return (
    <>
      <style jsx global>{`
        body,
        html {
          margin: 0;
          padding: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #121212;
          color: white;
        }

        .container {
          min-height: 100vh;
          background-color: #121212;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
          padding: 40px;
        }

        .card {
          background-color: #000;
          border: 1px solid #2c2c2c;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-title {
          background-color: #2e2e2e;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 18px;
          margin-bottom: 16px;
        }

        .tag-label {
          font-weight: 500;
          margin-bottom: 8px;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tag {
          background-color: #e10600;
          color: white;
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
        }

        .buttons-container {
          display: flex;
          gap: .5rem;
          align-self: flex-end;
        }

        .edit-button,
        .delete-button {
          align-self: flex-end;
          background-color: #2e2e2e;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          margin-top: 20px;
          cursor: pointer;
        }

        .edit-button:hover,
        .delete-button:hover {
          background-color: #3c3c3c;
        }

        .floating-button {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          font-size: 28px;
          border-radius: 50%;
          background-color: #2e2e2e;
          color: white;
          border: none;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        .floating-button:hover {
          background-color: #3c3c3c;
        }

        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .dialog-box {
          background: white;
          color: black;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
          width: 300px;
        }

        .dialog-box h2 {
          color: red;
          text-align: center;
          margin-bottom: 1rem;
        }

        form label {
          display: block;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        form input,
        form select {
          width: 100%;
          padding: 8px;
          margin-top: 4px;
          border: 2px solid black;
          border-radius: 6px;
        }

        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        button {
          background-color: red;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        button:hover {
          background-color: #b30000;
        }

        .cancel-btn {
          background-color: black;
        }


        .dashboard-button {
          padding: 0.8rem 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          border: 2px solid var(--accent-red);
          background-color: transparent;
          border-radius: 8px;
          color: black;
          letter-spacing: 0.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }

        .dashboard-button:hover {
          background-color: var(--accent-red);
          color: white;
        }
          
        .cancel-btn:hover {
          background-color: #333;
        }
      `}</style>

      <div className="container">
      <dialog className="edit-responder-dialog">
          <div className="dialog-box">
            <h2>Edit First Responder</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  className="editName"
                  defaultValue={name}
                  onKeyUp={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label>
                Profession:
                <input
                  type="text"
                  name="profession"
                  className="editProfession"
                  defaultValue={profession}
                  onKeyUp={(event) => setProfession(event.target.value)}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  className="editCity"
                  defaultValue={city}
                  onKeyUp={(event) => setCity(event.target.value)}
                  required
                />
              </label>
              <label>
                Availability:
                <select
                  name="availability"
                  className="editAvailability"
                  required
                  onChange={(event) => {
                    setAvailability(event.target.value);
                  }}
                >
                  <option
                    disabled={true}
                    value={"none"}
                    onClick={(event) => {
                      setAvailability(event.target.value);
                    }}
                  >
                    Select
                  </option>
                  <option value={"Available"} onClick={(event) => {
                      setAvailability(event.target.value);
                    }}>Available</option>
                  <option value={"On Call"} onClick={(event) => {
                      setAvailability(event.target.value);
                    }}>On Call</option>
                  <option value={"Unavailable"} onClick={(event) => {
                      setAvailability(event.target.value);
                    }}>Unavailable</option>
                </select>
              </label>
              <label>
                Team Name:
                <input
                  type="text"
                  name="team"
                  className="editTeamName"
                  defaultValue={teamName}
                  onKeyUp={(event) => setTeamName(event.target.value)}
                  required
                />
              </label>
              <div className="form-buttons">
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    editResponderLog();
                    const editResponderDialog = document.querySelector(".edit-responder-dialog");
                    editResponderDialog.close();
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    const editResponderDialog = document.querySelector(".edit-responder-dialog");
                    editResponderDialog.close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <dialog className="add-responder-dialog">
          <div className="dialog-box">
            <h2>Add First Responder</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  onKeyUp={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label>
                Profession:
                <input
                  type="text"
                  name="profession"
                  defaultValue={profession}
                  onKeyUp={(event) => setProfession(event.target.value)}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  defaultValue={city}
                  onKeyUp={(event) => setCity(event.target.value)}
                  required
                />
              </label>
              <label>
                Availability:
                <select
                  name="availability"
                  required
                  onChange={(event) => {
                    setAvailability(event.target.value);
                  }}
                >
                  <option
                    disabled={true}
                    value={"none"}
                    onClick={(event) => {
                      setAvailability(event.target.value);
                    }}
                  >
                    Select
                  </option>
                  <option value={"Available"} onClick={(event) => {
                      setAvailability(event.target.value);
                    }}>Available</option>
                  <option value={"On Call"} onClick={(event) => {
                      setAvailability(event.target.value);
                    }}>On Call</option>
                  <option value={"Unavailable"} onClick={(event) => {
                      setAvailability(event.target.value);
                    }}>Unavailable</option>
                </select>
              </label>
              <label>
                Team Name:
                <input
                  type="text"
                  name="team"
                  defaultValue={teamName}
                  onKeyUp={(event) => setTeamName(event.target.value)}
                  required
                />
              </label>
              <div className="form-buttons">
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    addNewResponder();
                    const addResponderDialog = document.querySelector(".add-responder-dialog");
                    addResponderDialog.close();
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    const addResponderDialog = document.querySelector(".add-responder-dialog");
                    addResponderDialog.close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <main className="card-grid">
          {responders.map((responder, index) => (
            <div className="card" key={index}>
              <h2 className="card-title">{responder.responderName}</h2>
              <p className="tag-label">Tags:</p>
              <div className="tags">
                {Object.keys(responder).map((tag, i) => {
                  if (tag !== "id" && tag !== "responderName") {
                    return (<span className="tag" key={i}>
                    {responder[tag]}
                  </span> )
                  }
                })}
              </div>
              <div className="buttons-container">
                <button className="edit-button" onClick={() => {
                  const editResponderDialog = document.querySelector(".edit-responder-dialog");
                  setCurrentResponder(responder.id);
                  const editName = document.querySelector(".editName");
                  const editProfession = document.querySelector(".editProfession");
                  const editCity = document.querySelector(".editCity");
                  const editAvailability = document.querySelector(".editAvailability");
                  const editTeamName = document.querySelector(".editTeamName");
                  editName.value = responder.responderName;
                  editProfession.value = responder.responderProfession;
                  editCity.value = responder.responderCity;
                  editAvailability.value = responder.responderAvailability;
                  editTeamName.value = responder.responderTeamName;
                  editResponderDialog.showModal();
                }}>Edit</button>
                <button className="delete-button" onClick={() => {
                  deleteResponderLog(responder.id);
                }}>Delete</button>
              </div>
            </div>
          ))}
        </main>

        <button className="floating-button" onClick={() => {
            const addResponderDialog = document.querySelector(".add-responder-dialog");
            addResponderDialog.showModal();
          }}>+</button>
      </div>
    </>
  );
}
