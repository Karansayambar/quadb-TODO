import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_Note, edit_Note } from "../redux/actions/noteAction";

const AddTask = ({ toggle, setToggle, isEdit, setIsEdit, updateTo, updateNote }) => {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);


  useEffect(() => {
    if (isEdit && updateTo) {
      setNote(updateTo.note);
    }
  }, [isEdit, updateTo]);

  const handleAddNote = () => {
    if (note.trim()) {
      if (isEdit && updateTo) {
        updateNote(note, updateTo.id);
      } else {
        dispatch(add_Note(note));
      }
      setToggle(false);
      setNote("");
      setIsEdit(false);
    }
  };
  

  return (
    <div className={`${toggle ? 'flex opacity-100' : 'hidden'} w-[300px] left-10 md:left-40 dd:left-60 lg:left-96 xl:left-[30rem] md:w-[350px] absolute  items-center justify-evenly flex-col top-20 h-[200px] bg-white rounded-md ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <p className="text-xl">New Note</p>
      <input
        type="text"
        placeholder="Enter Note"
        className="border-2 border-[#6C63FF] rounded-md outline-none w-[80%] p-1"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="w-full flex items-center justify-between p-4 gap-8">
        <button onClick={() => { setToggle(false); setIsEdit(false); }} className="border border-[#6C63FF] hover:border-[] rounded-md py-1 px-4 text-[#6C63FF]">
          Cancel
        </button>
        <button onClick={handleAddNote} className="bg-[#6C63FF] rounded-md py-1 px-4 text-white">
          {isEdit ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default AddTask;
