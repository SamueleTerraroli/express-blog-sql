//importo la connessione al database
const connection = require('../data/db');

const index = (req, res) => {

    const sql = 'SELECT * FROM posts';

    //effetto la query al database

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'query al database fallita' })
        res.json(results)
    })
}

const show = (req, res) => {
    const id = req.params.id;
    const sqlPost = 'SELECT * FROM posts WHERE id= ?'

    const sqlTags = `SELECT posts.*, tags.*
    FROM posts
    JOIN post_tag ON post.id = post_tag.post_id
    JOIN tags On post_tag.tag_id = tags.id
    WHERE posts.id = ?
    GROUP BY posts.id;
    `;

    connection.query(sqlPost, [id], (err, results) => {
        //restituisco errore se non trovo il post
        if (err) return res.status(500).json({ error: 'Query al database fallita' })
        if (results.length === 0) return res.status(404).json({ error: 'Post non trovato' });

        //superati i controlli restituisco il primo risultato dell'array
        let post = results[0];

        //effettuo la query per i tags
        connection.query(sqlTags, [id], (err, tagsResult) => {
            if (err) return res.status(500).json({ error: 'Query al database fallita' })
            post.tags = tagsResult;
        })

        res.json(post);
    })


}

const store = (req, res) => {
    const id = posts.at(-1).id + 1;
    newPost = {
        id,
        ...req.body
    }
    posts.push(newPost);

    res.status(201);
    res.json(newPost);
    console.log(posts);

}

const update = (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id == id);
    if (!post) {
        res.status(404);
        return res.json({
            message: 'post non trovato',
            status: 404,
            error: 'not found'
        })
    }
    for (let key in req.body) {
        post[key] = req.body[key];
    }
    res.json(post);

}

const modify = (req, res) => {
    const id = req.params.id
    const post = posts.find(post => post.id == id)

    if (!post) {
        res.status(404)
        return res.json({
            message: 'partecipante non trovato',
            status: 404,
            error: 'not found'

        })
    }

    for (let key in req.body) {
        post[key] = req.body[key];
    }

    res.json(post);
}

const destroy = (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM posts WHERE id = ?';

    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ eroor: 'Eliminazione del post fallita' });
        res.sendStatus(204);
    })


}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}