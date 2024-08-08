const getDefaultHeaderData = () => {
    let data = {
        timeStamp: new Date().getTime(),
        brand: "Dynamic Form",
    };
    return data;
};

const updatedheader = (headers) => {
    const defaultHeaders = getDefaultHeaderData();
    return { ...defaultHeaders, ...headers }
}

const fetchApiInstance = (url, { headers = {}, params = {}, body, method }) => {

    const defaultHeaders = getDefaultHeaderData();
    const udpatedHeaders = { ...defaultHeaders, headers };

    return new Promise((resolve, reject) => {
        fetch(url, { headers: udpatedHeaders, params, body, method })
            .then((response) => {
                return response.json()
            }).then(response => {
                resolve(response)
            }).catch((error) => {
                //log error into file for tracking
                resolve(error)
            });
    })
}

export const getDataFromService = async (props) => {
    const { url, header = {}, params = {} } = props;
    return new Promise(async (resolve, reject) => {
        try {
            fetchApiInstance(url, {
                method: 'get',
                params: params,
                headers: header
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error)
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const postDataFromService = async (props) => {
    const { url, header = {}, params = {}, data = {} } = props
    return new Promise(async (resolve, reject) => {
        try {
            fetchApiInstance(url, {
                method: 'post',
                params: params,
                headers: updatedheader(header),
                body: JSON.stringify(data)
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error.response)
            });

        } catch (error) {
            resolve(error)
        }
    });
}

export const deleteDataFromService = async (props) => {
    const { url, header = {}, params = {}, data = {} } = props
    return new Promise(async (resolve, reject) => {
        try {
            fetchApiInstance(url, {
                method: 'delete',
                params: params,
                headers: updatedheader(header),
                body: JSON.stringify(data)
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                resolve(error.response)
            });

        } catch (error) {
            resolve(error)
        }
    });
}
