const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/facultyDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Faculty = mongoose.model("Faculty",{
name:String,
department:String,
floor:String,
cabin:String,
workingHours:String,
status:String,
lastUpdated:Number,
monday:String,
tuesday:String,
wednesday:String,
thursday:String,
friday:String
});

const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let facultyData = [
  {
    name: "Dr Rao",
    department: "Computer Science",
    floor: "3",
    cabin: "C312",
    workingHours: "Full Day (9 AM - 4 PM)",
    status: "Available",
    lastUpdated: Date.now()
  },
  {
    name: "Dr Anita",
    department: "Information Technology",
    floor: "2",
    cabin: "B204",
    workingHours: "Full Day (10 AM - 5 PM)",
    status: "Busy",
    lastUpdated: Date.now()
  }
];

// get faculty list
app.get("/api/faculty", async (req,res)=>{
const data = await Faculty.find();
res.json(data);
});

// update faculty status
app.post("/api/update", async (req,res)=>{

const {name,status,workingHours} = req.body;

const result = await Faculty.updateOne(
{ name: name },
{
status,
workingHours,
lastUpdated:Date.now()
}
);

if(result.matchedCount === 0){

res.send("Faculty not found");

}else{

res.send("Status Updated");

}

});

app.post("/api/register", async (req,res)=>{

const {name,department,floor,cabin,workingHours} = req.body;

const faculty = new Faculty({
name,
department,
floor,
cabin,
workingHours,
status:"Available",
lastUpdated:Date.now(),
monday:"Not Set",
tuesday:"Not Set",
wednesday:"Not Set",
thursday:"Not Set",
friday:"Not Set"
});

await faculty.save();

res.send("Faculty Added");

});

app.post("/api/updateSchedule", async (req,res)=>{

try{

const {name,monday,tuesday,wednesday,thursday,friday} = req.body;

const faculty = await Faculty.findOne({
name: new RegExp("^"+name.trim()+"$","i")
});

if(!faculty){
res.send("Faculty not found");
return;
}

faculty.monday = monday;
faculty.tuesday = tuesday;
faculty.wednesday = wednesday;
faculty.thursday = thursday;
faculty.friday = friday;

await faculty.save();

res.send("Weekly schedule updated");

}catch(err){
console.log(err);
res.send("Error updating schedule");
}

});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});