import md5 from 'md5';
import moment from 'moment';

export function getKeyCert(): {
	time: string;
	keyCert: string;
} {
	const key: string = process.env.NEXT_PUBLIC_KEY_CERT!;
	const time = moment(new Date()).format('MM/DD/YYYY HH:mm:ss');

	return {
		time: time,
		keyCert: md5(`${key}${time}`),
	};
}
