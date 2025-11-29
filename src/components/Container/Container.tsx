import React from 'react'
import css from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode,
  className?: string,
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`${css.container} ${className}`}>{children}</div>
  )
}
