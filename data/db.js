const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'blog_db',
    port: 3306
})

connectiom.connect((err) => {
    //espongo l'errore qualora dovesse esserci
    if (err) throw err;
    //log in caso di connessione avvenuta con successo
    console.log('MySql Connesso!');

})

module.exports = connection;