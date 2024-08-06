import React, { useEffect, useState } from 'react'
import "./Home.css"
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import TransactionCard from '../../components/TransactionCard/TransactionCard'
import addImg from './wallet.png'
import {Link} from 'react-router-dom'

function Home() {

  const [user, setUser] = useState('')

  const [transactions, setTransations] = useState([])

  const [netIncome, setNetIncome] = useState(0)

  const [netExpense, setNetExpense] = useState(0)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = '/login'
    }

  }, [])

  const loadTransactions = async () => {
    if (!user._id) {
      return
    }

    toast.loading('Loading Transactions..')

    const response = await axios.get(`${process.env.REACT_APP_Backend_URL}/transactions?userId=${user._id}`)

    const allTransations = response.data.data

    toast.dismiss()

    setTransations(allTransations)

  }

  useEffect(() => {
    loadTransactions()
  }, [user])

  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type == 'debit') {
        expense += transaction.amount
      } else {
        income += transaction.amount
      }
    })

    setNetExpense(expense)
    setNetIncome(income)

  }, [transactions])

  return (
    <div>
      <h1 className='home-greeting'>Hello {user.fullName},</h1>
      <h2 className='home-heading'>Welcome to Expense Tracker</h2>

      <span className='logout' onClick={() => {
        localStorage.clear()
        toast.success("Logged out Successfully")

        setTimeout(() => {
          window.location.href = "/login"
        }, 3000)

      }}>Logout</span>

      <div className='net-transaction-value'>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount green'>
            +{netIncome}
          </span>
          <span className='net-transaction-value-title'>
            Net Income
          </span>
        </div>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount red'>
            - {netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Expense
          </span>
        </div>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount blue'>
            {netIncome - netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Balance
          </span>
        </div>

      </div>


      <div className='transactions-display'>
        {
          transactions.map((transaction) => {
            const { _id, title, amount, category, type, createdAt } = transaction

            return <TransactionCard
              key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransactions={loadTransactions}
            />
          })
        }
      </div>

      <Link to="/addtransaction">
        <img src={addImg} className='add-img' />
      </Link>

      <Toaster />
    </div>
  )
}

export default Home