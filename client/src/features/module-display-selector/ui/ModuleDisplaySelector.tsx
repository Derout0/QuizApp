import { useCallback } from 'react'
import { ModuleDisplay } from '@/entities/module'
import SingleIcon from '@/shared/assets/icons/Single.svg'
import CompactIcon from '@/shared/assets/icons/Compact.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleButton, ToggleButtonGroup } from '@/shared/ui/ToggleButtonGroup'
import { Icon } from '@/shared/ui/Icon/Icon'

interface ModuleDisplaySelectorProps {
    className?: string
    selected: ModuleDisplay
    onChange: (display: ModuleDisplay) => void
}

const displayTypes = [
    {
        display: ModuleDisplay.SINGLE,
        icon: SingleIcon,
    },
    {
        display: ModuleDisplay.COMPACT,
        icon: CompactIcon,
    },
]

const ToggleButtons = () => {
    return displayTypes.map(({ display, icon }) => (
        <ToggleButton key={display} value={display}>
            <Icon SVG={icon} />
        </ToggleButton>
    ))
}

export const ModuleDisplaySelector = (props: ModuleDisplaySelectorProps) => {
    const {
        className,
        selected,
        onChange,
    } = props

    const onChangeHandler = useCallback((newDisplay: ModuleDisplay) => {
        onChange(newDisplay)
    }, [onChange])

    return (
        <ToggleButtonGroup<ModuleDisplay>
            aria-labelledby="Change the list display"
            className={classNames('', {}, [className])}
            value={selected}
            onChange={onChangeHandler}
        >
            <ToggleButtons />
        </ToggleButtonGroup>
    )
}
