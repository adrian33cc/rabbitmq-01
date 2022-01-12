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
  const enterprise = "Bunsan"
  
  try {
    const conn = await amqp.connect(rabbitSettings);
    console.log("Conexion lista!!...")

    const channel = await conn.createChannel()
    console.log("Canal creado!!...")

    const res = await channel.assertQueue(queue)
    console.log("Cola creada!!...")

    console.log("Waiting for messages")
    channel.consume(queue, message =>{
      let employee = JSON.parse(message.content.toString())
      console.log(`Received: ${employee.name}`)
      console.log(employee)

      if(employee.enterprise == enterprise){
        channel.ack(message)
        console.log("Se leyo y borro el mensaje de la cola")
      }else{
        console.log("Este mensaje no era para mi ")
      }

    })




  } catch (error) {
    console.log(`Error -> ${error}`)
  }

}