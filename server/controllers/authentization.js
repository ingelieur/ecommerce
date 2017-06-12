const jwt = require('jsonwebtoken')

var customer = ((req,res,next,id) => {
  var token = req.headers.token
  if (token) {
    console.log(token)
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded) {
    console.log(decoded)
        if(req.path !== '/') {
          if(decoded.id === req.params.id) {
            next()
          }
          else {
            res.send({err: 'You are not authorized'})
          }
        }
        else {
          next()
        }
      }
      else {
        res.send({err: 'You are not signed in'})
      }
    })
  }
  else {
    res.send({err: 'You are not signed in'})
  }
})

//var seller = ((req,res,next,id) => {
//  var token = req.headers.token
//  if (token) {
//    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
//      if(decoded) {
//        if(req.path !== '/') {
//          if(decoded.id === req.params.id && decoded.role === 'seller') {
//            next()
//          }
//          else {
//            res.send({err: 'You are not authorized'})
//          }
//        }
//        else {
//          next()
//        }
//      }
//      else {
//        res.send({err: 'You are not signed in'})
//      }
//    })
//  }
//  else {
//    res.send({err: 'You are not signed in'})
//  }
//})

var admin = ((req,res,next) => {
  var token = req.headers.token
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded) {
        if(decoded.role === 'admin') {
          next()
        }
        else {
          res.send({err: 'You are not authorized'})
        }
      }
      else {
        res.send({err: 'You are not authorized'})
      }
    })
  }
  else {
    res.send({err: 'You are not authorized'})
  }
})


module.exports = {
  customer,
  //seller,
  admin
}
