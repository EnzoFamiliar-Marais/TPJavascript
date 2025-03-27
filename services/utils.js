const Utils = {
    parseRequestURL: () => { 
        let url = location.hash.slice(1).toLowerCase() || '/';
        if (url.includes('?')) {
            url = url.split('?')[0];
        }
        
        let r = url.split("/");
        let request = {
            resource: null,
            id: null,
            verb: null
        };
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];
        return request;
    },
    
    getUrlParams: () => {
        const hash = location.hash;
        if (hash.includes('?')) {
            const paramsString = hash.split('?')[1];
            return new URLSearchParams(paramsString);
        }
        return new URLSearchParams();
    }
}

export default Utils;
