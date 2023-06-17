import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import firebase from "../firebase";

const TextUpload = () => {
  var database = firebase.database();

  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    database
      .ref("user")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setList(data.data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [list]);

  const submit = () => {
    let templist = list;
    templist.push(text);
    setList(templist);
    setText("");
    writeUserData(templist);
  };
  const deleteText = (id) => {
    console.log(id);
    let templist = list.filter((_, i) => i !== id);
    setList(templist);
    writeUserData(templist);
  };

  function writeUserData(data) {
    database
      .ref("user")
      .set({
        data: data,
      })
      .catch(alert);
  }

  return (
    <div style={{ margin: "20px" }}>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={submit}>Submit</button>
      </div>
      <br />
      <div>
        <Table bordered hover striped="columns">
          <thead>
            <tr>
              <th width={"10%"}>#</th>
              <th>Value</th>
              <th width={"10%"}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list.map((value, id) => {
              return (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{value}</td>
                  <td>
                    <MdDeleteForever onClick={() => deleteText(id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TextUpload;
