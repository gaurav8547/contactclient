export class Helper {
    static extractData(res: any) {
        const body = res.json();
        return body || {};
    }

    static handleError(err: any) {
        console.error('An error occurred', err);
        return Promise.reject(err.message || err);
    }
}