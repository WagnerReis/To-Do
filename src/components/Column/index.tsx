"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Card, CardProps } from "../Card";
import { useDrop } from "react-dnd";
import { TaskModal } from "../TaskModal";
import { IoMdClose } from "react-icons/io";

interface ColumnProps {
  title: string;
  color: string;
  status: string;
  cards: CardProps[];
  onCardDrop: any;
}

export function Column({
  title,
  status,
  color,
  cards,
  onCardDrop,
}: ColumnProps) {
  const [, ref] = useDrop({
    accept: "CARD",
    drop: (item: any) => {
      onCardDrop(item.id, status);
    },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [myCards, setMyCards] = useState<CardProps[]>(cards);
  // const [newTitle, setNewTitle] = useState("");
  // const [newDescription, setNewDescription] = useState("");
  // const [newEstimate, setNewEstimate] = useState("");
  // const [newDueDate, setNewDueDate] = useState("");

  const filteredCards = cards.filter((card) => card.status === status);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTitle(event.target.value);
  // };

  // const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setNewDescription(event.target.value);
  // };

  // const handleEstimate = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewEstimate(event.target.value);
  // };

  // const handleDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewDueDate(event.target.value);
  // };

  // const createCard = (event: any) => {
  //   event.preventDefault();

  //   const newCard: CardProps = {
  //     id: '12344',
  //     title: newTitle,
  //     // description: newDescription,
  //     estimate: +newEstimate,
  //     date: new Date(newDueDate),
  //     status
  //   }

  //   const newCards = [
  //     ...myCards,
  //     newCard
  //   ]

  //   setMyCards(newCards)
  //   closeModal()
  // };

  return (
    <main className={styles.container} ref={ref}>
      <header className={styles.header}>
        <div style={{ color }}>{title}</div>
        <div onClick={openModal} className={styles.plus}>
          +
        </div>
      </header>

      <TaskModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className={styles.modalContent}>
          <header className={styles.headerTask}>
            <h2>Create new Task</h2>
            <IoMdClose
              size={24}
              className={styles.close}
              onClick={closeModal}
            />
          </header>
          <form>
            <div className={styles.formGroup}>
              <label className={styles.label} html-for="title">
                Title:
              </label>
              <input
                className={styles.inputText}
                type="text"
                id="title"
                name="title"
                // onChange={handleTitle}
                required
              />
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
                    name="description"
                    // onChange={handleDescription}
                    required
                  ></textarea>
                </div>

                <div className={styles.estimate}>
                  <div className={styles.formGroupThree}>
                    <label className={styles.label} html-for="estimate">
                      Estimate:
                    </label>
                    <input
                      className={styles.inputNumber}
                      type="number"
                      id="estimate"
                      name="estimate"
                      // onChange={handleEstimate}
                      required
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
                      name="due-date"
                      // onChange={handleDueDate}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className={styles.formGroup}>
                    <label className={styles.label} html-for="comments">Comments:</label>
                    <textarea id="comments" name="comments" rows={2}></textarea>
                </div> */}
            <button
              className={styles.button}
              /*onClick={createCard}*/ type="submit"
            >
              Create task
            </button>
          </form>
        </div>
      </TaskModal>

      {filteredCards.map((card) => (
        <Card
          key={card._id}
          _id={card._id}
          title={card.title}
          status={card.status}
          code={card.code}
          estimate={card.estimate}
          dueDate={card.dueDate}
        />
      ))}
    </main>
  );
}
