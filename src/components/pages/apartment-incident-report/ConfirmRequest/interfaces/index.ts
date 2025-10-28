export interface PropsConfirmRequest {
	uuidConfirm: string;
	onClose: () => void;
}

export interface IDataUploadFile {
	url: string;
	file: File | null;
	path: string;
}
