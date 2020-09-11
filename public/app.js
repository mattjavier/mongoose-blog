axios.get('/api/users/pizzas', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('user')}`
  }
})
  .then(({ data: user }) => {
    document.getElementById('user').textContent = `by ${user.name}`
    user.pizzas.forEach(pizza => {

      let pizzaElem = document.createElement('li')
      pizzaElem.innerHTML = `
        <p>Pizza Name: ${pizza.name}</p>
        <p>Sauce: ${pizza.sauce}</p>
        <p>Toppings: ${pizza.topping_1}, ${pizza.topping_2}, ${pizza.extras}</p>
        <p>Comments: ${pizza.comments}</p>
        <p>Created by: ${user.name}
        <hr>
      `
      document.getElementById('pizzas').prepend(pizzaElem)
    })
  })
  .catch(err => {
    console.log(err)
    window.location = '/login'
  })


document.getElementById('submitPizza').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/pizzas', {
    name: document.getElementById('name').value,
    sauce: document.getElementById('sauce').value,
    topping_1: document.getElementById('topping1').value,
    topping_2: document.getElementById('topping2').value,
    extras: document.getElementById('extras').value,
    comments: document.getElementById('comments').value,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
    .then(({ data }) => {
      console.log(data)
      let pizzaElem = document.createElement('li')
      pizzaElem.innerHTML = `
        <p>Pizza Name: ${data.name}</p>
        <p>Sauce: ${data.sauce}</p>
        <p>Toppings: ${data.topping_1}, ${data.topping_2}, ${data.extras}</p>
        <p>Comments: ${data.comments}</p>
        <p>Created by: ${data.user.username}
        <hr>
      `
      document.getElementById('pizzas').prepend(pizzaElem)
    })
    .catch(err => console.log(err))
})