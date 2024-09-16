export enum TextTheme {
    titleH1 = 'title-h1',
    titleH2 = 'title-h2',
    titleH3 = 'title-h3',
    titleH4 = 'title-h4',
    TEXT = 'text-theme',
}

export type TextColor = 'on-primary'
  | 'primary'
  | 'on-secondary'
  | 'secondary'
  | 'on-tertiary'
  | 'tertiary'
  | 'on-surface'
  | 'on-surface-variant'
  | 'error'
  | 'on-error'

export type TextAlign = 'center' | 'inherit' | 'justify' | 'left' | 'right'

export type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

export enum TextLH {
    lh110 = 'lh-110',
    lh120 = 'lh-120',
    lh125 = 'lh-125',
    lh130 = 'lh-130',
}

export type TextFW = '400' | '500' | '600' | '700'
