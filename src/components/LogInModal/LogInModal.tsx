import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../Modal/Modal"
import { Button } from "../Button/Button";
import { loginSchema } from "../../schema/schema";
import css from "./LogInModal.module.css";

interface LoginInterface {
  email: string,
  password: string
} 

export const LogInModal = () => {

  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  
  const handleClose = () => {
      navigate(backgroundLocation?.pathname || '/', { replace: true });
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginInterface>({
    resolver: yupResolver(loginSchema)
  });

  const submitForm = (data: LoginInterface) => {
    reset();
    console.log(data);
    handleClose();
  };

  return (
      <Modal 
        onClose={handleClose} 
        title="Log In" 
        mainText="Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.">
                
          <form onSubmit={handleSubmit(submitForm)} className={css.form}>
            <div className={css.formContent}>
              <div className={css.inputWrapper}>
                <input className={css.input} type="email" {...register("email")} placeholder="Email"/>
                <p className={css.error}>{errors.email?.message ? `* ${errors.email?.message}`: ""}</p>
              </div>
              <div className={css.inputWrapper}>
                <input className={css.input} type={isOpen ? "text" : "password"} {...register("password")} placeholder="Password"/>
                <p className={css.error}>{errors.password?.message ? `* ${errors.password?.message}`: ""}</p>
                { isOpen ? (
                  <svg className={css.icon} width={20} height={20} onClick={() => setIsOpen(!isOpen)}>
                    <use href="sprite.svg#closed-eye"></use>
                  </svg> ) : (
                  <svg className={css.icon} width={20} height={20} onClick={() => setIsOpen(!isOpen)}>
                    <use href="sprite.svg#opened-eye"></use>
                  </svg> )
                }
              </div>
            </div>
            
            <Button type="submit" variant="filled" isFullWidth={true}>Log In</Button>
          </form>
          
      </Modal>
  )
}