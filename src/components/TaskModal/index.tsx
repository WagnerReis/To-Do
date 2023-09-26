import React from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import styles from './styles.module.scss'

export function TaskModal({ isOpen, onClose }: any) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
            <h2>Create new Task</h2>
            <IoMdClose
              size={24}
              className={styles.close}
              onClick={onClose}
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
    </Modal>
  );
}
