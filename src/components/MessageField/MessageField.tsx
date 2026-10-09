import { useEffect, useRef } from "react";
import styles from "./MessageField.module.css";
import formStyles from "@/styles/formFields.module.css";

type MessageFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MessageField({ value, onChange }: MessageFieldProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const field = ref.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${field.scrollHeight + 1}px`;
  }, [value]);

  return (
    <div className={styles.field}>
      <label className={formStyles.heading} htmlFor="message">9. Выслать/сделать после выставки</label>
      <textarea
        ref={ref}
        className={formStyles.input}
        id="message"
        name="message"
        rows={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
