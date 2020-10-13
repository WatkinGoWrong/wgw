
package main

import (
	"log"
	"github.com/streadway/amqp"
	"database/sql"
  	"fmt"
  _ "github.com/lib/pq"
  	"encoding/json"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres_password"
	dbname   = "postgres"
  )

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func main() {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	forever := make(chan bool)

	connectToQuestionQueue(ch)

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

func connectToQuestionQueue(ch *amqp.Channel){
	q, err := ch.QueueDeclare(
		"question-queue", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
			insertToQuestionDB(d.Body)
		}
	}()
}

func insertToQuestionDB(body []byte) {
	var raw map[string]interface{}

	json.Unmarshal([]byte(body), &raw)

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	  "password=%s dbname=%s sslmode=disable",
	  host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
	  panic(err)
	}

	defer db.Close()
  
	sqlStatement := `
	INSERT INTO QUESTIONSLOGGING (QUESTIONID, IPADDRESS)
	VALUES ($1, $2)`
	
	_,err = db.Exec(sqlStatement,raw["questionid"],raw["ipaddress"])
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully inserted: ", raw )
  }