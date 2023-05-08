const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const writeToFile = (note, notes) => {
    note.id = uuidv4(); 
    notes.push(note);
  
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify({ notes }, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to file: ", error);
          throw err;
        }
      }
    );
  
    return note;
  };

//using the async-try-await-catch was the only way to stop the errors that kept popping up//used a tutor for help

const deleteNote = async (notes, id) => {
  notes.splice(parseInt(id), 1);

  for (let i = parseInt(id); i < notes.length; i++) {
    notes[i].id = i.toString();
  }

  try {
    await fs.promises.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify({ notes }, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to file: ", err);
        }
      }
    );
  } catch (error) {
    console.error("Error writing to file: ", error);
  }
};

module.exports = { writeToFile, deleteNote };
