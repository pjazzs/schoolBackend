const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./database")
const Students = require("./model/students")
dotenv.config()

const app = express()

app.use(express.json())

connectDB()
 
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`Express Sever running on ${PORT}`)
})


// CRUD


app.post("/student", async (req, res)=>{

    try {
        const { name, email, phoneNumber, password } = req.body

        const student = await Students.findOne({email})
    
        if(student)
            return res.status(404).json({msg: "Student already exist!"})
    
        const newStudent = new Students({ name, email, phoneNumber, password })
     
        await newStudent.save() 
    
        return res.status(200).json({msg: "Student added succefully."})
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }

   

}) 



app.get("/student/:id", async (req, res) =>{
    try { 
        const {id} = req.params

        const student = await Students.findById(id)

        if(!student)
        return res.status(200).json()({msg: "this student does not exist!"})

        return res.status(200).json(student)

        // const id = req.params.id
        
    } catch (error) {
        
        return res.status(500).json({msg: error.message})
    }
})



// update

app.put("/student/:id", async (req, res) =>{

    try {
        const {id} = req.params

        const {email, name, password, phoneNumber} = req.body

        const student = await Students.findByIdAndUpdate(id, {email, name, password, phoneNumber})

        return res.status(200).json({msg: "student updated successfully"})
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    
}
})



// deleting

app.delete("/student/:id", async (req, res) =>{
    try {
        const {id} = req.params

        const studentToDelete = await Students.findById(id)

        if(!studentToDelete)
        return res.status(404).json({msg: "this student does'nt exist"})

        const deletedStudent = await Students.findByIdAndDelete(id)
        return res.status(200).json({msg: "student deleted successfuly"})
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }
})

// ASSIGNMENT
// HOSPITAL MGT DETAILS
// CREATE FN, LN, CARD NO.
// DOC ASSIGN
// NURSE ASSIGN
// DIAGONISE
// DOC REPORT
// NEXT OF KIN
// CONTACT OF NET OF KIN

// CREATE ONE ---- POSTMAN
// UPDATE ONE --- UPDATE REQ
// READ --- GET
// DELETE--- DELETE REQ



// app.get("/students", async (req, res)=>{

//     try {
//          const allStudents = await Students.find()

//          if(!allStudents)
//          return res.status(404).json({msg: "No student on the database"})

//     res.status(200).json(allStudents)
//     } catch (error) {
//         return res.status(500).json({msg: error.message})
        
//     }

   
// })



// app.delete("/student/:id", async (req, res)=>{
//    try {
//     const id = req.params.id

//     const user = await Students.findOne({_id: id})

//     if(!user) res.json({msg: "User does not exist!"})

//     const student = await Students.findByIdAndDelete(id) 

//     res.json({msg: "Student deleted successfully!"})
    
//    } catch (error) {
//     return res.json({msg: error.msg})
//    }
// })



// app.patch("/student/:id", async (req, res)=>{

//     console.log("hftgyfgvghfvgbh")

//     const {name, email, phoneNumber, password} = req.body

//     const id = req.params.id

//     const nStudent = await Students.findByIdAndUpdate(id, {name, email, phoneNumber, password})

//     res.json({msg: "student updated successfully!"})
// })