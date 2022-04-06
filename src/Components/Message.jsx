import React from 'react'

export const Message = ({msg,bgColor}) => {
  
  let styles = {
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: bgColor,
    color:"#fff",
    fontWeight: 'bold',
    borderRadius: '50px',
    textAlign: 'center',
  }
  
  
    return (
    <div style={styles}>
       <p>{msg}</p> 
    </div>
  )
}
