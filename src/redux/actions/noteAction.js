export const ADD_NOTE = "ADD_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";


export const add_Note = (note) => ({
    type : ADD_NOTE,
    payload : note
});

export const edit_Note = (note, noteId) => ({
    type : EDIT_NOTE,
    payload : {note, noteId}
});

export const delete_Note = (id) => ({
    type : DELETE_NOTE,
    payload : id
});

