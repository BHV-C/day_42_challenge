const checkTimeMiddleware = (req, res, next) => {
      const now = new Date();
      console.log(now);
      const hours = now.getHours();
    
      if (hours <= 11 && hours < 18) {
        // Allow access to the server
        next();
      } else {
        res.status(403).send("Access Forbidden. Server accessible only between 11 AM and 16 PM.");
      }
    };
    
    module.exports = checkTimeMiddleware;