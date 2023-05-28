import { useEffect, useState } from "react";
import Contact from "./Contact";
import Loader from "./Loader";

const ContactList = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://jsonplaceholder.typicode.com/users`;
      try {
        const data = await fetch(url);
        const filteredData = await data.json();
        setUser(filteredData);
        console.log("userrr", user);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    setLoading(true);
    console.log(userName);
    console.log(userEmail);
    console.log(userPhone);
    if (!userName || !userEmail || !userPhone) {
      alert("PLEASE ADD ALL THE FEILDS");
      return setLoading(false);
    }
    const Generateddata = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        method: "POST",
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          phone: userPhone,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await Generateddata.json();
    const newData = [...user, { ...data, id: user.length + 1 }];
    setUser(newData);
    setAddMode(false);
    setLoading(false);
  };

  const handleDelete = (id) => {
    setLoading(true);
    const newUser = user.filter((u) => u.id !== id);
    setUser(newUser);
    setLoading(false);
  };

  const handleUpdate = async (id, name, email, phone) => {
    setLoading(true);
    let fetchData = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          name: name,
          email: email,
          phone: phone,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log("meee", fetchData.status);
    if (fetchData.status === 200) {
      const updatedUser = await fetchData.json();
      console.log(updatedUser);
      let newUser = user.map((u) => {
        if (u.id === id) {
          return updatedUser;
        }
        return u;
      });
      setUser(newUser);
      setLoading(false);
    }else if(fetchData.status===500){
      let newUser = user.map((u) => {
        if (u.id === id) {
          return {  
             id: id,
            name: name,
            email: email,
            phone: phone,
          } 
        }
        return u;
      });
      setUser(newUser);
      setLoading(false);
       
    }
  };

  if (loading) {
    return <Loader />;
  }

  console.log("newUser", user);
  return (
    <>
      <div className="addContact">
        <button onClick={() => setAddMode(!addMode)}>ADD CONTACT</button>
      </div>
      {addMode ? (
        <>
          <div className="addform">
            <input
              placeholder="Name"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              placeholder="EMAIL"
              type="emial"
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              placeholder="PHONE"
              type="NUMBER"
              onChange={(e) => setUserPhone(e.target.value)}
            />
            <button onClick={handleAdd}>ADD</button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="container">
        {user.map((u) => {
          const { id, name, email, phone } = u;
          return (
            <Contact
              name={name}
              email={email}
              phone={phone}
              id={id}
              key={id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          );
        })}
      </div>
    </>
  );
};
export default ContactList;
