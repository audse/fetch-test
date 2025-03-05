type IconProps = {
    fill?: string
    width?: number
    height?: number
    stroke?: string
    strokeWidth?: number
}

const getViewBox = (props: IconProps, x: number, y: number, w: number, h: number) => props.strokeWidth ? `${x - props.strokeWidth / 2} ${y - props.strokeWidth / 2} ${w + props.strokeWidth} ${h + props.strokeWidth}` : `${x} ${y} ${w} ${h}`

export const HeartIcon = (props: IconProps) => (
    <svg width={props.width ?? 16} height={props.height ?? 16} viewBox={getViewBox(props, 0, 0, 16, 16)} xmlns="http://www.w3.org/2000/svg">
        <path fill={props.fill ?? 'currentColor'} stroke={props.stroke ?? 'currentColor'} strokeWidth={props.strokeWidth} d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" />
    </svg>
)

export const CaretDownIcon = (props: IconProps) => (
    <svg width={props.width ?? 16} height={props.height ?? 16} viewBox={getViewBox(props, 0, 0, 24, 24)} xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10L12 14L8 10" fill={props.fill ?? 'none'} stroke={props.stroke ?? 'currentColor'} strokeWidth={props.strokeWidth} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export const CaretUpIcon = (props: IconProps) => (
    <svg width={props.width ?? 16} height={props.height ?? 16} viewBox={getViewBox(props, 0, 0, 24, 24)} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14L12 10L16 14" fill={props.fill ?? 'none'} stroke={props.stroke ?? 'currentColor'} strokeWidth={props.strokeWidth} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export const FilterIcon = (props: IconProps) => (
    <svg width={props.width ?? 16} height={props.height ?? 16} viewBox={getViewBox(props, 0, 0, 24, 24)} fill={props.fill ?? 'currentColor'} stroke={props.stroke ?? 'none'} strokeWidth={props.strokeWidth} stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,9a3.66,3.66,0,0,0,1-.13V21a1,1,0,0,1-2,0V8.87A3.66,3.66,0,0,0,12,9Z"></path>
        <path d="M19,16a3.66,3.66,0,0,0,1-.13V21a1,1,0,0,1-2,0V15.87A3.66,3.66,0,0,0,19,16Z"></path>
        <path d="M20,3V8.13a3.91,3.91,0,0,0-2,0V3a1,1,0,0,1,2,0Z"></path>
        <path d="M6,3V15.13A3.66,3.66,0,0,0,5,15a3.66,3.66,0,0,0-1,.13V3A1,1,0,0,1,6,3Z"></path>
        <path d="M8,19a3,3,0,1,1-4-2.82,2.87,2.87,0,0,1,2,0A3,3,0,0,1,8,19Z"></path>
        <path d="M15,5a3,3,0,0,1-2,2.82,2.87,2.87,0,0,1-2,0A3,3,0,1,1,15,5Z"></path>
        <path d="M22,12a3,3,0,0,1-2,2.82,2.87,2.87,0,0,1-2,0,3,3,0,0,1,0-5.64,2.87,2.87,0,0,1,2,0A3,3,0,0,1,22,12Z"></path>
    </svg>
)

export const LocationIcon = (props: IconProps) => (
    <svg width={props.width ?? 16} height={props.height ?? 16} viewBox={getViewBox(props, 0, -1, 16, 18)} xmlns="http://www.w3.org/2000/svg">
        <path fill={props.fill ?? 'currentColor'} stroke={props.stroke ?? 'currentColor'} strokeWidth={props.strokeWidth} d="M8 0C4.68629 0 2 2.68629 2 6C2 9.09091 4.18182 12.6364 7.45455 15.7727C7.77273 16.0909 8.22727 16.0909 8.54545 15.7727C11.8182 12.6364 14 9.09091 14 6C14 2.68629 11.3137 0 8 0ZM8 8.5C6.61929 8.5 5.5 7.38071 5.5 6C5.5 4.61929 6.61929 3.5 8 3.5C9.38071 3.5 10.5 4.61929 10.5 6C10.5 7.38071 9.38071 8.5 8 8.5Z" />
    </svg>
)