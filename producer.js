const amqp = require("amqplib")

const rabbitSettings = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
  authMecanism:["PLAIN", "AMQPLAIN", "EXTERNAL"]
}

connect()
async function connect() {
  const queue = "employees"
  const msg =[
    {"name": "Aprendiendo RabbitMQ 1", "enterprise": "Bunsan"},
    {"name": "Aprendiendo RabbitMQ 2", "enterprise": "Facebook"},
    {"name": "Aprendiendo RabbitMQ 3", "enterprise": "Twitter"},
    {"name": "Aprendiendo RabbitMQ 4", "enterprise": "RecruIT"}
  ]
  try {
    const conn = await amqp.connect(rabbitSettings);
    console.log("Conexion lista!!...")

    const channel = await conn.createChannel()
    console.log("Canal creado!!...")

    const res = await channel.assertQueue(queue)
    console.log("Cola creada!!...")

    for( let m in msg){
      await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg[m])))
      console.log(`Message to queue: ${queue }`)
    }

  } catch (error) {
    console.log(`Error -> ${error}`)
  }

}