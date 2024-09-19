import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import { delete_Note, edit_Note } from "./redux/actions/noteAction";
import { changeToDark, changeToLight } from "./redux/actions/themeAction";

function App() {
  const [toggle, setToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dark, setDark] = useState(false);
  const [updateTo, setUpdateTo] = useState({});
  const [search, setSearch] = useState("");
  const [checkedNotes, setCheckedNotes] = useState({}); // Track checked notes
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const [displayNotes, setDisplayNotes] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  const deleteNote = (id) => {
    dispatch(delete_Note(id));
  };

  const updateNote = (note, id) => {
    dispatch(edit_Note(note, id));
    setIsEdit(false);
    setToggle(false);
  };

  const handleEditClick = (note) => {
    setUpdateTo(note);
    setIsEdit(true);
    setToggle(true);
  };

  const handleSearch = () => {
      const searchNotes = notes.filter((item) =>
        Array.isArray(item.note) &&
        item.note.some(noteText =>
          typeof noteText === "string" &&
          noteText.toLowerCase().includes(search.toLowerCase())
        )
      );
      setDisplayNotes(searchNotes);
  };

  const handleTheme = () => {
    if (theme === "dark") {
      dispatch(changeToLight());
    } else {
      dispatch(changeToDark());
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    setDisplayNotes(notes);
  }, [notes]);

  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div
      className={`w-full min-h-[900px] dd:min-h-[1370px] md:h-[900px] my-auto lg:min-h-[900px] pt-10 flex items-center justify-start flex-col text-center p-8 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <p>TODO LIST</p>
      <div className="sm:w-[70%] md:w-[600px] flex items-center gap-2 justify-evenly box-content relative">
        <div className="flex items-center justify-between sm:w-[70%] md:w-[70%] border-2 border-[#6C63FF] p-1 rounded-md">
          <input
            type="text"
            placeholder="Search Note"
            className="border-none outline-none w-[80%] bg-transparent"
            name="note"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>
            <CiSearch />
          </button>
        </div>
        <select className="bg-[#6C63FF] rounded-md p-2 text-white outline-none">
          <option>ALL</option>
          <option>Complete</option>
          <option>Incomplete</option>
        </select>
        <button className="bg-[#6C63FF] p-3 rounded-md text-white" onClick={handleTheme}>
          <IoMoonOutline />
        </button>
      </div>
      <div className="p-10">
        {displayNotes.length > 0 ? (
          <div>
            {displayNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between w-[400px] p-4 text-xl border-b border-b-[#6C63FF]"
              >
                 <div className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    checked={checkedNotes[note.id] || false}
                    onChange={() => handleCheckboxChange(note.id)}
                  />
                  <p
                    style={{ textDecoration: checkedNotes[note.id] ? "line-through" : "none" }}
                  >
                    {note.note} {note.id}#
                  </p>
                </div>
                <span className="flex gap-4">
                  <MdOutlineModeEdit onClick={() => handleEditClick(note)} />
                  <RiDeleteBin6Line onClick={() => deleteNote(note.id)} />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <img src="noFound.png" alt="not found" />
        )}
        <AddTask
          setToggle={setToggle}
          toggle={toggle}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          updateTo={updateTo}
          updateNote={updateNote}
        />
        <button
          onClick={() => setToggle(true)}
          className="absolute right-40 bottom-40 bg-[#6C63FF] text-white rounded-[50%] p-2 text-2xl"
        >
          <IoIosAdd />
        </button>
      </div>
    </div>
  );
}

export default App;
