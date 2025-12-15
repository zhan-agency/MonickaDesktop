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

export type AssignTestType = {
  id: number;
  test: TestType;
  assign_date: string;
}

export type TestType = {
  id: number;
  type: string;
  get_type_display: string;
  participant: UserType;
  title: string;
  answers: string;
  date: string;
}

export type typeKeys = 'short_neo' | 'neo_long' | 'scl_90_r' | 'mbti' | 'mbti_5' | 'catel_16pf' | 'mcmi_iii' | 'bdi' | 'bai' | 'b_a_eqi' | 'mii' | 'glasser';

export type MBTITestType = TestType & {
  scores: {
    i: number;
    e: number;
    p: number;
    j: number;
    n: number;
    s: number;
    f: number;
    t: number;
  }
}

export type MBTI5TestType = TestType & {
  scores: {
    i: number;
    e: number;
    p: number;
    j: number;
    n: number;
    s: number;
    f: number;
    t: number;
    a: number;
    tu: number;
  }
}