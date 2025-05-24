"use client";
import "../common.css";

import React, { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function ResponderPage() {
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
                  className="submit-btn"
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
                  className="submit-btn"
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
