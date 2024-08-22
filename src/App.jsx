import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Update from './Update'

function App() {

  const [data, setData] = useState([])
  const [values, setValues] = useState({
    name: '',
    year: ''
  })

  const [currentId, setCurrentId] = useState(null);

  const handleEdit = (id) => {
    setCurrentId(id);
    toggleModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8080/todos', values)
      .then(location.reload())
      .catch(err => console.log(err))
  }

  useEffect(() => {

    axios.get('http://localhost:8080/todos')
      .then(res => setData(res.data))
      .catch(err => console.log(err))

  }, [])

  let counter = 1

  let year_of_birth = new Date().getFullYear()

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Хотите удалить?");

    if (confirm) {
      axios.delete('http://localhost:8080/todos/' + id)
        .then(location.reload())
        .catch(err => console.log(err))
    }
  }

  return (
    <>

      {modal && (
        <div className='modal'>

          <div className='overlay' onClick={toggleModal}></div>

          <div className='modal_content'>

            <Update id={currentId} />

            <span onClick={toggleModal}>&times;</span>

          </div>

        </div>
      )}

      <div className='container'>

        <h1 className='h1_text'>Добавление, Изменение и Удаление Элемента из Таблицы</h1>

        <form action="" className='form_todo' onSubmit={handleSubmit}>

          <div className='form_blc'>

            <label htmlFor="name">Имя</label>

            <input type="text" id='name' name='name' placeholder='Bruce Reyes'
              onChange={e => setValues({ ...values, name: e.target.value })} required />

          </div>

          <div className='form_blc'>

            <label htmlFor="age">Возраст</label>

            <input type="number" id='age' name='age' placeholder='24'
              onChange={e => setValues({ ...values, year: e.target.value })} required />

          </div>

          <div className='btn_add'>

            <button>Показать</button>

          </div>

        </form>

        <table className='content_table'>

          <thead>

            <tr>

              <th>No</th>
              <th>Имя студента</th>
              <th>Год рождения</th>
              <th>Дейтсвия</th>

            </tr>

          </thead>

          <tbody>

            {
              data.map((item, idx) => (
                <tr key={idx}>

                  <td>{counter++}</td>
                  <td>{item.name}</td>
                  <td>{year_of_birth - item.year}</td>
                  <td>

                    <img src="https://cdn3.iconfinder.com/data/icons/ui-element-4/24/UI-14-25.png" alt="change" onClick={() => handleEdit(item.id)} />

                    <img src="https://cdn0.iconfinder.com/data/icons/pinpoint-action/48/delete-25.png" alt="delete" onClick={e => handleDelete(item.id)} />

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>
    </>
  )
}

export default App
