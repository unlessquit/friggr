exports.up = function (pgm) {
  pgm.sql(
    'CREATE TABLE uphoto (' +
      '  id UUID PRIMARY KEY,' +
      '  ts TIMESTAMP NOT NULL,' +
      '  user_id VARCHAR(64) NOT NULL' +
      ')'
  )
}

exports.down = function (pgm) {
  pgm.sql('DROP TABLE uphoto')
}
