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
    <nav className="bg-white border-t-2 border-gray-100 dark:bg-purple-500 dark:border-opacity-25">
      <div>
        {links.map(link => (
          <Link href={link.href} key={link.title}>
            <a
              title={link.title}
              aria-label={link.title}
              className={pathname === link.href ? 'active transition-all dark:text-white' : 'transition-all dark:text-white'}
            >
              {link.icon}
            </a>
          </Link>
        ))}
      </div>

      <style jsx>{`
        nav {
          padding-bottom: env(safe-area-inset-bottom);
          width: 100%;
          height: calc(env(safe-area-inset-top) + 72px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          bottom: 0;
        }

        nav > div {
          width: 100%;
          max-width: 480px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        nav a {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        nav a :global(> svg) {
          width: 20px;
          height: 20px;
        }

        .active, 
        nav a:active,
        nav a:focus,
        nav a:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        body.dark .active,
        body.dark nav a:active,
        body.dark nav a:focus,
        body.dark nav a:hover {
          background: rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </nav>
  )
}

export default BottomNav
