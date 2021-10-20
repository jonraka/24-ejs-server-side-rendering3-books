const express = require("express");
const app = express();
require("dotenv").config()
const morgan = require("morgan");
const { sqlConnect, sqlConnectMulti } = require("./utils/db");

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.set("view engine", "ejs")
app.use(express.static("public"))

//hello123

app.get("/", async (req, res) => {
    const data = {
        page: "index",
    };

    await sqlConnectMulti(async connection => {
        data.books = await connection.execute(`
            SELECT books2.id, title, author, timeStamp, year, category AS category_id, categories.name AS category_name
            FROM books2
            LEFT JOIN categories
            ON categories.id = books2.category
        `).then(([books]) => books).catch((err) => {
            console.error(err);
            return [];
        });
    })

    res.render("pages/index", data);
});

app.get("/newbook", async (req, res) => {
    try{
        const categories = await sqlConnect("execute", "SELECT * FROM categories").then(([data]) => data)
        if(!categories.length) return res.status(500).render("pages/error", { error: "Internal Error #66234a-1" });
        console.log(categories)
        res.render("pages/newbook", {
            page: "newbook",
            categories
        });
    }catch(err){
        res.status(500).render("pages/error", { error: "Internal Error #66234a-2" })
    }
});

app.post("/newbook", async (req, res) => {
    const { title, author, year, category } = req.body;
    sqlConnect("query", "INSERT INTO books2 (title, author, year, category) VALUES (?, ?, ?, ?)", [ title, author, year, category ])
    .then(([data]) => {
        if(data?.affectedRows > 0){
            res.render("pages/error", {error: "book added !"})
        }else{
            res.render("pages/error", {error: "book not inserted"})
        }
    }).catch(err => {
        res.render("pages/error", {error: "book not inserted, internal error"})
    })
})

app.all("*", (req, res) => {
    res.status(404).render("pages/error", {
        page: "error",
        error: "Page not found"
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Listening @ PORT: ${process.env.PORT}`);
})