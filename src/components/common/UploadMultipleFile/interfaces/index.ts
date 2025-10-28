export interface IDataUploadFile {
	url: string;
	file: File | null;
	path: string;
}

export interface PropsUploadMultipleFile {
	label?: React.ReactNode | string;
	images: IDataUploadFile[];
	setImages: React.Dispatch<React.SetStateAction<IDataUploadFile[]>>;
	isDisableDelete?: boolean;
	size?: 'small' | 'medium' | 'large';
}
