import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineModeEdit, MdOutlineWbSunny } from "react-icons/md";
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
  const [checkedNotes, setCheckedNotes] = useState({}); 
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const [displayNotes, setDisplayNotes] = useState([]);
  const [status, setStatus] = useState("ALL");
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
        const searchNotes = notes.filter((item) => item.note.toLowerCase().includes(search.toLowerCase()));
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
    console.log(id)
    setCheckedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if(status === "ALL"){
      setDisplayNotes(notes);
    }else if(status === "Complete"){
      setDisplayNotes(notes.filter((note) => checkedNotes[note.id]));
    }else if(status === "Incomplete"){
      setDisplayNotes(notes.filter((note) => !checkedNotes[note.id]));
    }
  }, [status,notes,checkedNotes]);

  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <div
      className={`w-full min-h-screen my-auto pt-10 flex items-center justify-start flex-col text-center p-8 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black" 
      } ${isEdit && 'bg-gray-400'} ${toggle && 'bg-gray-400'}`}
    >
      <p className="text-2xl">TODO LIST</p>
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
        <select className="bg-[#6C63FF] hover:bg-[#534CC2] rounded-md p-2 text-white outline-none" onClick={(e) => setStatus(e.target.value)}>
          <option className="bg-white text-[#6C63FF]">ALL</option>
          <option className="bg-white text-[#6C63FF]">Complete</option>
          <option className="bg-white text-[#6C63FF]">Incomplete</option>
        </select>
        <button className="bg-[#6C63FF] hover:bg-[#534CC2] p-3 rounded-md text-white" onClick={handleTheme}>
          {dark ? <MdOutlineWbSunny /> : <IoMoonOutline />}
        </button>
      </div>
      <div className="p-10">
        {displayNotes.length > 0 ? (
          <div>
            {displayNotes.map((note, index) => (
              <div
                key={note.id}
                className="flex items-center justify-between w-[400px] p-4 text-xl border-b border-b-[#6C63FF]"
              >
                 <div className={`flex gap-4 items-center`}>
                  <input
                    type="checkbox"
                    checked={checkedNotes[note.id] || false}
                    onChange={() => handleCheckboxChange(note.id)}
                    className={`w-6 h-6`}
                  />
                  <p
                    style={{ textDecoration: checkedNotes[note.id] ? "line-through" : "none" , opacity : checkedNotes[note.id] ? 0.5 : 1}}
                  >
                    {note.note} {index + 1}#
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
          status={status}
        />
        <button
          onClick={() => setToggle(true)}
          className="absolute right-20 bottom-40 bg-[#6C63FF] text-white rounded-[50%] p-2 text-2xl"
        >
          <IoIosAdd />
        </button>
      </div>
    </div>
  );
}

export default App;
