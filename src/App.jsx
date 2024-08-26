import axios from 'axios'
import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Update from './Update'

const initialState = {
  data: [],
  values: {
    name: '',
    year: ''
  },
  currentId: null,
  modal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_VALUES':
      return { ...state, values: action.payload };
    case 'SET_CURRENT_ID':
      return { ...state, currentId: action.payload };
    case 'TOGGLE_MODAL':
      return { ...state, modal: !state.modal };
    default:
      return state;
  }
};

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEdit = (id) => {
    dispatch({ type: 'SET_CURRENT_ID', payload: id });
    toggleModal();
  };

  // const [data, setData] = useState([])
  // const [values, setValues] = useState({
  //   name: '',
  //   year: ''
  // })

  // const [currentId, setCurrentId] = useState(null);

  // const handleEdit = (id) => {
  //   setCurrentId(id);
  //   toggleModal();
  // };

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8080/todos', state.values)
      .then(location.reload())
      .catch(err => console.log(err))
  }

  useEffect(() => {

    axios.get('http://localhost:8080/todos')
      .then(res => dispatch({ type: 'SET_DATA', payload: res.data }))
      .catch(err => console.log(err))

  }, [])

  let counter = 1

  let year_of_birth = new Date().getFullYear()

  // const [modal, setModal] = useState(false)

  const toggleModal = () => {
    dispatch({ type: 'TOGGLE_MODAL' });
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

      {state.modal && (
        <div className='modal'>

          <div className='overlay' onClick={toggleModal}></div>

          <div className='modal_content'>

            <Update id={state.currentId} />

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
              onChange={e => dispatch({ type: 'SET_VALUES', payload: { ...state.values, name: e.target.value } })} required />

          </div>

          <div className='form_blc'>

            <label htmlFor="age">Возраст</label>

            <input type="number" id='age' name='age' placeholder='24'
              onChange={(e => dispatch({ type: 'SET_VALUES', payload: { ...state.values, year: e.target.value } }))} required />

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
              state.data.map((item, idx) => (
                <tr key={idx}>

                  <td>{counter++}</td>
                  <td>{item.name}</td>
                  <td>{year_of_birth - item.year}</td>
                  <td>

                    <img src="https://cdn3.iconfinder.com/data/icons/ui-element-4/24/UI-14-25.png" alt="change" onClick={() => handleEdit(item.id)} />

                    <img src="https://cdn0.iconfinder.com/data/icons/pinpoint-action/48/delete-25.png" alt="delete" onClick={() => handleDelete(item.id)} />

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
