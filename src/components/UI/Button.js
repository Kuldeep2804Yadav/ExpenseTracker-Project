import React from 'react'

const Button = (props) => {
  return (
    <button type={`${props.type} button`} className={`${props.className} h-max px-2 py-1 rounded-lg`} onClick={props.onClick}>{props.title}</button>
  )
}

export default Button