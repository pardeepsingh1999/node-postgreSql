const text = 'INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *'
const values = ['pardeep', 'pp@gmail.com', 'pp', 21]

const query = `
    CREATE TABLE users (
        email varchar PRIMARY KEY NOT NULL,
        name varchar NOT NULL,
        password varchar NOT NULL,
        age int NOT NULL
    );
`;


promise
client
  .query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))

client
.query("SELECT * FROM users WHERE email='pop@gmail.com'")
.then(res => console.log(res.rows.length))
.catch(err => console.log(err))

client
  .query(query)
  .then(res => {
      console.log('Table is successfully created');
  })
  .catch(err => {
      console.error(err);
  })
  .finally(() => {
      client.end();
  });