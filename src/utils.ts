import { ClinicType, JalaliMonthType, SessionType, TherapistType, UserType } from "./type/monicka";

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

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function apiCall<T>(
    url: string,
    method: HttpMethod = 'GET'
): Promise<T> {
    const response = await fetch("https://www.monicka.ir/schedule/api/2.0" + url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'monicka-api-key': '433e57db-8cba-418f-9ee9-ade923713284'
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export async function getSessions(userId?: number): Promise<SessionType[]> {
    const sessions = await apiCall<SessionType[]>(`/session/comming/`);
    return sessions.map((session: {[key: string]: any}) => mapToSession(session));
}

export async function getClinics(userId?: number): Promise<ClinicType[]> {
    const sessions = await apiCall<SessionType[]>(`/clinic/`);
    return sessions.map((clinic: {[key: string]: any}) => mapToClinic(clinic));
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