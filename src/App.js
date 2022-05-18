import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const addItem = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please Enter A Value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, name: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "Item Edited", "success");
    } else {
      showAlert(true, "Item Added Succesfully", "success");
      const item = { id: new Date().getTime().toString(), name: name };
      setList([...list, item]);
      setName("");
    }
  };
  const showAlert = (show = false, msg, type) => {
    setAlert({ show, msg, type });
  };
  const clearList = () => {
    setList([]);
    showAlert(true, "List is clear", "danger");
  };
  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "Item Deleted", "danger");
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(editItem.name);
  };

  console.log(list);
  return (
    <section className="section-center" onSubmit={addItem}>
      <form action="" className="grocery-form">
        {alert.show && (
          <Alert alert={alert} removeAlert={showAlert} setAlert={setAlert} />
        )}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            placeholder="e.g eggs"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={addItem}>
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} deleteItem={deleteItem} editItem={editItem} />
        <button className="clear-btn" onClick={clearList}>
          clear list
        </button>
      </div>
    </section>
  );
}

export default App;
