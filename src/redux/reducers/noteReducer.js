import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from "../actions/noteAction";

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || [],
  idCounter: 1,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      const newNote = {
        note : action.payload,
        id: state.idCounter,
      };
      console.log(newNote);
      const updatedNotes = [...state.notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return {
        ...state,
        notes: updatedNotes,
        idCounter: state.idCounter + 1,
      };
    }
    case EDIT_NOTE: {
      const {note ,noteId} = action.payload;
      const updatedNotes = state.notes.map((_n) => _n.id === noteId ? { ..._n, note } : _n );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      console.log(updatedNotes);
      return {
        ...state,
        notes: updatedNotes,
      };
    }

    case DELETE_NOTE : {
        const updatedNotes = state.notes.filter((note) => note.id !== action.payload);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        return {
            ...state,
            notes : updatedNotes
        }
    }

    default : {
        return state
    }
  }
};
