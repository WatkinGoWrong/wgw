const keys = require('./keys')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const amqp = require('amqplib/callback_api');

//uuidv4()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));

app.get('/questions/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM QUESTIONS');

    res.send(values.rows);
});

app.get('/questions/logging', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM QUESTIONSLOGGING');

    res.send(values.rows);
});

app.get('/questions/random', async (req, res) => {
    const values = await pgClient.query('select * from QUESTIONS order by random() limit 1');
    /*pgClient.query('UPDATE QUESTIONS set ACCESSED = ACCESSED + 1 WHERE QUESTIONID = ($1)',
        [values.rows[0].questionid])
        .catch(err => {
            console.log(err)
            return error;
        });*/
    addToQueue('question-queue',{
        'questionid':values.rows[0].questionid,
        'ipaddress':req.connection.remoteAddress
        })
    res.status(200)
    res.send(values.rows);
});


app.post('/questions', async (req, res) => {
    console.log(question)
    pgClient.query('INSERT INTO QUESTIONS(QUESTION) VALUES($1)',
        [req.body.question])
        .catch(err => {
            console.log(err)
        });
    res.status(200)
    res.send()
});

app.get('/', (req, res) => {
    res.send('API for retrieving player order questions')
})

app.listen(5000, err => {
    console.log('Listening')
})

function addToQueue(queueName, msg){
    amqp.connect('amqp://guest:guest@rabbitmq:5672', function(error0, connection) {
        if (error0) {
          throw error0;
        }
        connection.createChannel(function(error1, channel) {
          if (error1) {
            throw error1;
          }
          
          channel.assertQueue(queueName, {
            durable: false
          });
      
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
          console.log(" [x] Sent %s", msg);
        });
      });
}