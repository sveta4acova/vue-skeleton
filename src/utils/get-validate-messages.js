/**
 * Получение набора сообщений о ошибках для поля формы
 * @param fieldName (String) Поле формы
 * @returns {Object}
 */
export default function getValidateMessages(fieldName) {
  const messages = {
    email: {
      email: 'Enter correct Email',
      required: 'Enter Email'
    },
    password: {
      required: 'Enter password'
    },
  };

  return messages[fieldName];
}
