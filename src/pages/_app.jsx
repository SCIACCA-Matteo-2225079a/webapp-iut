import Head from 'next/head'
import { OnlineStatusProvider } from "../utils/online";
import '../styles/global.css'

const App = ({ Component, pageProps }) => {

  return (
    <OnlineStatusProvider>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>
        <meta charSet='utf-8' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content={process.env.title} />
        <meta name='application-name' content={process.env.title} />
        <meta
          name='description'
          content="Accédez à votre emploi du temps en un clin d'oeil"
        />
        <meta name='theme-color' content='#1f2022' />
        <meta name="theme-color" content="#290944" media="(prefers-color-scheme: dark)" />

        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
        />
        <link rel='apple-touch-icon' href='/images/maskable_icon_x192.png' />
        <link rel='icon' type='image/png' href='/favicon.png' />
        <link rel='manifest' href='/manifest.json' />

				<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" async=""></script>
				<script>
					window.OneSignal = window.OneSignal || [];
						OneSignal.push(function() {
							window.OneSignal.init({
								appId: "0a2f9a03-ae7e-4744-9901-09a0ac1f12f2",
								safari_web_id: "web.onesignal.auto.0a17e090-f65a-43cf-871a-056959ed633a",
								notifyButton: {
									enable: true,
								},
							})
						});
				</script>
			</Head>

      <Component {...pageProps} />
    </OnlineStatusProvider>
  )
}

export default App
