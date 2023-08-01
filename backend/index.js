const app = require('./src/app')
const port = 3001
app.listen(port, () => {
  console.log("🚀 Backend rodando na porta ", port);
});
