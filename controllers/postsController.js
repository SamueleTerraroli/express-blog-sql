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
    const post = posts.find(post => post.id == req.params.id)
    if (!post) {
        res.status(404);
        return res.json({
            message: 'post non trovato',
            status: 404,
            error: 'not found'
        })
    }
    res.json(post);
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