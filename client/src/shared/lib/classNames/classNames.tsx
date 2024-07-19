export type Mods = Record<string, boolean | string | undefined>

/**
 * Генерирует строку классов на основе основного класса, модификаторов и дополнительных классов.
 *
 * @param {string} cls - Основной класс.
 * @param {Object} mods - Объект с модификаторами, где ключ - это класс, а значение - булевое значение.
 * @param {string[]} additional - Дополнительные классы.
 * @returns {string} - Сгенерированная строка классов.
 */

export function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
    const modifierClasses = Object
        .entries(mods)
        .filter(([, value]) => Boolean(value))
        .map(([cls]) => cls)

    return [cls, ...modifierClasses, ...additional.filter(Boolean)].join(' ')
}
