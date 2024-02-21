import { getInitials } from '../helpers'

type Props = {
	size?: number
	image?: string
	children?: React.ReactNode
}

const Avatar = ({ size = 38, image, children }: Props) => {
	const string = children ? children.toString() : ''
	const text = string.split(' ').length > 1 ? getInitials(string) : string[0]

	return (
		<div style={{
			backgroundImage: image ? `url(${image})` : '',
			color: 'white',
			width: `${size}px`,
			height: `${size}px`,
			lineHeight: `${size}px`,
			fontSize: `calc(${size}px * 0.35)`,
			fontWeight: 'var(--weight-bold)',
			letterSpacing: '0.035em',
			backgroundColor: 'var(--accent)',
			backgroundSize: 'cover',
			backgroundPosition: 'center -5px',
			backgroundRepeat: 'no-repeat',
			borderRadius: '50%',
			boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.1)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			{!image && text}
		</div>
	)
}

Avatar.defaultProps = {
	size: 38,
	image: null,
	children: null
}

export default Avatar
