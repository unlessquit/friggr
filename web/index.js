var app = require('./src/app')

var port = process.env.FRIGGR_PORT || 3000

app.build().listen(port, function () {
  console.log('Running at http://localhost:' + port)
})
