declare var fetch: any;
declare var Request: any;
declare var Headers: any;
// use fetch for all API calls
const doFetch = (url: string): Promise<any> => {
    return fetch(url)
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        });
};

const doPost = function <T>(url: string, data: T): Promise<any> {
    const request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        })
    });
    return fetch(request).then(response => {
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }
        return response.json();
    });
};

const doPut = function <T>(url: string, data: T): Promise<any> {
    const request = new Request(url, {
        method: 'PUT',
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        })
    });
    return fetch(request).then(response => {
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }
        return response.json();
    });
};

const doDelete = function <T>(url: string, data: T): Promise<any> {
    const request = new Request(url, {
        method: 'DELETE',
        mode: 'cors',
        redirect: 'follow'
    });
    return fetch(request).then((response: Response) => {
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }
        return response.text();
    });
};

export {
    doFetch,
    doPost,
    doPut,
    doDelete
}