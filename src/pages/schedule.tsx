import useSWR from 'swr';

import { useEffect } from 'react';
import { AlertTriangle } from 'react-feather';
import Page from '../components/page'
import Section from '../components/section'
import Schedule from '../components/schedule'
import Alert from '../components/alert'

import { useOnlineStatus } from '../utils/online';
import useLocalStorage from '../utils/localStorage';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SchedulePage = () => {
  const isOnline = useOnlineStatus()
  const [lastUpdate, setLastUpdate] = useLocalStorage("schedule.lastUpdate", null);

  const [code] = useLocalStorage("schedule.adeCode", 8379);
  const [scheduleData, setScheduleData] = useLocalStorage("schedule.data", []);

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_ECRANS_CONNECTES_URL || 'https://chirpchat2.alwaysdata.net/wp-json/amu-ecran-connectee'}/v1/schedule/${code}`, fetcher)

  useEffect(() => {
    if (!data || !data.data || error) return;
    console.log("Mise à jour de l'emploi du temps :");
    console.log(new Date());
    setScheduleData(data.data);
    setLastUpdate(new Date());
  }, [data, error, setLastUpdate, setScheduleData])

  console.dir(scheduleData);

  return (
    <Page title='Emploi du temps' showButtons>
      {!isOnline && lastUpdate && <Alert category={<AlertTriangle />} color="yellow" content={`Vous êtes hors-ligne. L'emploi du temps à été mis-à-jour pour la dernière fois le: ${  new Date(lastUpdate).toLocaleString('fr-FR', { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`} />}
      {!isOnline && !lastUpdate && <Alert category={<AlertTriangle />} color="yellow" content="Vous êtes hors-ligne. L'emploi du temps est inaccessible. Reconnectez-vous pour l'avoir à jour." />}
      {error && lastUpdate && <Alert category={<AlertTriangle />} color="yellow" content={`Impossible de se connecter au serveur des écrans connectés. L'emploi du temps à été mis-à-jour pour la dernière fois le: ${  new Date(lastUpdate).toLocaleString('fr-FR', { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`} />}
      <Section>
        {scheduleData && <Schedule data={scheduleData} />}
      </Section>
    </Page>
  )
}

export default SchedulePage
