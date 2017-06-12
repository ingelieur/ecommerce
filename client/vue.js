var app = new Vue({
  el: '#app',
  data: {
    books: [],
    cart: localStorage.getItem('cart') || [],
    token: localStorage.getItem('token') || '',
    customer: {},
    register: true
  },
  created: function () {
    this.showBooks()
    this.cart = JSON.parse(this.cart)
  },
  methods: {
    decode: function() {
      axios.post('http://localhost:3000/decode', {
        token: localStorage.getItem('token')
      })
        .then ((response) => {
          localStorage.setItem('user', JSON.stringify(response.data))
        })
    },
    signin: function(customer) {
      var self = this
      axios.post('http://localhost:3000/signin', {
        username: customer.username,
        password: customer.password
      })
        .then ((response) => {
          if(response.data.token) {
            localStorage.setItem('token', response.data.token)
            self.token = response.data.token
          }
        })
    },
    changeToSignIn: function() {
      this.register = false
    },
    changeToRegister: function () {
      this.register = true
    },
    register: function(customer) {
      axios.post('http://localhost:3000/signup', {
        name: customer.name,
        username: customer.username,
        password: customer.password,
        email: customer.email
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signout: function() {
      this.token = ''
      localStorage.clear()
    },
    payment: function() {
      let books = []
      let cart = this.cart
      this.decode()
      let user = JSON.parse(localStorage.getItem('user'))
      let customer = user.id
      for (let i=0; i<cart.length ; i++) {
        books.push(cart[i]._id)
      }
      console.log('books=-',books)
      let total = 0
      for (let i=0; i<cart.length; i++) {
        total += cart[i].price * cart[i].count
      }
      axios.post('http://localhost:3000/api/transactions/checkout', {
        customer: customer,
        books: books,
        total: total
      })
        .then((response) => {
          console.log('response ', response)
        })
      localStorage.removeItem(cart)
      window.location.href="/#"
    },
    showBooks: function() {
      let self = this
      axios.get('http://localhost:3000/api/books')
        .then ((response) => {
          self.books = response.data
        })
    },
    searchCat: function(event) {
      let self = this
      let category = event.target.text
      axios.get(`http://localhost:3000/api/books/cat/${category}`)
        .then ((response) => {
          self.books = response.data
        })
    },
    searchTitle: function(event) {
      let self = this
      let query = $('#schTitle').val()
      axios.post('http://localhost:3000/api/books/search', {
        search: query
      })
        .then ((response) => {
          self.books = response.data
        })
    },
    addToCart: function (book) {
      let cart = this.cart
      //app.books[app.books.indexOf(app.books.find(item => item.title === book.title))].stock -= 1
      let doubleBuy = cart.find(item => item.title === book.title)
      let index = cart.indexOf(doubleBuy)
      if (cart.includes(doubleBuy)) {
        cart[index].count += 1
      }
      else {
        cart.push(book)
        cart[cart.length-1].count = 1
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      app.cart = JSON.parse(localStorage.getItem('cart'))
    }
  },
  computed: {
    calculateTotal: function() {
      let cart = this.cart
      let total = 0
      for (let i=0; i<cart.length; i++) {
        total += cart[i].price * cart[i].count
      }
      return total
    }
  }

})
