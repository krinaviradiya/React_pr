import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; 
import { getDoc, doc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'; 
import "./Daseboard.css"

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [clothingType, setClothingType] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };

    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Clothes"));
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const addData = async () => {
    if (editIndex === null) {
      await addDoc(collection(db, "Clothes"), { clothingType, size, color, price });
    } else {
      await updateDoc(doc(db, "Clothes", editIndex), { clothingType, size, color, price });
      setEditIndex(null); 
    }
    setClothingType("");
    setSize("");
    setColor("");
    setPrice("");
    fetchData(); 
  };

  const deleteData = async (docId) => {
    await deleteDoc(doc(db, "Clothes", docId));
    fetchData();
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setClothingType(singleData.clothingType);
    setSize(singleData.size);
    setColor(singleData.color);
    setPrice(singleData.price);
    setEditIndex(docId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-greeting">Clothing Inventory</h1>

      <input type="text" className="input-field" placeholder='Clothing Type' value={clothingType} onChange={(e) => setClothingType(e.target.value)} />
      <input type="text" className="input-field" placeholder='Size' value={size} onChange={(e) => setSize(e.target.value)} />
      <input type="text" className="input-field" placeholder='Color' value={color} onChange={(e) => setColor(e.target.value)} />
      <input type="number" className="input-field" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
      <button className="submit-button" onClick={addData}>{editIndex === null ? "Add" : "Update"}</button>

      <table className="record-table">
        <thead>
          <tr>
            <th>Clothing Type</th>
            <th>Size</th>
            <th>Color</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {record.map((e) => (
            <tr key={e.docId} className="record-item">
              <td>{e.clothingType}</td>
              <td>{e.size}</td>
              <td>{e.color}</td>
              <td>{e.price}</td>
              <td>
                <button className="edit-button" onClick={() => editData(e.docId)}>Edit</button>
                <button className="delete-button" onClick={() => deleteData(e.docId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
