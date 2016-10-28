var app = require('./src/app')

app.build().listen(3000, function () {
  console.log('Running at http://localhost:3000')
})
