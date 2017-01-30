exports.up = function (pgm) {
  pgm.sql(
    'ALTER TABLE uphoto ADD COLUMN caption TEXT DEFAULT(\'\')'
  )
}

exports.down = function (pgm) {
  pgm.sql(
    'ALTER TABLE uphoto DROP COLUMN caption'
  )
}
