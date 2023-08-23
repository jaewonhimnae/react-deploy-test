import React, { useState } from 'react'

const Test = () => {

    const [value, setValue] = useState('');
    const [listArray, setListArray] = useState(['haha', 'hoho']);;

    const handleSubmit = (e) => {
        e.preventDefault();
        setListArray(prevList => {
            return [value, ...prevList];
        })
        setValue('');
    }

    return (
        <div style={{ margin: 200}}>
            <form onSubmit={handleSubmit}>
                <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button>Add</button>

            </form>
            <ul>
                {listArray.map((item, index) => (
                    <div key={item}>
                        <li >{item}</li>
                        <input />
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Test