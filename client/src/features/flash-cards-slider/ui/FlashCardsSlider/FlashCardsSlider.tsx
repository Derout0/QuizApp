import * as cls from './FlashCardsSlider.module.scss'
import { useCallback, useRef, useState } from 'react'
import type { Settings as SlickSettings } from 'react-slick'
import Slider from 'react-slick'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { TermEntity } from '@/entities/module'
import { FlashCardItem } from '../FlashCardItem/FlashCardItem'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Button } from '@/shared/ui/Button/Button'
import { Text } from '@/shared/ui/Text/Text'

interface FlashCardsSliderProps {
    className?: string
    terms: TermEntity[]
}

export const FlashCardsSlider = (props: FlashCardsSliderProps) => {
    const {
        className,
        terms,
    } = props

    const [slideIndex, setSlideIndex] = useState<number>(0)

    const sliderRef = useRef<Slider>(null)

    const settings: SlickSettings = {
        speed: 500,
        infinite: false,
        arrows: false,
        draggable: false,
        touchMove: false,
        beforeChange: (_, next) => setSlideIndex(next),
    }

    const getCardsItems = useCallback(() => {
        return terms.map(term =>
            <FlashCardItem key={term.termId} term={term} />,
        )
    }, [terms])

    const nextSlide = useCallback(() => sliderRef.current?.slickNext(), [])

    const onClickPositive = useCallback(() => {
        console.log(terms[slideIndex])
        nextSlide()
    }, [nextSlide, slideIndex, terms])

    const onClickDeny = useCallback(() => {
        nextSlide()
    }, [nextSlide])

    const currentNumber = slideIndex + 1
    const totalNumber = terms.length

    return (
        <VStack gap="20" className={classNames(cls.FlashCardsSlider, {}, [className])}>
            <Slider ref={sliderRef} {...settings}>
                {getCardsItems()}
            </Slider>
            <HStack gap="20" justify="center" align="center" flexWrap="wrap">
                <Button
                    className={cls['answer-button']}
                    theme="outlined"
                    onClick={onClickDeny}
                >
                    Не знаю
                </Button>
                <Text>{currentNumber}/{totalNumber}</Text>
                <Button
                    className={cls['answer-button']}
                    theme="filled"
                    onClick={onClickPositive}
                >
                    Знаю
                </Button>
            </HStack>
        </VStack>
    )
}
