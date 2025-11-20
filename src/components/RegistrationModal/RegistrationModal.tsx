import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal } from "../Modal/Modal"
import { Button } from "../Button/Button";
import { registerSchema } from "../../schema/schema";
import { registerUser } from "../../firebase/authApi";
import css from "./RegistrationModal.module.css";

interface RegisterInterface {
  name: string,
  email: string,
  password: string
} 

export const RegistrationModal = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  
  const handleClose = () => {
    navigate(backgroundLocation?.pathname || '/', { replace: true });
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterInterface>({
    resolver: yupResolver(registerSchema)
  });

  const submitForm = async (data: RegisterInterface) => {
    try {
      setFirebaseError(null);
      const user = await registerUser(data.name, data.email, data.password);
      if (user) {
        reset();
        handleClose(); 
  
        navigate("/psychologists");
      }
    } catch (error) {
      setFirebaseError((error as Error).message);
    }
  };

  return (
      <Modal 
        onClose={handleClose} 
        title="Registration" 
        mainText="Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.">
          
      <form onSubmit={handleSubmit(submitForm)} className={css.form}>
            <div className={css.formContent}>
              <div className={css.inputWrapper}>
                <input className={css.input} type="text" {...register("name")} placeholder="Name" />
                <p className={css.error}>{errors.name?.message ? `* ${errors.name?.message}`: ""}</p>
              </div>
              <div className={css.inputWrapper}>
                <input className={css.input} type="email" {...register("email")} placeholder="Email" />
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
            
            {firebaseError && <p className={css.firebaseError}>{firebaseError}</p>}
            
            <Button type="submit" variant="filled" isFullWidth={true}>Sign Up</Button>
            
          </form>
          
      </Modal>
  )
}