import {AsyncStorage} from 'react-native';

const kStorageUser = 'kStorageUser';
const kStorageQR = 'kStorageQR';
const kStorageQuan= 'kStorageQuan';
const kStorageAppCartCookieId = 'kStorageAppCartCookieId';




/*QR*/
export const getQR = () => {
    return AsyncStorage.getItem(kStorageQR)
        .then((qr) => {
            if (qr) {
                return JSON.parse(qr);
            } else {
                return null;
            }
        })
        .catch(error => {
             throw null;
        });
};

export const setQR = (qr) => {
    AsyncStorage.setItem(kStorageQR, JSON.stringify(qr));
};

export const getQuan = () => {
    return AsyncStorage.getItem(kStorageQuan)
        .then((quan) => {
            if (quan) {
                return JSON.parse(quan);
            } else {
                return null;
            }
        })
        .catch(error => {
             throw null;
        });
};

export const setQuan = (quan) => {
    AsyncStorage.setItem(kStorageQuan, JSON.stringify(quan));
};
/*END: QR*/


/*USER*/
export const getUser = () => {
    return AsyncStorage.getItem(kStorageUser)
        .then((user) => {
            if (user) {
                return JSON.parse(user);
            } else {
                return null;
            }
        })
        .catch(error => {
             throw null;
        });
};
export const setUser = (user) => {
    AsyncStorage.setItem(kStorageUser, JSON.stringify(user));
};
/*EBD: USER*/


export const getAppCartCookieId = () => {
    return AsyncStorage.getItem(kStorageAppCartCookieId)
        .then((app_cart_cookie_id) => {
            if (app_cart_cookie_id) {
                return app_cart_cookie_id;
            } else {
                return '';
            }
        })
        .catch(error => {
            // console.log(error);
        });
};

export const setAppCartCookieId = (app_cart_cookie_id) => {
    AsyncStorage.setItem(kStorageAppCartCookieId, app_cart_cookie_id);
};
