import { Share, Edit2 } from 'react-feather'
import Section from './section'

type Props = {
  showButtons: boolean,
  subtitle?: React.ReactNode,
  children?: React.ReactNode
}

const Title = ({ showButtons, subtitle, children }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Département info',
        text: 'Emploi du temps',
        url: window.location.href,
      });
    }
  }

  return (
    <Section>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-4xl text-gray-900 leading-12 font-display dark:text-gold-400 dark:font-semibold sm:truncate">
            {children}
          </h2>
          {subtitle}
        </div>
        {showButtons && (
          <div className="flex mt-5 lg:mt-0 lg:ml-4">
            <span className="hidden sm:block">
              <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Edit2 />&nbsp;
                Modifier
              </button>
            </span>

            <span className="hidden ml-3 sm:block">
              <button type="button" onClick={handleShare} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Share />&nbsp;
                Partager
              </button>
            </span>
          </div>
        )}
      </div>
    </Section>
  )
}

export default Title
