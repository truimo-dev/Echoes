import crypto from 'crypto';

export const sha1 = (obj: any) => {
    const str = JSON.stringify(obj);
    const hash = crypto.createHash('sha1');

    hash.update(str);

    return hash.digest('hex');
}
