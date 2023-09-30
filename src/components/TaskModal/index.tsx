import React from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api, getConfig } from "@/api";
import { useCards } from "@/hooks/useCards";
import { CardProps, cardDefault } from "../Card";

type Inputs = {
  title: string;
  description: string;
  estimated: number;
  dueDate: Date;
  status: string;
};

export function TaskModal({ isOpen, onClose, cardId, type }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { cards, updateCards, updateCompleteCard } = useCards();
  const card = cards.find((c: CardProps) => c._id === cardId) ?? cardDefault
  console.log(card, cardId)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.status = "new";
    api.post("/cards", data, getConfig()).then((response) => {
      updateCards([...cards, response.data]);
      onClose();
      reset();
    });
  };

  const onEditSubmit: SubmitHandler<Inputs> = (data) => {
    const valueToUpdate: Omit<CardProps, "code"> = {
      _id: card._id,
      title: data.title,
      description: data.description,
      estimated: data.estimated,
      dueDate: data.dueDate,
      status: data.status,
    };
    updateCompleteCard(card._id, valueToUpdate);
    onClose();
    reset();
  };

  function handleCancel() {
    reset();
    onClose();
  }

  const typeButton = type === "create" ? "Create" : "Save";

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
        <form
          onSubmit={handleSubmit(type === "create" ? onSubmit : onEditSubmit)}
        >
          <div className={styles.formGroup}>
            <label className={styles.label} html-for="title">
              Title:
            </label>
            <input
              className={styles.inputText}
              type="text"
              id="title"
              defaultValue={card ? card.title : ""}
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
                  defaultValue={card ? card.description : ""}
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
                    defaultValue={card ? card.estimated : ""}
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
                    defaultValue={card ? String(card.dueDate) : ""}
                    {...register("dueDate")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
            <input className={styles.create} type="submit" value={typeButton} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
