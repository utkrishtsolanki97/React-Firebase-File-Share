import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { Table } from "react-bootstrap";
import { AiFillDelete, AiOutlineDownload } from "react-icons/ai";
import Dropzone from "react-dropzone";

const FileUpload = () => {
  // States for data and image
  var storage = firebase.storage();
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");

  const upload = () => {
    if (image == null) return;
    // Sending File to Firebase Storage
    console.log(image);
    for (let index = 0; index < image.length; index++) {
      const file = image[index];
      console.log(file);
      storage
        .ref(`/${file.name}`)
        .put(file)
        .on("state_changed", alert("success"), alert);

      listItem();
    }
    // storage
    //   .ref(`/${image.name}`)
    //   .put(image)
    //   .on("state_changed", alert("success"), alert);
    // listItem();
  };

  // List All Files
  const listItem = () => {
    storage
      .ref()
      .child("/")
      .listAll()
      .then((res) => {
        console.log(res.items);
        const list = [];
        res.items.forEach((item) => {
          // setData((arr) => [...arr, item.name]);
          list.push(item.name);
        });
        setData(list);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    listItem();
  }, []);

  const downloadImage = (name) => {
    console.log(name);
    storage
      .ref()
      .child(`/${name}`)
      .getDownloadURL()
      .then((url) => {
        // Insert url into an <img> tag to "download"
        // console.log(url);
        window.open(url, "_blank");
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      });
  };

  const deleteImage = (name) => {
    console.log(name);
    storage
      .ref()
      .child(`/${name}`)
      .delete()
      .then(() => {
        window.alert(`Deleted Image : ${name}`);
        listItem();
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      });
  };

  return (
    <div className="App" style={{ marginTop: "20px" }}>
      <center>
        <input
          type="file"
          multiple
          onChange={(e) => {
            setImage(e.target.files);
          }}
        />
        <button onClick={upload}>Upload</button>
        <br />
        <br />
        <button onClick={listItem}>List Item</button>
        <br />
        <br />
        <div style={{ margin: "20px" }}>
          <Table bordered hover striped="columns">
            <thead>
              <tr>
                <th width={"10%"}>#</th>
                <th>Value</th>
                <th width={"10%"}>Download</th>
                <th width={"10%"}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{value}</td>
                    <td>
                      <AiOutlineDownload onClick={() => downloadImage(value)} />
                    </td>
                    <td>
                      <AiFillDelete onClick={() => deleteImage(value)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        {/* <Dropzone /> */}
      </center>
    </div>
  );
};

export default FileUpload;
