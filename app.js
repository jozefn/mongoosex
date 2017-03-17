var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Book = require('./book.model');
var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req,res){
  res.send("hello - online!");
});

app.get('/books', function(req,res){
  console.log("getting all books");

  Book.find({})
	.exec(function(err,books){
		if(err){
		  res.send('error as occured');
		} else {
			console.log(books);
			res.json(books);
		}
	});
});

app.get('/books/:id', function(req,res){
	console.log("getting one book");
	Book.findOne({
		_id:req.params.id
	})
	.exec(function(err,books){
		if(err){
		  res.send('error as occured');
		} else {
			console.log(books);
			res.json(books);
		}
	});
});

app.post('/book', function(req,res){
	var newBook = new Book();
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;
	newBook.save(function (err,book){
		if (err){
			res.send('error has occured');
		} else {
			console.log(newBook);
			res.send(newBook);
		}
	});

});


app.post('/book2', function(req,res){
	Book.create(req.body,function (err,book){
		if (err){
			res.send('error saving book');
		} else {
		 	console.log(book);
			res.send(book);
		}
	});
});

app.put('/book/:id', function (req,res){
	Book.findOneAndUpdate(
		{ _id:req.params.id},
		{$set:
			{
			 title:req.body.title,
			 author:req.body.author,
			 category:req.body.category
			}},
			{upsert:true},
			function(err,newBook){
				if (err){
					res.send('error in update');
				} else {
					console.log(newBook);
					res.send("book updated");
				}
			});

});


app.delete('/book/:id', function(req,res){
	Book.findOneAndRemove({
		_id:req.params.id
	}, function(err,book){
		if(err){
		  res.send('error as occured');
		} else {
			console.log(req.params.id + "book deleted");
			res.send(req.params.id + "book deleted");
		}
	});
});

var port = 8080;
app.listen(port, function () {
    console.log("app listening on port " + port);
});
