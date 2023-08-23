import React, { Component } from 'react'
import "./ExpenseList.css";
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
  return (
    <>
      <ul className='list'>
        {expenses.map(expense => {
          return <ExpenseItem
            key={expense.id}
            expense={expense}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        })}
      </ul>
      {expenses.length > 0 &&
        <button
          onClick={clearItems}
          className='btn'>
          목록 지우기
        </button>
      }
    </>
  )
}

export default ExpenseList;
