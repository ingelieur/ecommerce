var app = new Vue({
  el: '#app',
  data: {
    books: [],
    //cart: [],
    cart: localStorage.getItem('cart') || [],
    //token: localStorage.getItem('token') || ''
    token: localStorage.getItem('token') || ''
  },
  created: function () {
    this.showBooks()
    this.cart = JSON.parse(this.cart)
  },
  methods: {
    signin: function() {

    },
    signout: function() {
      this.token = ''
      localStorage.clear()
    },
    payment: function() {
      localStorage.clear()
      window.location.href="/#"
    },
    getCart: function() {
      this.checkout = JSON.parse(localStorage.getItem('cart'))
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
        console.log(cart[i].price)
        total += cart[i].price * cart[i].count
      }
      console.log(total)
      return total
    }
  }

})
