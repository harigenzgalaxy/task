import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useEffect, useState } from 'react'
import '@schedule-x/theme-default/dist/index.css'
import './calender.css'
// import '@schedule-x/theme-shadcn/dist/index.css'

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-07-24 09:00',
        end: '2025-07-24 10:00',
        description: 'General team meeting to review tasks and updates.',
      },
      {
        id: '2',
        title: 'UI Polish & QA',
        start: '2025-07-25 10:00',
        end: '2025-07-25 12:00',
        description: 'Final UI tweaks and a quick QA run before demo.',
      },
      {
        id: '3',
        title: 'Design Review Meeting',
        start: '2025-07-26 14:30',
        end: '2025-07-26 15:30',
        description: 'Discuss Figma mockups and gather design feedback.',
      },
      {
        id: '4',
        title: 'Bug Fixing Marathon',
        start: '2025-07-27 00:00',
        end: '2025-07-28 00:00',
        description: 'All hands on deck to resolve major backend bugs.',
      },
      {
        id: '5',
        title: 'Team Standup',
        start: '2025-07-29 09:00',
        end: '2025-07-29 09:30',
        description: 'Quick sync-up to align tasks for the day.',
      },
      {
        id: '6',
        title: 'Deployment Day',
        start: '2025-07-30 16:00',
        end: '2025-07-30 18:00',
        description: 'Production deployment and post-release testing.',
      },
      {
        id: '7',
        title: 'Wrap-up & Docs',
        start: '2025-07-31 00:00',
        end: '2025-07-31 00:00',
        description: 'Complete final documentation and wrap up tasks.',
      },
    ],
    plugins: [eventsService],
    slots: {
      monthGridEvent: ({ calendarEvent }) => (
        <div title={calendarEvent.description}>
          {calendarEvent.title}
        </div>
      ),
      timeGridEvent: ({ calendarEvent }) => (
        <div title={calendarEvent.description}>
          {calendarEvent.title}
        </div>
      ),
    },
  })

  useEffect(() => {
    eventsService.getAll()
  }, [])

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp
