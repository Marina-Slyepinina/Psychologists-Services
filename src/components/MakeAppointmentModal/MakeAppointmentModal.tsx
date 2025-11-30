import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { appointmentSchema } from "../../schema/schema";
import type { Psychologist } from "../../firebase/dataApi";
import { Modal } from "../Modal/Modal"
import { Button } from "../Button/Button";
import css from "./makeAppointmentModal.module.css";

interface MakeAppointmentModalProps {
    onClose: () => void;
    psychologist: Psychologist;
}

type FormData = yup.InferType<typeof appointmentSchema>;

const meetingTimes = [
    "09 : 00", "09 : 30", "10 : 00", "10 : 30", "11 : 00", "11 : 30",
    "12 : 00", "12 : 30", "13 : 00", "13 : 30", "14 : 00", "14 : 30",
    "15 : 00", "15 : 30", "16 : 00", "16 : 30", "17 : 00", "17 : 30"
];

export const MakeAppointmentModal = ({ onClose, psychologist }: MakeAppointmentModalProps) => {

    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(appointmentSchema),
        defaultValues: {
            phone: "+380",
        }
    });

    const selectedTime = watch("time");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(`.${css.timeWrapper}`)) {
                setIsTimeDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Appointment Data:", data);
        console.log("Psychologist ID:", psychologist.id);
        onClose();
    };

    const handleTimeSelect = (time: string) => {
        setValue("time", time, { shouldValidate: true });
        setIsTimeDropdownOpen(false);
    };

  return (
    <Modal
        title="Make an appointment with a psychologists"
        mainText="You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy."
        onClose={onClose}
    >   

        <div className={css.psychologistBlock}>
            <div className={css.avatarWrapper}>
                  <img src={psychologist.avatar_url} className={css.avatarImg} alt={psychologist.name} />
            </div>
            <div className={css.psychologistInfo}>
                <span className={css.specialization}>Your psychologists</span>
                {psychologist.name}
            </div>
        </div>
        
          
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <div className={css.inputWrapper}>
                <input
                    {...register("name")}
                    type="text"
                    placeholder="Name"
                    className={`${css.input} ${errors.name ? css.errorInput : ""}`}
                />
                {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
            </div>

            <div className={css.row}>
                <div className={css.inputWrapper}>
                    <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+380"
                        className={`${css.input} ${errors.phone ? css.errorInput : ""}`}
                    />
                    {errors.phone && <p className={css.errorText}>{errors.phone.message}</p>}
                  </div>
                  
                <div className={`${css.inputWrapper} ${css.timeWrapper}`}>
                    <div
                        className={`${css.input} ${css.timeInput} ${errors.time ? css.errorInput : ""}`}
                        onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    >
                        {selectedTime || "00:00"}
                        <svg width={20} height={20} className={css.clockIcon}>
                            <use href="sprite.svg#clock" /> 
                        </svg>
                    </div>

                    <input type="hidden" {...register("time")} />

                    {isTimeDropdownOpen && (
                        <div className={css.timeDropdown}>
                            <p className={css.timeDropdownTitle}>Meeting time</p>
                            <ul className={css.timeList}>
                                {meetingTimes.map((time) => (
                                    <li
                                        key={time}
                                        className={`${css.timeItem} ${selectedTime === time ? css.activeTime : ""}`}
                                        onClick={() => handleTimeSelect(time)}
                                    >
                                        {time}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {errors.time && <p className={css.errorText}>{errors.time.message}</p>}
                </div>
            </div>

            <div className={css.inputWrapper}>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={`${css.input} ${errors.email ? css.errorInput : ""}`}
                />
                {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
            </div>

            <div className={css.inputWrapper}>
                <textarea
                    {...register("comment")}
                    placeholder="Comment"
                    className={`${css.input} ${css.textarea}`}
                />
            </div>

            <Button type="submit" variant="filled" className={css.submitBtn}>
                Send
            </Button>
        </form>
    </Modal>
  )
}
