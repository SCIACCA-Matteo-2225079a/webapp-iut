import React, { useState } from 'react'
import { isMobileSafari } from 'react-device-detect'

import { Bell, BellOff } from 'react-feather'
import useSWR from 'swr'

import Page from '../components/page'
import Section from '../components/section'
import Pills from '../components/pills'

import Button from '../components/input/button'

import useLocalStorage from '../utils/localStorage'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Settings = () => {
    const [code, setCode] = useLocalStorage("schedule.adeCode", 8379);

    const [notifications, setNotifications] = useState(false)
    const [groupFilter, setGroupFilter] = useState(true)

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_ECRANS_CONNECTES_URL || 'https://iut-ptut.alwaysdata.net/wp-json/amu-ecran-connectee'}/v1/ade`, fetcher)

    const onCodeChange = (newCode: any) => {
        console.log('ADE code changed to', newCode)
        localStorage.removeItem('schedule.data')
        setCode(newCode)
    }

    return (
        <Page title='Paramètres' subtitle={<p className="text-sm dark:text-gray-200">Ces paramètres seront enregistrés sur votre appareil.</p>}>
            <Section>
                <Section>
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <p className="text-xs dark:text-gray-200">Recevez des notifications de la part de l&apos;IUT en cas d&apos;informations urgentes.</p>
                    <Button icon={notifications ? <BellOff /> : <Bell />} onClick={() => setNotifications(!notifications)}>
                        <span>{notifications ? 'Désactiver' : 'Activer'}</span>
                    </Button>
                    {!isMobileSafari && <p className="text-xs dark:text-gray-200">iOS ne permet pas à l&apos;heure actuelle de recevoir les notifications d&apos;un site internet. Veuillez utiliser un autre navigateur; comme <b>Chrome</b> ou <b>Firefox</b>.</p>}
                </Section>

                <Section disabled={error !== null} loading={!Array.isArray(data)}>
                    <h3 className="text-lg font-semibold">Emploi du temps sélectionné</h3>
                    <p className="mb-4 text-sm dark:text-gray-200">Vous pouvez le changer à tout moment. Il est accessible hors-ligne.</p>

                    <Pills currentValue={groupFilter} onValueChange={setGroupFilter} data={[
                        { value: true, label: 'Tout' },
                        { value: 'year', label: 'Année' },
                        { value: 'group', label: 'Groupe' },
                        { value: 'halfGroup', label: 'Demi-groupe' },
                        { value: 'teacher', label: 'Enseignant' }
                    ]} />

                    <div className="relative inline-block w-full mt-4 text-gray-700">
                        {data && (<>
                            <select onChange={e => onCodeChange(parseInt(e.target.value, 10))} className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none dark:text-gray-100 dark:bg-purple-700 dark:border-transparent focus:outline-none focus:ring focus:border-blue-300" placeholder="Emploi du temps à sélectionner" defaultValue={code}>
                                {data.filter(({ type }) => groupFilter === true || type === groupFilter)
                                     .map(({ newCode, title }) => <option key={newCode} value={newCode}>{title}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                                </svg>
                            </div>
                        </>)}
                    </div>
                </Section>
            </Section>

        </Page>
        )
    }

export default Settings
