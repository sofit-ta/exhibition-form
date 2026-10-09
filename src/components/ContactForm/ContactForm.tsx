"use client";
import { useState } from "react";
import type { SubmitEvent } from "react";
import OptionGroup from "../OptionGroup";
import MessageField from "../MessageField";
import { saveContact } from "@/lib/saveContact";
import optionStyles from "../OptionGroup/OptionGroup.module.css";
import styles from "./ContactForm.module.css";
import formStyles from "@/styles/formFields.module.css";
import { validateContact } from "@/lib/contactValidation";
import {
  mainFields,
  contactFields,
  roleOptions,
  standInterestOptions,
  directionOptions,
  interestOptions
} from "./contactForm.config";

export default function ContactForm() {
  const [mainValues, setValues] = useState({
    name: "",
    company: "",
  });

  const [contactValues, setContactValues] = useState({
    phone: "",
    email: "",
    message: "",
  });

  const [direction, setDirection] = useState("");
  const [standInterest, setStandInterest] = useState("");
  const [interest, setInterest] = useState("");

  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [showRequiredErrors, setShowRequiredErrors] = useState(false);

  const errors = validateContact(contactValues);
  const hasErrors = Object.keys(errors).length > 0;
  const missing = {
    name: !mainValues.name.trim(),
    company: !mainValues.company.trim(),
    role: !role || (role === "Другое" && !otherRole.trim()),
    standInterest: !standInterest,
    direction: !direction,
    interest: !interest,
    phone: !contactValues.phone.trim(),
    email: !contactValues.email.trim(),
  };

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setShowRequiredErrors(true);
    if (Object.values(missing).some(Boolean)) {
      setStatus("Заполните поля 1-8");
      return;
    }
    if (hasErrors) return;

    setIsSubmitting(true);
    setStatus("");

    const contact = {
      ...mainValues,
      ...contactValues,
      role: role === "Другое" ? otherRole.trim() : role,
      standInterest,
      direction,
      interest,
    };

    try {
      await saveContact(contact);

      setStatus("Анкета сохранена!");
      setShowRequiredErrors(false);

      setValues({ name: "", company: "" });
      setContactValues({ phone: "", email: "", message: "" });
      setRole("");
      setOtherRole("");
      setStandInterest("");
      setDirection("");
      setInterest("");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Не удалось подтвердить сохранение. Проверьте таблицу перед повторной отправкой.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onChange={() => setStatus("")}
      noValidate
    >
      <header className={styles.actions}>
        <h1 className={styles.title}>Анкета</h1>
        <div className={styles.submitActions}>
          <p
            role="status"
            className={`${styles.status} ${status === "Анкета сохранена!" ? styles.success : styles.failure}`}
          >
            {status}
          </p>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем…" : "Сохранить"}
          </button>
        </div>
      </header>
      <fieldset className={styles.fields} disabled={isSubmitting}>
        {mainFields.map((field) => (
          <div className={styles.field} key={field.name}>
            <label className={`${formStyles.heading} ${showRequiredErrors && missing[field.name] ? formStyles.missing : ""}`} htmlFor={field.name}>{field.label}</label>
            <input
              className={formStyles.input}
              id={field.name}
              name={field.name}
              type={field.type}
              aria-invalid={showRequiredErrors && missing[field.name]}
              value={mainValues[field.name]}
              onChange={(event) =>
                setValues((previous) => ({
                  ...previous,
                  [field.name]: event.target.value,
                }))
              }
            />
          </div>
        ))}
        <fieldset className={optionStyles.group}>
          <legend className={`${formStyles.heading} ${showRequiredErrors && missing.role ? formStyles.missing : ""}`}>3. Кто вы?</legend>
          <div className={optionStyles.columns}>
            {roleOptions.map((option) => (
              <div className={optionStyles.roleRow} key={option}>
                <label className={optionStyles.option}>
                  <input
                    type="radio"
                    name="role"
                    value={option}
                    checked={role === option}
                    onChange={(event) => setRole(event.target.value)}
                  />
                  {option}
                </label>

                {option === "Другое" && role === "Другое" && (
                  <input
                    className={formStyles.input}
                    aria-label="Укажите, кто вы"
                    name="otherRole"
                    type="text"
                    aria-invalid={showRequiredErrors && missing.role}
                    value={otherRole}
                    onChange={(event) => setOtherRole(event.target.value)}
                    required
                  />
                )}
              </div>
            ))}
          </div>
        </fieldset>

        <OptionGroup
          title="4. Что интересует на стенде iRidi?"
          name="standInterest"
          options={standInterestOptions}
          value={standInterest}
          onChange={setStandInterest}
          layout="columns"
          invalid={showRequiredErrors && missing.standInterest}
        />
        <OptionGroup
          title="5. Интересующие направления"
          name="direction"
          options={directionOptions}
          value={direction}
          onChange={setDirection}
          layout="inline"
          invalid={showRequiredErrors && missing.direction}
        />
        <OptionGroup
          title="6. Что интересует"
          name="interest"
          options={interestOptions}
          value={interest}
          onChange={setInterest}
          layout="row"
          invalid={showRequiredErrors && missing.interest}
        />
        {contactFields.map((field) => (
          <div className={styles.field} key={field.name}>
            <label className={`${formStyles.heading} ${showRequiredErrors && missing[field.name] ? formStyles.missing : ""}`} htmlFor={field.name}>{field.label}</label>
            <div className={styles.control}>
              <input
                className={formStyles.input}
                id={field.name}
                name={field.name}
                type={field.type}
                aria-invalid={(showRequiredErrors && missing[field.name]) || Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                value={contactValues[field.name]}
                onChange={(event) =>
                  setContactValues((previous) => ({
                    ...previous,
                    [field.name]: event.target.value,
                  }))
                }
              />
              <span id={`${field.name}-error`} className={styles.error}>
                {errors[field.name] || ""}
              </span>
            </div>
          </div>
        ))}
        <MessageField
          value={contactValues.message}
          onChange={(message) => setContactValues((previous) => ({ ...previous, message }))}
        />
      </fieldset>
    </form>
  )
}
