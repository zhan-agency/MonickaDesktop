import { AssignTestType, BAEQITestScoresType, BAITestScoresType, BDITestScoresType, Cattel16pfTestScoresType, Cattel16pfTestType, ClinicType, GenericTestType, GlasserTestScoresType, JalaliMonthType, MBTI5TestScoresType, MBTI5TestType, MBTITestScoresType, MIITestScoresType, NeoLongTestScoresType, SessionType, TestType, TherapistType, UserType, typeKeys } from "./type/monicka";

export const jalaliMonths: { [key: number]: JalaliMonthType } = {
  1: { name: 'فروردین', length: 31 },
  2: { name: 'اردیبهشت', length: 31 },
  3: { name: 'خرداد', length: 31 },
  4: { name: 'تیر', length: 31 },
  5: { name: 'مرداد', length: 31 },
  6: { name: 'شهریور', length: 31 },
  7: { name: 'مهر', length: 30 },
  8: { name: 'آبان', length: 30 },
  9: { name: 'آذر', length: 30 },
  10: { name: 'دی', length: 30 },
  11: { name: 'بهمن', length: 30 },
  12: { name: 'اسفند', length: 29 },
}

export function e2p(input: string): string {
  const persianNumbers: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return input.replace(/[0-9]/g, (digit: string): string => persianNumbers[parseInt(digit)]);
}

export const addDaysToStringDate = (dateStr: string, n: number) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + n);
  return date.toISOString().slice(0, 10);
}

export function timeStringToDecimal(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours + minutes / 60; // Convert minutes to decimal
}


export function decimalToTimeString(decimal: number) {
  const hours = decimal - (decimal % 1);
  const minutes = decimal % 1;
  return `${hours}:${minutes != 0 ? "30" : "00"}`
}

export const BASE_URL = 'https://www.monicka.ir'; //'http://127.0.0.1:8000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function apiCall<T>(
  url: string,
  method: HttpMethod = 'GET',
  body?: Record<string, any>,
): Promise<T> {
  const storedAccess = await (window as any).electronAPI.getToken('access');
  const response = await fetch(BASE_URL + "/api/2.0" + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${storedAccess}`,
    },
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    if (response.status === 401) {
      const refresh = await (window as any).electronAPI.getToken('refresh');
      const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });
      console.log('[Auth Refresh] Response status:', response.status);
      if (!response.ok) throw new Error('Refresh failed');
      const { access } = await response.json();

      console.log('[Auth Refresh] New access token received, storing...');
      // Store new access token
      await (window as any).electronAPI.storeToken('access', access);
      console.log('[Auth Refresh] Access token stored successfully');

      if (access) {
        return apiCall<T>(url, method, body);
      }
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    window.location.href = '/login';
  }

  return response.json() as Promise<T>;
}


export async function updateSession(sessionId: number, body: Record<string, any>): Promise<SessionType> {
  const session = await apiCall<SessionType[]>(`/session/${sessionId}/`, 'PUT', body);
  return mapToSession(session);
}

export async function getSessions(userId?: number): Promise<SessionType[]> {
  const sessions = await apiCall<SessionType[]>(`/session/comming/`);
  return sessions.map((session: { [key: string]: any }) => mapToSession(session));
}

export async function getClinics(userId?: number): Promise<ClinicType[]> {
  const sessions = await apiCall<ClinicType[]>(`/clinic/`);
  return sessions.map((clinic: { [key: string]: any }) => mapToClinic(clinic));
}

export async function getAssignTests(recent: boolean = false): Promise<AssignTestType[]> {
  const url = recent ? '/assign_test/recent/' : '/assign_test/';
  const sessions = await apiCall<TestType[]>(url);
  return sessions.map((test: { [key: string]: any }) => mapToAssignTest(test));
}

export async function getTests(userType: number = 3): Promise<TestType[]> {
  if (userType == 3) {
    const sessions = await apiCall<TestType[]>(`/test/`);
    return sessions.map((test: { [key: string]: any }) => mapToTest(test));
  }
  const sessions = await apiCall<TestType[]>(`/test/assigned/`);
  return sessions.map((test: { [key: string]: any }) => mapToTest(test));

}

export function mapToUser(data: { [key: string]: any }): UserType {
  return {
    firstName: data.user.first_name,
    lastName: data.user.last_name,
    is_authenticated: true,
    is_superuser: false,
    email: "",
    get_full_name: data.user.first_name + ' ' + data.user.last_name,
    profile: {
      type: "",
      get_type_display: "",
      get_level_display: "",
      phone: data.phone_number,
    },
    clinics: data.user.clinic ? [mapToClinic(data.user.clinic)] : []
  }
}

export function mapToClinic(data: { [key: string]: any }): ClinicType {
  return {
    id: data.id ?? 0,
    name: data.name,
    rooms: data.capacity,
    owner_id: data.owner,
    phone: parseInt(data.phone_number) || 0,
  }
}

export function mapToTherapist(data: { [key: string]: any }): TherapistType {
  return {
    id: data.id || 0,
    name: data.short_name,
  }
}

export function mapToSession(data: { [key: string]: any }): SessionType {
  return {
    id: data.id || 0,
    isCanceled: data.is_canceled,
    isIrregular: data.is_irregular,
    isPaid: data.paid,
    isOnline: data.is_online,
    needRoom: data.need_room,
    time: data.start_time.split('T')[1].substring(0, 5),
    date: data.start_time.split('T')[0],
    length: data.length,
    client: mapToUser(data.client),
    therapist: mapToTherapist(data.therapist),
    clinic: {
      id: data.clinic,
    },
    type: data.type,
    get_type_display: "مشاوره",
    note: data.text,
    payment: 200000,
    last_modified_by: data.last_modified_by,
    room: 0,
  }
}

export function mapToAssignTest(data: { [key: string]: any }): AssignTestType {
  return {
    id: data.id || 0,
    test: mapToTest(data.test),
    assign_date: data.assign_date,
  }
}

export const typeDict = {
  short_neo: 'نئو (فرم کوتاه)',
  neo_long: 'نئو (فرم بلند)',
  scl_90_r: 'چک‌لیست نشانه‌های اختلالات روانی (SCL-90-R)',
  mbti: 'ام‌بی‌تی‌آی (MBTI)',
  mbti_5: 'ام‌بی‌تی‌آی ۵ عاملی (MBTI 5)',
  catel_16pf: 'شخصیت کتل',
  mcmi_iii: 'شخصیت میلون (MCMI_III)',
  bdi: 'شاخص افسردگی بک',
  bai: 'شاخص اضطراب بک',
  b_a_eqi: 'پرسشنامه هوش هیجانی بار-آن',
  mii: 'آزمون هوش چندوجهی گاردنر',
  glasser: 'آزمون نیازهای اساسی گلسر',
}

function mapToCattelTestScores(data: { [key: string]: any }): Cattel16pfTestScoresType {
  return {
    a: parseInt(data.scores.a  || 0), 
    b: parseInt(data.scores.b  || 0), 
    c: parseInt(data.scores.c  || 0), 
    e: parseInt(data.scores.e  || 0), 
    f: parseInt(data.scores.f  || 0), 
    g: parseInt(data.scores.g  || 0), 
    h: parseInt(data.scores.h  || 0), 
    i: parseInt(data.scores.i  || 0), 
    l: parseInt(data.scores.l  || 0), 
    m: parseInt(data.scores.m  || 0), 
    n: parseInt(data.scores.n  || 0), 
    o: parseInt(data.scores.o  || 0), 
    q1: parseInt(data.scores.q1 || 0),
    q2: parseInt(data.scores.q2 || 0),
    q3: parseInt(data.scores.q3 || 0),
    q4: parseInt(data.scores.q4 || 0),
  }
}

function mapToMBTI5TestScores(data: { [key: string]: any }): MBTI5TestScoresType {
  return {
    e: parseInt(data.scores.e || 0),
    n: parseInt(data.scores.n || 0),
    f: parseInt(data.scores.f || 0),
    j: parseInt(data.scores.j || 0),
    a: parseInt(data.scores.a || 0),
    i: parseInt(data.scores.i || 0),
    s: parseInt(data.scores.s || 0),
    t: parseInt(data.scores.t || 0),
    p: parseInt(data.scores.p || 0),
    tu: parseInt(data.scores.tu || 0),
  }
}


function mapToMBTITestScores(data: { [key: string]: any }): MBTITestScoresType {
  return {
    e: parseInt(data.scores.e || 0),
    n: parseInt(data.scores.n || 0),
    f: parseInt(data.scores.f || 0),
    j: parseInt(data.scores.j || 0),
    i: parseInt(data.scores.i || 0),
    s: parseInt(data.scores.s || 0),
    t: parseInt(data.scores.t || 0),
    p: parseInt(data.scores.p || 0),
  }
}

function mapToMIITestScores(data: { [key: string]: any }): MIITestScoresType {
  return {
    VS: parseInt(data.scores.VS || 0),
    LV: parseInt(data.scores.LV || 0),
    Ie: parseInt(data.scores.Ie || 0),
    Ia: parseInt(data.scores.Ia || 0),
    LM: parseInt(data.scores.LM || 0),
    M: parseInt(data.scores.M || 0),
    BK: parseInt(data.scores.BK || 0),
    N: parseInt(data.scores.N || 0),
  }
}

function mapToBDITestScoresType(data: { [key: string]: any }): BDITestScoresType {
  return {
    a: parseInt(data.scores.a || 0),
    c: parseInt(data.scores.c || 0),
    p: parseInt(data.scores.p || 0),
  }
}

function mapToBAITestScoresType(data: { [key: string]: any }): BAITestScoresType {
  return {
    a: parseInt(data.scores.a || 0),
  }
}

function mapToBAEQITestScoresType(data: { [key: string]: any }): BAEQITestScoresType {
  return {
    f_es: parseInt(data.scores.f_es || 0),
    f_as: parseInt(data.scores.f_as || 0),
    f_sr: parseInt(data.scores.f_sr || 0),
    f_sa: parseInt(data.scores.f_sa || 0),
    f_in: parseInt(data.scores.f_in || 0),
    f_em: parseInt(data.scores.f_em || 0),
    f_re: parseInt(data.scores.f_re || 0),
    f_ir: parseInt(data.scores.f_ir || 0),
    f_rt: parseInt(data.scores.f_rt || 0),
    f_fl: parseInt(data.scores.f_fl || 0),
    f_ps: parseInt(data.scores.f_ps || 0),
    f_st: parseInt(data.scores.f_st || 0),
    f_ic: parseInt(data.scores.f_ic || 0),
    f_op: parseInt(data.scores.f_op || 0),
    f_ha: parseInt(data.scores.f_ha || 0),
  }
}

function mapToGlasserTestScoresType(data: { [key: string]: any }): GlasserTestScoresType {
  return {
    s: parseInt(data.scores.s || 0),
    p: parseInt(data.scores.p || 0),
    f: parseInt(data.scores.f || 0),
    l: parseInt(data.scores.l || 0),
    fu: parseInt(data.scores.fu || 0),
  }
}

function mapToNeoLongTestScoresType(data: { [key: string]: any }): NeoLongTestScoresType {
  return {
    n1: parseInt(data.scores.n1 || 0),
    e1: parseInt(data.scores.e1 || 0),
    o1: parseInt(data.scores.o1 || 0),
    a1: parseInt(data.scores.a1 || 0),
    c1: parseInt(data.scores.c1 || 0),
    n2: parseInt(data.scores.n2 || 0),
    e2: parseInt(data.scores.e2 || 0),
    o2: parseInt(data.scores.o2 || 0),
    a2: parseInt(data.scores.a2 || 0),
    c2: parseInt(data.scores.c2 || 0),
    n3: parseInt(data.scores.n3 || 0),
    e3: parseInt(data.scores.e3 || 0),
    o3: parseInt(data.scores.o3 || 0),
    a3: parseInt(data.scores.a3 || 0),
    c3: parseInt(data.scores.c3 || 0),
    n4: parseInt(data.scores.n4 || 0),
    e4: parseInt(data.scores.e4 || 0),
    o4: parseInt(data.scores.o4 || 0),
    a4: parseInt(data.scores.a4 || 0),
    c4: parseInt(data.scores.c4 || 0),
    n5: parseInt(data.scores.n5 || 0),
    e5: parseInt(data.scores.e5 || 0),
    o5: parseInt(data.scores.o5 || 0),
    a5: parseInt(data.scores.a5 || 0),
    c5: parseInt(data.scores.c5 || 0),
    n6: parseInt(data.scores.n6 || 0),
    e6: parseInt(data.scores.e6 || 0),
    o6: parseInt(data.scores.o6 || 0),
    a6: parseInt(data.scores.a6 || 0),
    c6: parseInt(data.scores.c6 || 0),
  }
}



export function mapToTest(data: { [key: string]: any }): GenericTestType {
  const scores =  data.type == 'mbti_5' ? mapToMBTI5TestScores(data)
    : data.type == 'mbti' ? mapToMBTITestScores(data) 
    : data.type == 'mii' ? mapToMIITestScores(data)
    : data.type == 'bdi' ? mapToBDITestScoresType(data)
    : data.type == 'bai' ? mapToBAITestScoresType(data)
    : data.type == 'b_a_eqi' ? mapToBAEQITestScoresType(data)
    : data.type == 'glasser' ? mapToGlasserTestScoresType(data)
    : data.type == 'neo_long' ? mapToNeoLongTestScoresType(data)
    : mapToCattelTestScores(data)

  return {
    id: data.id,
    type: data.type,
    get_type_display: typeDict[data.type as typeKeys],
    participant: mapToUser(data.participant),
    title: data.title,
    date: data.date,
    answers: data.answers,
    scores,
  } as GenericTestType;
}