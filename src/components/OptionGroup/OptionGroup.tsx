import styles from "./OptionGroup.module.css";
import formStyles from "@/styles/formFields.module.css";

type OptionGroupProps = {
  title: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  layout: "columns" | "inline" | "row";
  invalid?: boolean;
};

export default function OptionGroup({
  title,
  name,
  options,
  value,
  onChange,
  layout,
  invalid = false,
}: OptionGroupProps) {
  return (
    <fieldset className={styles.group} aria-invalid={invalid}>
      <legend className={`${formStyles.heading} ${invalid ? formStyles.missing : ""}`}>{title}</legend>
      <div className={styles[layout]}>
        {options.map((option) => (
          <label className={styles.option} key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
