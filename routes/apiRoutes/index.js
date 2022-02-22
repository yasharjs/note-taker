const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const {nanoid} = require('nanoid');

const loadDb = () =>{
    return JSON.parse(
        fs.readFileSync(path.join(__dirname,"../../db/db.json"),"utf-8")
    );
}

const saveDb = (noteObj) => {
    let db = loadDb();
    // validate data
    if (!noteObj.title) {
       reject("Error: 'title' property missing");
       return;
    } else if (!noteObj.text) {
       reject("Error: 'text' property missing");
       return;
    }
    // generate new uuid
    noteObj.id = nanoid();
    // add to db
    db.push(noteObj);
    // write file
    fs.writeFileSync(
       path.join(__dirname, "../../db/db.json"),
       JSON.stringify(db, null, 2)
    );
    return noteObj;
 };

const deleteDb = (noteId) => {
    const db = loadDb();
   // create new array without the item containing the specified id
   let newDb = db.filter((noteObj) => noteObj.id != noteId);
   // write file
   fs.writeFileSync(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify(newDb, null, 2)
   );
   return newDb;
}
 
router.get("/notes",(req,res)=>{
    res.json(loadDb());
})

router.post("/notes",(req,res)=>{
    res.json(saveDb(req.body));
})

router.delete("/notes/:id", (req, res) => {
    res.json(deleteDb(req.params.id));
 });

module.exports = router;