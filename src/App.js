import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function Header() {
  return (
    <header className="header bg-warning p-2">
      <h5 className="text-white">Note App</h5>
    </header>
  );
}

//Component Form
function MainContent(props) {
  const [value, setValue] = useState("");

  //Function Input dữ liệu
  const handleInput = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  //Function Submit dữ liệu
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!props.actionsForm) {
      const newTask = {
        content: value,
      };
      props.onAddEdit(newTask);
    } else {
      const editTask = {
        id: props.data.id,
        content: value,
      };
      props.onAddEdit(editTask);
    }

    setValue("");
  };

  useEffect(() => {
    setValue(props.data.content);
  }, [props.data]);

  return (
    <div className="main-content">
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3 form-group"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Take a Note..."
            onChange={handleInput}
            value={value}
          />
        </Form.Group>
        <Button variant="warning" className="addbtn" type="submit">
          <i className="fa-solid fa-plus"></i>
        </Button>{" "}
      </Form>
    </div>
  );
}

//Component Table
function TableView(props) {
  const listNotes = props.listNotes;
  //Function Reamove

  const handleRemove = (id) => {
    props.onRemove(id);
  };

  //EDIT
  const handleEdit = (id) => {
    props.onEdit(id);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Note Content</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listNotes.map((note) => (
          <tr key={note.id}>
            <td>{note.id}</td>
            <td>{note.content}</td>
            <td>
              <button
                className="btn btn-none btn-edit"
                onClick={() => handleEdit(note.id)}
              >
                <i className="fa-solid fa-pen text-primary"></i>
              </button>
              <button
                className="btn  btn-remove"
                onClick={() => handleRemove(note.id)}
              >
                <i className="fa-solid fa-trash-can text-danger"></i>
              </button>
            </td>
          </tr>
        ))}
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>
            <button className="btn btn-none btn-edit">
              <i className="fa-solid fa-pen text-primary"></i>
            </button>
            <button className="btn  btn-remove">
<i className="fa-solid fa-trash-can text-danger"></i>
            </button>
          </td>
        </tr> */}
      </tbody>
    </Table>
  );
}

//Component Tổng
function App() {
  const [listNotes, setListNotes] = useState([]);
  const [data, setData] = useState({
    id: "",
    content: "",
  });
  const [actionsForm, setActionsForm] = useState(false);

  //Fucntion Add và Edit dữ liệu
  // Khi add mới (Không có id từ form)
  const handleAddEdit = (data) => {
    if (data.content === "") {
      alert("Vui lòng nhập nội dung");
      return;
    }
    if (!data.id) {
      data.id = listNotes.length ? listNotes[listNotes.length - 1].id + 1 : 1;
      if (listNotes.length) {
        return setListNotes([...listNotes, data]);
      }
      setListNotes([data]);
    } else {
      const newData = listNotes.map((item) => {
        if (item.id === data.id) {
          return { ...item, ...data };
        }
        return item;
      });

      setListNotes(newData);
      setActionsForm(false);
    }
  };

  //Xử lý khi Remove
  const handleRemove = (id) => {
    setListNotes(listNotes.filter((note) => note.id !== id));
  };

  //Xử lý ấn nút edit
  const handleEdit = (id) => {
    const findNote = listNotes.find((note) => note.id === id);
    setData(findNote);
    setActionsForm(true);
  };

  return (
    <div className="wrapper">
      <Header />
      <MainContent
        onAddEdit={handleAddEdit}
        data={data}
        actionsForm={actionsForm}
      />
      <TableView
        listNotes={listNotes}
        onRemove={handleRemove}
        onAddEdit={handleAddEdit}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;