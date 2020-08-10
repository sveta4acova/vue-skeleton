/**
 * Добавление модификаторов к классу
 * @param className (String) Класс
 * @param modifiers (Array | String) Модификаторы
 * @returns {String}
 */
export default function getModifiers (className, modifiers) {
  let result = '';

  if (Array.isArray(modifiers)) {
    result = [ className ];

    for (let modifier of modifiers) {
      result.push(`${className}_${modifier}`);
    }
  } else if (!modifiers) {
    result = className;
  } else {
    result = `${className} ${className}_${modifiers}`;
  }

  return result;
}
