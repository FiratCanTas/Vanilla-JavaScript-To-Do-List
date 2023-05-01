const addButtonDOM = document.querySelector('#liveToastBtn')
const toDoList = document.querySelector('#list')
const toDoTaskInput = document.querySelector('#task')
const liveToasts = document.querySelectorAll('#liveToast')
const todoItems = document.querySelectorAll('li')

const successToast = new bootstrap.Toast(liveToasts[0])
const errorToast = new bootstrap.Toast(liveToasts[1])

let todos = []

const addToDoItem =()=>{
    if(toDoTaskInput.value.trim()){
        //Bilgilendirme mesajini goster
        successToast.show()

        //Local Storage kullan 
        todos.push(toDoTaskInput.value)
        localStorage.setItem('todos', JSON.stringify(todos))        

        //Yeni element olustur
        const newItem = document.createElement("li")
        newItem.innerHTML = `${toDoTaskInput.value} <span class="close" onclick='removeItem(event)'>x</span>`
        toDoList.prepend(newItem)

        //Input u temizle
        toDoTaskInput.value = ''

        newItem.addEventListener('click', completeTheTask)
    }
    else{
        errorToast.show()
    }
}

const completeTheTask = (e)=>{
    if (!e.target.classList.contains('checked')) {
        e.target.classList.add('checked')
    }
    else{
        e.target.classList.remove('checked')
    }
}

const removeItem = (e)=>{
    const listItem = e.target.parentElement
    toDoList.removeChild(listItem)

    //parent a yani li elementine ulastiktan sonra bu li icindeki ilk deger olan todo task imi aliyorum (ikinci deger " <span>x</span> ")
    const task = listItem.firstChild.textContent

    todos.splice(todos.indexOf(task), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

addButtonDOM.addEventListener('click', addToDoItem)

window.onload = () => {
    todos = JSON.parse(localStorage.getItem('todos'))
    if (todos) {
        todos.forEach(item => {
            const newItem = document.createElement('li')
            newItem.innerHTML = `${item} <span class="close" onclick='removeItem(event)'>x</span>`
            toDoList.appendChild(newItem)
            newItem.addEventListener('click', completeTheTask)
        })
    }
}
