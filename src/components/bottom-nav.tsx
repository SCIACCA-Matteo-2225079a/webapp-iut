import Link from 'next/link'
import { useRouter } from 'next/router'
import { Calendar, Home, Rss, Settings } from 'react-feather'

const links = [
	{
		title: 'Home',
		icon: <Home />,
		href: '/',
	},
	{
		title: 'Emploi du temps',
		icon: <Calendar />,
		href: '/schedule',
	},
	{
		title: 'Informations',
		icon: <Rss />,
		href: '/news',
	},
	{
		title: 'Paramètres',
		icon: <Settings />,
		href: '/settings',
	},
]

const BottomNav = () => {
	const { pathname } = useRouter()

	return (
		<nav style={{
			paddingBottom: 'env(safe-area-inset-bottom)',
			width: '100%',
			height: 'calc(env(safe-area-inset-top) + 72px)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'fixed',
			bottom: 0
		}}>
			<div style={{
				width: '100%',
				maxWidth: '480px',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around'
			}}>
				{links.map(link => (
					<Link href={link.href} key={link.title}>
						<a
							title={link.title}
							aria-label={link.title}
							style={{
								width: '48px',
								height: '48px',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							className={pathname === link.href ? 'active transition-all dark:text-white' : 'transition-all dark:text-white'}
						>
							{link.icon}
						</a>
					</Link>
				))}
			</div>
		</nav>
	)
}

export default BottomNav
