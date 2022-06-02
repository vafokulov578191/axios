let url = 'http://localhost:3001/users'
let data = []

let block_items = document.querySelector('.block_items')
let block_items_59 = document.querySelector('.block_items_59')
let block_items_res = document.querySelector('.block_items_res')

let form = document.forms.task

function react() {
  axios.get(url)
    .then(res => {
      if (res.status === 201 || res.status === 200) {
        data = res.data
        reload(data)
      }
    })
    .catch(err => console.log('err'))
}

react()

form.onsubmit = (e) => {
  e.preventDefault()

  let task = {
    id: Math.random()
  }
  let fm = new FormData(form)
  fm.forEach((value, key) => {
    task[key] = value
  })
  setPost(task)
  react(data)
}


function reload(arr) {
  block_items.innerHTML = ""
  block_items_59.innerHTML = ""
  block_items_res.innerHTML = ""
  for (let item of arr) {
    let box = document.createElement('div')
    let box_input = document.createElement('div')
    let span = document.createElement('span')
    let span_age = document.createElement('span')
    let input = document.createElement('input')


    span.innerHTML = item.name
    span_age.innerHTML = +item.age
    input.placeholder = "Age"
    input.disabled = true

    box.classList.add('box')
    span.classList.add('span_name')
    span_age.classList.add('span_age')
    input.classList.add('inp')
    box_input.classList.add('box_input')

    box.setAttribute('data-edite', item.id)

    let button = document.createElement('button')
    button.innerHTML = "edite"
    button.classList.add('button')



    span_age.onclick = () => {
      input.disabled = false
      button.style.display = "block"
    }

    button.onclick = (event) => {
      let id = event.target.getAttribute('data-edite')
      console.log(id);
      editItem(id)
    }


    if (item.age <= 25) {
      block_items.append(box)
    }

    if(item.age <= 50 && item.age > 25) {
      block_items_59.append(box)
    }

    if (item.age > 50) {
      block_items_res.append(box)
    }


    box.append(span, box_input)
    box_input.append(input, span_age, button)
  }
}


function editItem(id) {
  axios.patch(`${url}/${id}`), {
      age: input.value
    }
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        react()
      }
    })
    .catch(err => console.log('err'))
}



function setPost(post) {
  axios.post(url, post)
    .then(res => {
      if (res.status === 201 || res.status === 200) {
        react()
      }
    })
    .catch(err => console.log('err'))
}