import axiosClient from '.';

const fileServices = {
	uploadSingleFile: (file: any, purpose: string, encrypt: 'true' | 'false') => {
		const dataFile = new FormData();

		dataFile.append('FileData', file);
		dataFile.append('Purpose', purpose);
		dataFile.append('Encrypt', encrypt);

		return axiosClient.post('/File/upload-single', dataFile, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'text/plain',
			},
		});
	},
	uploadMultilFile: (files: any[], encrypt: 'true' | 'false') => {
		const dataFile = new FormData();

		files.forEach((file) => {
			dataFile.append('FilesData', file);
		});

		dataFile.append('Encrypt', encrypt);

		return axiosClient.post(`/File/upload-multiple`, dataFile, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'text/plain',
			},
		});
	},
};

export default fileServices;
