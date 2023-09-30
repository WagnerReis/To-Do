import React from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api, getConfig } from "@/api";

type Inputs = {
  title: string;
  description?: string;
  estimated?: number;
  dueDate?: string;
  status: string;
};

export function TaskModal({ isOpen, onClose, cards, setCards }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.status = "new";
    api.post("/cards", data, getConfig()).then((response) => {
      setCards([...cards, response.data]);
      onClose();
      reset();
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "900px",
          height: "630px",
          margin: "auto",
          borderRadius: "8px",
          padding: "20px",
        },
      }}
    >
      <div className={styles.modalContent}>
        <header className={styles.headerTask}>
          <h2>Create Task</h2>
          <IoMdClose size={24} className={styles.close} onClick={onClose} />
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.label} html-for="title">
              Title:
            </label>
            <input
              className={styles.inputText}
              type="text"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div>
            <div className={styles.formGroupTwo}>
              <div>
                <label className={styles.label} html-for="description">
                  Description:
                </label>
                <textarea
                  className={styles.textarea}
                  id="description"
                  {...register("description")}
                ></textarea>
              </div>

              <div className={styles.estimated}>
                <div className={styles.formGroupThree}>
                  <label className={styles.label} html-for="estimated">
                    Estimate:
                  </label>
                  <input
                    className={styles.inputNumber}
                    type="number"
                    id="estimated"
                    {...register("estimated", { min: 0, max: 99 })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} html-for="due-date">
                    Due Date:
                  </label>
                  <input
                    className={styles.inputDate}
                    type="date"
                    id="due-date"
                    {...register("dueDate")}
                  />
                </div>
              </div>
            </div>
          </div>
          <input className={styles.button} type="submit" value="Create" />
        </form>
      </div>
    </Modal>
  );
}
