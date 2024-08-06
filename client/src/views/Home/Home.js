import React, { useEffect, useState } from 'react'
import "./Home.css"
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
import TransactionCard from '../../components/TransactionCard/TransactionCard'

function Home() {

  const [user,setUser]=useState('')

  const [transactions,setTransations]=useState([])

  useEffect(()=>{
    const currentUser=JSON.parse(localStorage.getItem('currentUser'))

    if(currentUser){
      setUser(currentUser)
    }

    if(!currentUser){
      window.location.href='/login'
    }

  },[])

  const loadTransactions=async()=>{
    if(!user._id){
      return
    }

    toast.loading('Loading Transactions..')

    const response=await axios.get(`${process.env.REACT_APP_Backend_URL}/transactions?userId=${user._id}`)

    toast.dismiss()

    setTransations(response.data.data)

  }

  useEffect(()=>{
    loadTransactions()
  },[user])

  return (
    <div>
      <h1 className='home-greeting'>Hello {user.fullName},</h1>
      <h2 className='home-heading'>Welcome to Expense Tracker</h2>

      <span className='logout' onClick={()=>{
        localStorage.clear()
        toast.success("Logged out Successfully")

        setTimeout(()=>{
          window.location.href="/login"
        },3000)

      }}>Logout</span>

      <div className='net-transaction-value'>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            + totalcreditAmount
          </span>
          <span className='net-transaction-value-title'>
            Net Income
          </span>
        </div>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            + totalcreditAmount
          </span>
          <span className='net-transaction-value-title'>
            Net Expense
          </span>
        </div>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            + totalcreditAmount
          </span>
          <span className='net-transaction-value-title'>
            Net Balance
          </span>
        </div>

      </div>


      {
        transactions.map((transaction)=>{
          const {_id,title,amount,category,type,createdAt}=transaction
          return <TransactionCard
          key={_id}
          _id={_id}
          title={title}
          amount={amount}
          category={category}
          type={type}
          createdAt={createdAt}
          />
        })
      }

      <Toaster/>
    </div>
  )
}

export default Home