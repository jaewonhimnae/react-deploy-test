import './App.css';
import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Test from './Test';
import Alert from './components/Alert';

const App = () => {

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 2000 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식비', amount: 1200 },
  ]);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  const [alert, setAlert] = useState({ show: false, type: '', text: '' });

  const clearItems = () => {
    setExpenses([]);
  }


  const handleEdit = (id) => {

    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);

  }

  // charge === 식비     state   ===> update ====> setCharge
  // setState() setExpenses()

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false, type: '', text: '' });
    }, 5000);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (charge !== "" && amount > 0) {

      if (edit) {

        const newExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge: charge, amount: amount } : item
        })

        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });

      } else {
        //  expenses state에  새로운 객체 만들어서 추가해주기, state update 
        //  state update 할 때는 항상 불변성을 지켜줘야 합니다. 
        //  불변성을 지킨다는 말은 이전에 있던 값을 건드리지 X, 새로운 값을 만들어서 교체

        // 새로운 객체 생성 
        const newExpense = { id: crypto.randomUUID(), charge, amount }

        const newExpenses = [...expenses, newExpense];

        setExpenses(newExpenses);
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }

      setCharge("");
      setAmount(0);

    } else {
      console.log('먼저 입력해주세요.');
      handleAlert({ type: "danger", text: "charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다." });
    }

  }

  const handleCharge = (event) => {
    console.log(event.target.value);
    setCharge(event.target.value)
  }

  const handleAmount = (event) => {
    // console.log(event.target.valueAsNumber);
    // console.log( typeof event.target.valueAsNumber);
    // Number(event.target.value);
    setAmount(event.target.valueAsNumber);
  }

  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    // console.log('clicked');   
    // console.log(newExpenses);
    // [
    //   { id: 2, charge: '교통비', amount: 400 },
    //   { id: 3, charge: '식비', amount: 1200 },
    // ]
    // state 변경을 위해서는 setState 함수를 이용!!! 
    setExpenses(newExpenses)
    // this.setState({
    //   expenses: newExpenses
    // })
  }
  return (
    <main className='main-container'>

      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}

      <h1>예산 계산기</h1>

      {/* <Test /> */}

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        {/* Expense Form */}
        <ExpenseForm
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        {/* Expense List */}
        <ExpenseList
          handleEdit={handleEdit}
          expenses={expenses}
          handleDelete={handleDelete}
          clearItems={clearItems}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount)
            }, 0)}   원
          </span>
        </p>
      </div>

    </main>
  )

}

export default App;