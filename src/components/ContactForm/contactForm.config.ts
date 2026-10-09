export const mainFields = [
    { name: "name", label: "1. Имя", type: "text" },
    { name: "company", label: "2. Компания", type: "text" },
] as const;

export const contactFields = [
    { name: "phone", label: "7. Телефон", type: "tel" },
    { name: "email", label: "8. Email", type: "email" },
] as const;

export const roleOptions = [
  "Интегратор",
  "Дизайнер, архитектор",
  "Электрик, слаботочник",
  "Застройщик, девелопер",
  "Проектировщик",
  "Частное лицо, смотрю для себя",
  "Заказчик от юр. лица",
  "Инженер по эксплуатации",
  "Продавец УД, ЭУИ, инженерки",
  "Другое",
] as const;

export const standInterestOptions = [
  "Материалы о продуктах",
  "Ищу себе инсталлятора",
  "Обучающие курсы",
  "Ищу вендора как инсталлятор",
  "Хочу стать дистрибьютором",
  "Договориться о презентации pre-sale менеджера",
] as const;

export const directionOptions = [
  "SmartHome",
  "Коммерция, AV",
  "МКД",
  "Отели",
  "BMS",
] as const;

export const interestOptions = [
  "Нужно КП, презентация, встреча или партнерство",
  "Будущие планы",
  "Смотрю, что есть на рынке",
] as const;
