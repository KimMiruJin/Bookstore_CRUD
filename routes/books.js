var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "kyj",
  password: "321486",
  database: "kyj"
})

conn.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("DB 연결성공!!")
  }
});


/* GET home page. */
router.get('/', function (req, res, next) {
  // res.sender(); 데이터를 던져줌
  var sql = "SELECT * FROM books";
  conn.query(sql, function (err, row) {
    if (err) {
      throw err;
    } else {
      res.render('index', { page: './sub/books.ejs', data: row });
    }
  });
});

router.post('/addBook', function (req, res, next) {
  // res.sender(); 데이터를 던져줌
  var sql = "SELECT * FROM books WHERE booksName = ?";

  conn.query(sql, [req.body.booksName], function (err, row) {
    if (err) {
      throw err;
    }
    if (row.length == 0) {
      var sql = "INSERT INTO books(booksName, booksQty, booksPrice, booksImg) VALUES (?,?,?,?);";
      conn.query(sql, [req.body.booksName, req.body.booksQty, req.body.booksPrice, req.body.booksImg], function (err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        if (result) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.write("<script>alert('도서 등록이 완료되었습니다!'); location.href='/books'</script>")
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.write("<script>alert('도서 등록이 실패하였습니다.!'); history.back();</script>")
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write("<script>alert('중복된 도서입니다!'); history.back();</script>")
    }
  });
});

router.post('/modify', function (req, res, next) {

  var sql = "UPDATE books SET ? WHERE booksNo = ?";

  conn.query(sql, [req.body, req.body.booksNo], function (err, result) {
    if (err) {
      throw err;
    }
    if (result) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write("<script>alert('도서 수정이 완료되었습니다!'); location.href='/books'</script>")
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write("<script>alert('도서 수정이 실패하였습니다.!'); history.back();</script>")
    }

  });
});

router.get('/remove/:id', function (req, res, next) {
  var id = req.params.id
  var sql = "DELETE FROM books WHERE booksNo = ?"
  conn.query(sql, [id], function (err, result) {
    if (err) {
      throw err;
    } if (result) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write("<script>alert('도서 삭제가 완료되었습니다!'); location.href='/books'</script>")
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write("<script>alert('도서 삭제가 실패하였습니다.!'); history.back();</script>")
    }
  })
})

module.exports = router;
