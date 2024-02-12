const express=require("express")
const app=express()
const bodyParser=require("body-parser");
const https = require("https");
const NewsAPI=require('newsapi');
const newsapi=new NewsAPI('4e6e9b65e3d7458a97b0cff91017662f');

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
  
  newsapi.articles({
    source: 'CNN' // required
    // sortBy: 'top' // optional
  }).then(articlesResponse => {
    console.log(articlesResponse);
    let news=articlesResponse;
    // console.log(news.articles);
    res.set("Content-Type", "text/html");

    for(let i=0;i<news.articles.length;i++){

      
      let author=news.articles[i].author;
      let title=news.articles[i].title;
      let imgsrc=news.articles[i].urlToImage;
      let articlesrc=news.articles[i].url;
      let desc=news.articles[i].description;

      res.write("<h3 class='title'> Title </h3>- "+title);
      res.write("<h4 class='author'> Author </h4>- "+author);
      res.write("<h3 class='desc'> Description </h3>- "+desc);
      res.write("<br><a /href='"+articlesrc+"' >Press to Main Link </a>");
      res.write("<img src='"+imgsrc+"' width=500px height=300px >");
      res.write("<hr>");
    }

    res.send();
  });
  
});


app.listen(3000,function(req,res){
    console.log("Server Started");
});