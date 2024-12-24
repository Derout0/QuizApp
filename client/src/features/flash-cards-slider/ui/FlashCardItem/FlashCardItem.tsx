import * as cls from './FlashCardItem.module.scss'
import { memo, useCallback, useState } from 'react'
import type { TermEntity } from '@/entities/module'
import { classNames } from '@/shared/lib/classNames/classNames'
import { CardFlip } from '@/shared/ui/CardFlip/CardFlip'
import { Card, CardContent } from '@/shared/ui/Card'

interface FlashCardItemProps {
    className?: string
    term: TermEntity
}

const CardFlipInner = ({ value }: { value: string }) => {
    return (
        <Card className={cls.card}>
            <CardContent className={cls['card-content']}>
                {value}
            </CardContent>
        </Card>
    )
}

export const FlashCardItem = memo((props: FlashCardItemProps) => {
    const {
        className,
        term,
    } = props

    const [isFlipped, setIsFlipped] = useState<boolean>(false)

    const onFlipCard = useCallback(() => {
        setIsFlipped(!isFlipped)
    }, [isFlipped])

    return (
        <div
            className={classNames(cls.FlashCardItem, {}, [className])}
            onClick={onFlipCard}
        >
            <CardFlip flipSpeed={0.4} isFlipped={isFlipped} flipDirection="vertical">
                <CardFlipInner value={term.term} />
                <CardFlipInner value={term.definition} />
            </CardFlip>
        </div>
    )
})
