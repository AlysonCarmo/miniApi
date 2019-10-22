
const express  = require("express");

const server = express();

server.use(express.json());

const projects = [];
var qtdExec = 0;



server.use((req, res, next) =>{

     qtdExec++;
     console.log(`Execuções: ${qtdExec}`);

     return next();

});


function checkIdProject(req, res, next){
   
     const index = projects.findIndex((obj)=>{ 
          return obj.id == req.params.id;
     });

     if(!req.params.id || index === -1){
         return res.status(400).json({"Error":"Id not found"});    
     }

     return next();

};



server.get('/projects', (req, res) =>{

   res.json(projects); 

});

server.post('/projects', (req, res) =>{
     const { id, title } = req.body; 
     const obj = {"id": id, "title": title, "tasks":[]} 
     projects.push(obj);
     return res.json(projects);

});

server.put('/projects/:id', checkIdProject, (req, res) =>{

     const { id } = req.params;
     const { title } = req.body;
     
     const index = projects.findIndex((obj)=>{ 
        return obj.id == id;

     })

     projects[index].title = title

     return res.json(projects);

});

server.delete('/projects/:id', checkIdProject, (req, res) =>{
     const { id } = req.params;
     
     const index = projects.findIndex((obj)=>{
        return obj.id == id;
     })

     projects.splice(index, 1);

     return res.json(projects);

});

server.post('/projects/:id/tasks', checkIdProject, (req, res) =>{

     const { id } = req.params;
     const { title } = req.body;
     
     const index = projects.findIndex((obj)=>{
        return obj.id == id;
     })

     projects[index].tasks.push(title);

     return res.json(projects);

});

server.listen(3000);
