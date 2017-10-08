/**
 * Created by eugen.cotiga on 20/06/17.
 */

class HRService {
    loadObjects = (url) => {
        return fetch(url).then(result=> result.json());
    }

    saveObject = (url, object) => {
        console.log(JSON.stringify(object));
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
    }
}

export default HRService;
