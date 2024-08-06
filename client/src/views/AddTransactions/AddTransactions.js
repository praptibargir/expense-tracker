import './AddTransactions.css'
import './../../global.css'
import toast, { Toaster } from 'react-hot-toast'
import { useState,useEffect } from 'react'
import axios from 'axios'

function AddTransactions() {
    
    const[user,setUser]=useState('')
    const[title,setTitle]=useState('')
    const[amount,setAmount]=useState(0)
    const[category,setCategory]=useState('others')
    const[type,setType]=useState('credit')



    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
        if (currentUser) {
          setUser(currentUser)
        }
    
        if (!currentUser) {
          window.location.href = '/login'
        }
    
    }, [])

    const addTransaction=async ()=>{
        const response=await axios.post(`${process.env.REACT_APP_Backend_URL}/transaction`,{
            title,
            amount,
            type,
            category,
            user:user._id
        })

        toast.success(response.data.message)

        setAmount(0)
        setCategory('others')
        setTitle('')
        setType('credit')

        setTimeout(()=>{
            window.location.href='/'
        },2000)
    }
    

    return (
        <div className='container'>
            <h1 className='title'>Add Transactions for {user.fullName}</h1>

            <form className='form-container'>

                <input
                    type='text'
                    placeholder='Enter Title'
                    className='user-input'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />

                <input
                    type='number'
                    placeholder='Enter Amount'
                    className='user-input'
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                />

                <select 
                className='user-input' 
                value={type}
                onChange={(e)=>setType(e.target.value)}>
                    <option value="credit">Income</option>
                    <option value="debit">Expense</option>
                </select>

                <select 
                className='user-input'
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                >
                    <option value="food">Food</option>
                    <option value="rent">Rent</option>
                    <option value="salary">Salary</option>
                    <option value="gift">Gift</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                    <option value="loan">Loan</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="clothing">Clothing</option>
                    <option value="learning">Learning</option>
                    <option value="others">Others</option>
                </select>

                <button
                    type='button'
                    className='btn'
                    onClick={addTransaction}>
                    Add Transaction
                </button>
            </form>

            <Toaster />
        </div>
    )
}

export default AddTransactions