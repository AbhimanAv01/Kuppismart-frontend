import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../CSS/expense.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    item_id: '',
    amount: '',
    itemName: '',     
    expenseDate: '',  
    category: ''      
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/expenses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setExpenses(response.data.data || []); 
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setExpenses([]); 
    }
  };

  const handleAddExpense = async (formData) => {
    try {
      await axios.post('http://localhost:3000/api/Createexpenses', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      fetchExpenses(); // Refresh expenses list
      setFormData({
        item_id: '',
        amount: '',
        itemName: '',     
        expenseDate: '',  
        category: ''      
      });
      setShowForm(false); // Hide the form
      toast.success("Expense added successfully!"); // Success toast for adding expense
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error("Failed to add expense!"); // Error toast for adding expense
    }
  };

  const handleUpdateExpense = async (expense) => {
    try {
      await axios.put(`http://localhost:3000/api/updateexpenses/${expense.item_id}`, expense, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      fetchExpenses(); // Refresh expenses list
      setEditingExpense(null); // Clear editing state
      setFormData({
        item_id: '',
        amount: '',
        itemName: '',     
        expenseDate: '',  
        category: ''      
      });
      setShowForm(false); // Hide the form
      toast.success("Expense updated successfully!"); // Success toast for updating expense
    } catch (error) {
      console.error('Error updating expense:', error);
      toast.error("Failed to update expense!"); // Error toast for updating expense
    }
  };

  const handleDeleteExpense = async (item_id) => {    
    try {
      await axios.delete(`http://localhost:3000/api/deleteexpenses/${item_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      fetchExpenses(); // Refresh expenses list
      toast.success("Expense deleted successfully!"); // Success toast for deleting expense
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error("Failed to delete expense!"); // Error toast for deleting expense
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      handleUpdateExpense(formData);
    } else {
      handleAddExpense(formData);
    }
  };

  const handleCancel = () => {
    setFormData({
      item_id: '',
      amount: '',
      itemName: '',     
      expenseDate: '',  
      category: ''      
    });
    setEditingExpense(null); 
    setShowForm(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove JWT token from localStorage
    toast.success("Logged out successfully!"); // Success toast for logout
    navigate('/'); // Redirect to login page
  };

  return (
    <div>
      <ToastContainer /> {/* Add toast container */}
      <div className='addexpenses'>
        <h1>Expense Tracker</h1>
        <button onClick={handleLogout} className='deletebtn'>Logout</button> {/* Add logout button */}
        {!showForm && (
          <button onClick={() => setShowForm(true)}>Add Expense</button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="item_id"
              value={formData.item_id}
              onChange={handleChange}
              placeholder="ID"
              disabled={!!editingExpense}
            />
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Item Name"
              required
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
            />
            <input
              type="date"
              name="expenseDate"
              value={formData.expenseDate}
              onChange={handleChange}
              placeholder="Expense Date"
              required
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
            <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        )}

        {expenses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ItemId</th>
                <th>ItemName</th>
                <th>Amount</th>
                <th>ExpenseDate</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.item_id}>
                  <td>{expense.item_id}</td>
                  <td>{expense.itemName}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.expenseDate}</td> {/* Ensure correct field name */}
                  <td>{expense.category}</td>
                  <td>
                    <button onClick={() => { setFormData(expense); setEditingExpense(expense); setShowForm(true); }}>Edit</button>
                    <button onClick={() => handleDeleteExpense(expense.item_id)} className='deletebtn'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No expenses available</p>
        )}
      </div>
    </div>
  );
};

export default Expenses;
