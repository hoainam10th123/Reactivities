import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { ActivityFormValues, IActivity } from '../models/activity';
import { PaginatedResult } from '../models/pagination';
import { IPhoto, IProfile, IUserActivity } from '../models/profile';
import { IUser, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve => {
        setTimeout(resolve, delay)
    }))
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async respone => {
    if(process.env.NODE_ENV === 'development') await sleep(1000);
    
    const pagination = respone.headers['pagination'];
    if(pagination){
        respone.data = new PaginatedResult(respone.data, JSON.parse(pagination));
        return respone as AxiosResponse<PaginatedResult<any>>
    }
    return respone;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:       
            /* if (config.method === 'get' && (data as any).errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }     
            if(typeof data === 'string'){
                toast.error(data);
            }  */           
            const dulieu = data as any;
            if(dulieu.errors){
                const modelStateErrors = [];
                for(const key in dulieu.errors){
                    if(dulieu.errors[key]){
                        modelStateErrors.push(dulieu.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }else {
                toast.error(dulieu);
            }
            break;
        case 401:
            toast.error('unauthorised!');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data as any);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<IActivity[]>>('/Activities', {params}).then(responseBody),
    details: (id: string) => requests.get<IActivity>(`/Activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>('/Activities', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/Activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/Activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
    current: () => requests.get<IUser>('/account'),
    login: (user: UserFormValues) => requests.post<IUser>('/account/login', user),
    register: (user: UserFormValues) => requests.post<IUser>('/account/register', user),
    fbLogin: (accessToken: string) => requests.post<IUser>(`/account/fbLogin?accessToken=${accessToken}`, {}),
    refreshToken: () => requests.post<IUser>('/account/refreshToken', {}),
    verifyEmail: (token: string, email: string) => 
        requests.post<void>(`/account/verifyEmail?token=${token}&email=${email}`, {}),
    resendEmailConfirm: (email: string) => 
        requests.get(`/account/resendEmailConfirmationLink?email=${email}`)
}

const Profiles = {
    get: (username: string) => requests.get<IProfile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<IPhoto>('photos', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowings: (username: string, predicate: string) =>
        requests.get<IProfile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) =>
        requests.get<IUserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;