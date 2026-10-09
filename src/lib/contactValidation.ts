export type ContactErrors = {
  phone?: string;
  email?: string;
};

type ContactValues = {
  phone: string;
  email: string;
};

export function validateContact(
  values: ContactValues,
): ContactErrors {
  const errors: ContactErrors = {};

  const phone = values.phone.trim();
  const email = values.email.trim();

  if (phone) {
    const allowedCharacters = /^\+?[\d\s()-]+$/;
    const digits = phone.replace(/\D/g, "");

    if (
      !allowedCharacters.test(phone) ||
      digits.length < 10 ||
      digits.length > 15
    ) {
      errors.phone = "Введите телефон (10-15 цифр)";
    }
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Введите email в формате name@example.com";
  }

  return errors;
}