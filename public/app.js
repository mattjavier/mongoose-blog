axios.get('/api/pizzas')
  .then(({ data }) => {
    data.forEach(pizza => {
      let pizzaElem = document.createElement('li')
          pizzaElem.innerHTML = `
            <p>Pizza Name: ${pizza.name}</p>
            <p>Sauce: ${pizza.sauce}</p>
            <p>Toppings: ${pizza.topping_1}, ${pizza.topping_2}, ${pizza.extras}</p>
            <p>Comments: ${pizza.comments}</p>
            <p>Created by: ${pizza.user.username}
            <hr>
          `
          document.getElementById('pizzas').prepend(pizzaElem)
    })
  })
  .catch(err => console.log(err))
document.getElementById('submitPizza').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/users/', {
    name: document.getElementById('user-Name').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value
  })
    .then(({ data }) => {
      let userId = data._id

      axios.post('/api/pizzas', {
        name: document.getElementById('name').value,
        sauce: document.getElementById('sauce').value,
        topping_1: document.getElementById('topping1').value,
        topping_2: document.getElementById('topping2').value,
        extras: document.getElementById('extras').value,
        comments: document.getElementById('comments').value,
        user: userId
      })
        .then(({ data }) => {
          console.log(data)
          let pizzaElem = document.createElement('li')
          pizzaElem.innerHTML = `
            <p>Pizza Name: ${data.name}</p>
            <p>Sauce: ${data.sauce}</p>
            <p>Toppings: ${data.topping_1}, ${data.topping_2}, ${data.extras}</p>
            <p>Comments: ${data.comments}</p>
            <p>Created by: ${document.getElementById('username').value}
            <hr>
          `
          document.getElementById('pizzas').prepend(pizzaElem)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})