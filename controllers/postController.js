const db = require("../db");  (RICHIAMO IL DATABASE)

// INDEX

function index(req, res) {
  const sql = "SELECT * FROM posts";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Errore database"
      });
    }

    res.json(results);
  });
}



// SHOW
function show(req, res) {
  const id = req.params.id;

  const sql = "SELECT * FROM posts WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Errore database"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "Post non trovato"
      });
    }

    res.json(results[0]);
  });
}









function update(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({
      error: "Post non trovato"
    });
  }

  if (!req.body) {
    return res.status(400).json({
      error: "Body mancante"
    });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.tags = req.body.tags || post.tags;

  res.json(post);
}

// DESTROY
 function destroy(req, res) {
  const id = req.params.id;

  const sql = "DELETE FROM posts WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Errore eliminazione"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Post non trovato"
      });
    }

    res.sendStatus(204);
  });
}


// STORE
function store(req, res) {
  const { title, content, image, tags } = req.body;

  const sql = `
    INSERT INTO posts (title, content, image, tags)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [title, content, image, tags], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Errore creazione post"
      });
    }

    res.status(201).json({
      message: "Post creato",
      id: result.insertId
    });
  });
}



//EXPORT
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
