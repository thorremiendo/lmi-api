/* eslint-disable prettier/prettier */
export class ResponseDto<T> {
    constructor(
        public success: boolean,
        public data: T,
        public message: string,
    ) { }
}