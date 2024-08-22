import axios from "axios";
import React, { useEffect, useState } from "react";

function Update({ id }) {

    const [values, setValues] = useState({
        name: '',
        year: ''
    })

    useEffect(() => {

        axios.get('http://localhost:8080/todos/' + id)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()

        axios.put('http://localhost:8080/todos/' + id, values)
            .then(location.reload())
            .catch(err => console.log(err))
    }

    return (
        <>

            <div className="change_blc">

                <h1 className='h1_text'>Измените свою задачу</h1>

                <form action="" className='form_todo' onSubmit={handleUpdate}>

                    <div className='form_blc'>

                        <label htmlFor="name">Имя</label>

                        <input type="text" id='name' name='name' value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })} />

                    </div>

                    <div className='form_blc'>

                        <label htmlFor="age">Возраст</label>

                        <input type="number" id='age' name='age' value={values.year}
                            onChange={e => setValues({ ...values, year: e.target.value })} />

                    </div>

                    <div className='btn_add'>

                        <button>Изменить</button>

                    </div>

                </form>

            </div>

        </>
    )
}

export default Update;