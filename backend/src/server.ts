import fastify from "fastify";

const app = fastify({ logger : true});

app.get("/test", async () => {
    return {ok : true, message : 'Hello Fastify no projeto do gerenciador de email'}
})

app.listen({port : 3001})
    .then(address => {
        console.log(`Servidor iniciado na porta ${address}`)
    }).catch(error =>{
        app.log.error(error)
        process.exit(1)
    })