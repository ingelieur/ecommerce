const Customer = require(`../models/customer`)
const bcrypt = require(`bcrypt`)
const saltRounds = 10
const jwt = require(`jsonwebtoken`)

var createCust = ((req,res) => {
  if(req.body.password.length !== 0) {
    if(req.body.password.length < 8) {
      res.send({errors: {password: {message: `Password length should not be less than 8 characters`}}})
    }
    else {
      let newCustomer = new Customer ({
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        email: req.body.email,
        role: 'customer'
      })
      newCustomer.save((err, createdCustomer) => {
        res.send(err ? err : createdCustomer)
      })
    }
  }
  else {
    res.send({errors: {password: {message: `Password should not be empty`}}})
  }
})

//var createSell = ((req,res) => {
//  if(req.body.password.length !== 0) {
//    if(req.body.password.length < 8) {
//      res.send({errors: {password: {message: `Password length should not be less than 8 characters`}}})
//    }
//    else {
//      let newCustomer = new Customer ({
//        name: req.body.name,
//        username: req.body.username,
//        password: bcrypt.hashSync(req.body.password, saltRounds),
//        email: req.body.email,
//        role: 'seller'
//      })
//      newCustomer.save((err, createdCustomer) => {
//        res.send(err ? err : createdCustomer)
//      })
//    }
//  }
//  else {
//    res.send({errors: {password: {message: `Password should not be empty`}}})
//  }
//})

var createAdmin = ((req,res) => {
  if(req.body.password.length !== 0) {
    if(req.body.password.length < 8) {
      res.send({errors: {password: {message: `Password length should not be less than 8 characters`}}})
    }
    else {
      let newCustomer = new Customer ({
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        email: req.body.email,
        role: req.body.role
      })
      newCustomer.save((err, createdCustomer) => {
        res.send(err ? err : createdCustomer)
      })
    }
  }
  else {
    res.send({errors: {password: {message: `Password should not be empty`}}})
  }
})

var showAll = ((req,res) => {
  Customer.find((err, customers) => {
    res.send(err ? err : customers)
  })
})

var showOne = ((req,res) => {
  Customer.findById(req.params.id, (err, customer) => {
    res.send(err ? err : customer)
  })
})

var update = ((req,res) => {
  Customer.findById(req.params.id, (err, customer) => {
    if(err) res.send(err)
    else {
      customer.name = req.body.name || customer.name
      customer.username = req.body.username || customer.username
      if(req.body.password) {
        if(req.body.password.length < 8) {
          res.send({errors: {password: {message: `Password length should not be less than 8 characters`}}})
        }
        else {
          customer.password = bcrypt.hashSync(req.body.password,saltRounds)
          customer.save((err, updatedCustomer) => {
            res.send(err ? err : updatedCustomer)
          })
        }
      }
      else {
        customer.password = customer.password
        customer.save((err, updatedCustomer) => {
          res.send(err ? err : updatedCustomer)
        })
      }
    }
  })
})

var destroy = ((req,res) => {
  Customer.findByIdAndRemove(req.params.id, (err, customer) => {
    res.send(err ? err : customer)
  })
})

var signin = ((req, res) => {
  Customer.findOne({username: req.body.username}, (err, customer) => {
    if(err) res.send(err)
    else {
      if(customer) {
        bcrypt.compare(req.body.password, customer.password, (err,result) => {
          if(err) res.send(err)
          else {
            if(result) {
              let token = jwt.sign({id: customer.id, name: customer.name, username: customer.username, role: customer.role}, process.env.SECRET_KEY)
              res.send({token:token})
            }
            else {
              res.send({err: 'Username/password is wrong'})
            }
          }
        })
      }
      else {
        res.send({err: 'Username/password is wrong'})
      }
    }
  })
})

module.exports = {
  createCust,
  //createSell,
  createAdmin,
  showAll,
  showOne,
  update,
  destroy,
  signin
}
