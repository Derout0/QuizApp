// Typed the original code from https://github.com/ianstormtaylor/is-hotkey
import type { KeyboardEvent } from 'react'

const IS_MAC = (
    typeof window !== 'undefined'
    && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
)

const MODIFIERS: Record<string, keyof KeyboardEvent> = {
    alt: 'altKey',
    control: 'ctrlKey',
    meta: 'metaKey',
    shift: 'shiftKey',
}

const ALIASES: Record<string, string> = {
    add: '+',
    break: 'pause',
    cmd: 'meta',
    command: 'meta',
    ctl: 'control',
    ctrl: 'control',
    del: 'delete',
    down: 'arrowdown',
    esc: 'escape',
    ins: 'insert',
    left: 'arrowleft',
    mod: IS_MAC ? 'meta' : 'control',
    opt: 'alt',
    option: 'alt',
    return: 'enter',
    right: 'arrowright',
    space: ' ',
    spacebar: ' ',
    up: 'arrowup',
    win: 'meta',
    windows: 'meta',
}

const CODES: Record<string, number> = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'control': 17,
    'alt': 18,
    'pause': 19,
    'capslock': 20,
    'escape': 27,
    ' ': 32,
    'pageup': 33,
    'pagedown': 34,
    'end': 35,
    'home': 36,
    'arrowleft': 37,
    'arrowup': 38,
    'arrowright': 39,
    'arrowdown': 40,
    'insert': 45,
    'delete': 46,
    'meta': 91,
    'numlock': 144,
    'scrolllock': 145,
    ';': 186,
    '=': 187,
    ',': 188,
    '-': 189,
    '.': 190,
    '/': 191,
    '`': 192,
    '[': 219,
    '\\': 220,
    ']': 221,
    '\'': 222,
}

for (let f = 1; f < 20; f++) {
    CODES[`f${f}`] = 111 + f
}

interface HotkeyObject {
    key?: string
    which?: number
    [key: string]: boolean | number | string | null | undefined
}

interface HotkeyOptions {
    byKey?: boolean
}

function isHotkey(
    hotkey: string | string[],
    options: HotkeyOptions | KeyboardEvent | null,
    event?: KeyboardEvent,
): boolean | ((e: KeyboardEvent) => boolean) {
    if (options && !('byKey' in options)) {
        event = options as KeyboardEvent
        options = null
    }

    if (!Array.isArray(hotkey)) {
        hotkey = [hotkey]
    }

    const array = hotkey.map(string => parseHotkey(string, options as HotkeyOptions))
    const check = (e: KeyboardEvent) => array.some(object => compareHotkey(object, e))
    return event == null ? check : check(event)
}

function isCodeHotkey(hotkey: string | string[], event: KeyboardEvent): boolean {
    return isHotkey(hotkey, event) as boolean
}

function isKeyHotkey(hotkey: string | string[], event: KeyboardEvent): boolean {
    return isHotkey(hotkey, { byKey: true }, event) as boolean
}

function parseHotkey(hotkey: string, options?: HotkeyOptions): HotkeyObject {
    const byKey = options?.byKey ?? false

    const ret: Record<string, string | number | boolean | null> = {}

    for (const k in MODIFIERS) {
        ret[MODIFIERS[k]] = false
    }

    for (let value of hotkey.split('+')) {
        const optional = value.endsWith('?') && value.length > 1

        if (optional) {
            value = value.slice(0, -1)
        }

        const name = toKeyName(value)
        const modifier = MODIFIERS[name]

        if (value.length > 1 && !modifier && !ALIASES[value] && !CODES[name]) {
            throw new TypeError(`Unknown modifier: "${value}"`)
        }

        if (!modifier) {
            if (byKey) {
                ret.key = name
            } else {
                ret.which = toKeyCode(value)
            }
        } else {
            ret[modifier] = optional ? null : true
        }
    }

    return ret
}

function compareHotkey(object: HotkeyObject, event: KeyboardEvent): boolean {
    for (const key in object) {
        const expected = object[key]
        let actual

        if (expected == null) {
            continue
        }

        if (key === 'key' && event.key != null) {
            actual = event.key.toLowerCase()
        } else if (key === 'which') {
            actual = expected === 91 && event.which === 93 ? 91 : event.which
        } else {
            actual = (event as any)[key]
        }

        if (actual == null && expected === false) {
            continue
        }

        if (actual !== expected) {
            return false
        }
    }

    return true
}

function toKeyCode(name: string): number {
    name = toKeyName(name)
    const code = CODES[name] || name.toUpperCase().charCodeAt(0)
    return code
}

function toKeyName(name: string): string {
    name = name.toLowerCase()
    name = ALIASES[name] || name
    return name
}

export {
    isHotkey,
    isCodeHotkey,
    isKeyHotkey,
    parseHotkey,
    compareHotkey,
    toKeyCode,
    toKeyName,
}
