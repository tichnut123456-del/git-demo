const { route } = require("../routes/booksRoute");

const myLogger = function (req,res,next){
    req.currentDate = new Date();
    console.log(`some one entered to the site: ${req.currentDate})`);
    next()
}

 function blockDay(day){
    return function(req,res,next)
    {
        if (new Date().getDay()=== day-1)
            return res.send(`the server is blocking`);

    }

 }
 const errorHandler= (error,req,res,next)=>{
    res.status(error.status || 500)
       .json({error: {message: error.message || 'server Error'} });
 }

 const pageNotFound = (req,res,next)=>{
   const error=new error('the page is not found');
   error.status=404;
   next(error);
   
 }
 
 module.exports={
    myLogger,
    blockDay,
    pageNotFound
 }
 