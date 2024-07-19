import { classNames } from './classNames'

describe('classNames', () => {
    test('first param', () => {
        expect(classNames('TestClass')).toBe('TestClass')
    })

    test('with mods', () => {
        expect(classNames('TestClass', { active: true, selected: false })).toBe('TestClass active')
    })

    test('all args', () => {
        expect(classNames('TestClass', { active: true }, ['additional'])).toBe('TestClass active additional')
    })
})
