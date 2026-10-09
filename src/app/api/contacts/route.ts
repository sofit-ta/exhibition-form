import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contactValidation";
import {
  standInterestOptions,
  directionOptions,
  interestOptions,
} from "@/components/ContactForm/contactForm.config";

export async function POST(request: Request) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;

  if (!url || !secret) {
    return NextResponse.json(
      { error: "Сохранение не настроено" },
      { status: 500 },
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректный запрос" },
      { status: 400 },
    );
  }

  const keys = [
    "name",
    "company",
    "role",
    "standInterest",
    "direction",
    "interest",
    "phone",
    "email",
    "message",
  ] as const;

  if (
    !body ||
    typeof body !== "object" ||
    keys.some((key) => typeof body[key] !== "string")
  ) {
    return NextResponse.json(
      { error: "Некорректные данные анкеты" },
      { status: 400 },
    );
  }

  const contact = {
    name: body.name.trim(),
    company: body.company.trim(),
    role: body.role.trim(),
    standInterest: body.standInterest.trim(),
    direction: body.direction.trim(),
    interest: body.interest.trim(),
    phone: body.phone.trim(),
    email: body.email.trim(),
    message: body.message.trim(),
  };

  const requiredValues = [
    contact.name,
    contact.company,
    contact.role,
    contact.standInterest,
    contact.direction,
    contact.interest,
    contact.phone,
    contact.email,
  ];

  if (requiredValues.some((value) => !value)) {
    return NextResponse.json(
      { error: "Заполните поля 1-8" },
      { status: 400 },
    );
  }

  if (
    !standInterestOptions.includes(contact.standInterest) ||
    !directionOptions.includes(contact.direction) ||
    !interestOptions.includes(contact.interest)
  ) {
    return NextResponse.json(
      { error: "Выберите варианты из списка" },
      { status: 400 },
    );
  }

  if (Object.keys(validateContact(contact)).length > 0) {
    return NextResponse.json(
      { error: "Проверьте телефон и email" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, contact }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error("Google Script вернул ошибку");
    }

    const result = await response.json();

    if (result.ok !== true) {
      throw new Error("Google Script не подтвердил сохранение");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Не удалось подтвердить сохранение. Проверьте таблицу перед повторной отправкой.",
      },
      { status: 502 },
    );
  }
}
