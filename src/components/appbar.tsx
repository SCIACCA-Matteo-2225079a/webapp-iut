import { useEffect, useCallback } from 'react';
import { Wifi, WifiOff, Moon, Sun } from 'react-feather';
import Brand from './brand';
import { useOnlineStatus } from '../utils/online';
import useLocalStorage from '../utils/localStorage';

const Header = () => {
	const isOnline = useOnlineStatus();
	const [mode, setMode] = useLocalStorage('dark-mode', 'autodetect');

	const onSelectMode = useCallback((selectedMode: string) => {
		setMode(selectedMode);
		if (selectedMode === 'dark') document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
	}, [setMode]);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const listener = (e) => onSelectMode(e.matches ? 'dark' : 'light');

		// Add listener to update styles
		mediaQuery.addEventListener('change', listener);

		// Setup dark/light mode for the first time
		if (mode === 'autodetect') onSelectMode(mediaQuery.matches ? 'dark' : 'light');
		else onSelectMode(mode);

		// Remove listener
		return () => {
			mediaQuery.removeEventListener('change', listener);
		};
	}, [mode, onSelectMode]);

	return (
		<header className="bg-white border-b-2 border-gray-100 dark:border-opacity-25 dark:bg-purple-500">
			<Brand />
			<div style={{ flex: 1 }} />
			<nav>
				{isOnline ? <Wifi /> : <WifiOff />}
				<div className="divider" />
				{mode === 'dark' ? (
					<Moon className="transition-all cursor-pointer hover:opacity-50" onClick={() => onSelectMode('light')} />
				) : (
					<Sun className="transition-all cursor-pointer hover:opacity-50" onClick={() => onSelectMode('dark')} />
				)}
			</nav>
			<style>{`
        header {
          padding: 0 var(--gap);
          padding-top: env(safe-area-inset-top);
          width: 100%;
          height: calc(env(safe-area-inset-top) + 72px);
          display: flex;
          align-items: center;
          z-index: 10;
          position: fixed;
          top: 0;
          left: 0;
          transition: var(--transition-colors);
        }

        nav {
          display: flex;
          align-items: center;
          z-index: 4;
        }

        .divider {
          margin: 0 var(--gap);
          width: 1px;
          height: 28px;
          background: var(--divider);
          display: flex;
          transition: var(--transition-colors);
        }
      `}</style>
		</header>
	);
};

export default Header;
