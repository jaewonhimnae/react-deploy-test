import React from 'react'
import './ExpenseForm.css';


const ExpenseForm = ({ handleCharge, edit, charge, amount, handleAmount, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlFor="charge">지출 항목</label>
                    <input
                        type='text'
                        className='form-control'
                        id="charge"
                        name="charge"
                        placeholder='예) 렌트비'
                        onChange={handleCharge}
                        value={charge}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="amount">비용</label>
                    <input
                        type='number'
                        className='form-control'
                        id="amount"
                        name="charge"
                        placeholder='예) 100'
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>
            </div>
            <button className='btn' type='submit'>
                {edit ? "수정" : "제출"}
            </button>
        </form>
    )
}

export default ExpenseForm;
