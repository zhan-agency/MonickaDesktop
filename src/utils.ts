import { AssignTestType, ClinicType, JalaliMonthType, SessionType, TestType, TherapistType, UserType, typeKeys } from "./type/monicka";

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
    return `${hours}:${minutes != 0 ? "30" : "00" }`
}

export const BASE_URL = 'https://www.monicka.ir'; //'http://127.0.0.1:8000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function apiCall<T>(
    url: string,
    method: HttpMethod = 'GET',
    body?: Record<string, any>,
): Promise<T> {
    const storedAccess = await (window as any).electronAPI.getToken('access');
    const response = await fetch(BASE_URL+"/api/2.0" + url, {
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
    return sessions.map((session: {[key: string]: any}) => mapToSession(session));
}

export async function getClinics(userId?: number): Promise<ClinicType[]> {
    const sessions = await apiCall<ClinicType[]>(`/clinic/`);
    return sessions.map((clinic: {[key: string]: any}) => mapToClinic(clinic));
}

export async function getAssignTests(userType: number = 3): Promise<AssignTestType[]> {
      const sessions = await apiCall<TestType[]>(`/assign_test/`);
      return sessions.map((test: {[key: string]: any}) => mapToAssignTest(test));    
}

export async function getTests(userType: number = 3): Promise<TestType[]> {
    if (userType == 3) {
      const sessions = await apiCall<TestType[]>(`/test/`);
      return sessions.map((test: {[key: string]: any}) => mapToTest(test));
    }
    const sessions = await apiCall<TestType[]>(`/test/assigned/`);
    return sessions.map((test: {[key: string]: any}) => mapToTest(test));
    
}

export function mapToUser(data: { [key: string]: any }): UserType {
    return {
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        is_authenticated: false,
        is_superuser: false,
        email: "test@email.com",
        get_full_name: data.user.first_name + ' ' + data.user.last_name,
        profile: {
            type: "psy",
            get_type_display: "مراجع",
            get_level_display: "",
            phone: data.phone_number,
        },
        clinics: []
    }
}

export function mapToClinic(data: { [key: string]: any }): ClinicType {
    return {
        id: data.id || 0,
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

export function mapToTest(data: { [key: string]: any }): TestType {
  return {
    id: data.id,
    type: data.type,
    get_type_display: typeDict[data.type as typeKeys],
    participant: mapToUser(data.participant),
    title: data.title,
    date: data.date,
    answers: data.answers
  }
}