import { useState } from "react";
const Contact = ({ id, name, email, phone, handleDelete, handleUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [userName, setName] = useState(name);
  const [userEmail, setEmail] = useState(email);
  const [userPhone, setPhone] = useState(phone);
  const handleClickUpdate = async () => {
    const response = await handleUpdate(id, userName, userEmail, userPhone);
    setEditMode(false);
  };
  return (
    <>
      <div className="contact">
        {editMode ? (
          <>
            NAME :{" "}
            <input
              value={userName}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            EMAIL :{" "}
            <input
              value={userEmail}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            PHONE :{" "}
            <input
              value={userPhone}
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className="name">
              <img
                src="https://cdn2.iconfinder.com/data/icons/user-interface-169/32/about-512.png"
                alt=""
              />
              NAME : {name}
            </span>
            <span className="emial">EMAIL : {email}</span>
            <span className="phone">PHONE : {phone}</span>
          </>
        )}

        {editMode ? (
          <>
            <button onClick={() => setEditMode(false)}>CANCEL</button>
            <button onClick={() => handleClickUpdate()}>UPDATE</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={() => handleDelete(id)}>DELETE</button>
          </>
        )}
      </div>
    </>
  );
};
export default Contact;
