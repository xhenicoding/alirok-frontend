export interface IOperationHours {
  day_name: DaysNameShort
  opening_time: string
  opening_am_pm: 'AM' | 'PM'
  closing_time: string
  closing_am_pm: 'AM' | 'PM'
  closed: boolean
}

export enum DaysNameShort {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN'
}

export const defaultOperationHours: IOperationHours[] = [
  {
    day_name: DaysNameShort.MON,
    opening_time: '09:00',
    opening_am_pm: 'AM',
    closing_time: '07:00',
    closing_am_pm: 'PM',
    closed: false
  },
  {
    day_name: DaysNameShort.TUE,
    opening_time: '09:00',
    opening_am_pm: 'AM',
    closing_time: '07:00',
    closing_am_pm: 'PM',
    closed: false
  },
  {
    day_name: DaysNameShort.WED,
    opening_time: '09:00',
    opening_am_pm: 'AM',
    closing_time: '07:00',
    closing_am_pm: 'PM',
    closed: false
  },
  {
    day_name: DaysNameShort.THU,
    opening_time: '09:00',
    opening_am_pm: 'AM',
    closing_time: '07:00',
    closing_am_pm: 'PM',
    closed: false
  },
  {
    day_name: DaysNameShort.FRI,
    opening_time: '09:00',
    opening_am_pm: 'AM',
    closing_time: '07:00',
    closing_am_pm: 'PM',
    closed: false
  },
  {
    day_name: DaysNameShort.SAT,
    opening_time: '09:00',
    opening_am_pm: 'AM',
    closing_time: '07:00',
    closing_am_pm: 'PM',
    closed: false
  },
  {
    day_name: DaysNameShort.SUN,
    opening_time: '00:00',
    opening_am_pm: 'AM',
    closing_time: '00:00',
    closing_am_pm: 'PM',
    closed: true
  }
]
