export type UserType = {
  is_authenticated: boolean;
  is_superuser: boolean;
  email: string;
  get_full_name: string;
  firstName?: string;
  lastName?: string;
  profile: ProfileType;
  clinics: ClinicType[];
}

export type ProfileType = {
  type: string;
  get_type_display: string;
  get_level_display: string;
  phone: string;
}

export type LinkType = {
  to: string;
  title: string;
}

export type IconLinkType = {
  to: string;
  icon: string;
}

export type TileTitleBarType = {
  to: string;
  button_to?: string;
  title: string;
  icon: string;
  button_icon?: string;
  iconBackgroundClassName: string;
}

export type TileListItemType = {
  to: string;
  title: string;
  date: string;
}

export type TileChoicesItemType = {
  to: string;
  title: string;
}
export type JalaliMonthType = {
  name: string;
  length: number;
}
export type JalaliMonthInfoType = JalaliMonthType & {
  firstDay: {
    weekday: number;
    date: string;
  },
}

export type SessionType = {
  id: number,
  isCanceled: boolean,
  isIrregular: boolean,
  isPaid: boolean,
  isOnline: boolean,
  needRoom: boolean,
  time: string,
  date: string,
  length: number,
  client: UserType,
  therapist: TherapistType,
  clinic: {
    id: number,
  }
  type: string,
  get_type_display: string,
  note: string,
  payment: number,
  last_modified_by?: UserType,
  room: number,
}

export type TherapistType = {
  id: number;
  name: string;
}

export type ClinicType = {
  id: number;
  name: string;
  owner_id: number;
  rooms: number;
  phone: number;
}

export type TimeType = {
  time: string;
  date: string;
  therapist: TherapistType;
  clinic: ClinicType;
  isBooked: boolean;
  isPaid: boolean;
}

export type DayType = {
  date: string;
  isAvailable: boolean;
}