import express from "express";
import morgan from "morgan"
import { resolve } from "path"
import { writeFile, readFile } from "fs/promises"
import config from "#config";
import compare from "#compare"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(express.static("/public"));

app.listen(config.port, () => {
    console.log(`Listening @ ${config.port}`);
  });

  let friendsPath = resolve() +"/data/friends.json";
let friends;
// console.log(friendsPath)


readFile(friendsPath, "utf8")
.then( (r) => {
friends = JSON.parse(r)
})

app.get("/count", (req, res)=>{
  res.type("text/plain")
  res.send(`${friends.length}`)
})

app.post("/compareProfile", (req, res)=>{
  let me = req.body;
  let bestMatch = compare(me, friends);
  res.json(bestMatch);
})

app.post("/addProfile", (req, res)=>{
let addOn= friends.length +1;
let person = req.body;
person.name = person.name+"_"+addOn;
friends.push(person)
friends = JSON.stringify(friends, null, 4)
writeFile(friendsPath, friends)
res.json(person)
})

app.use((req, res, next) => {
    res.status(404).send("404: Page Not Found, Sorry")
})

