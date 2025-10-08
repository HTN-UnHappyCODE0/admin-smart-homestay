export interface PropsStateActive {
	isBox?: boolean;
	stateActive: number;
	isSmall?: boolean;
	listState: {
		state: number;
		text: string;
		backgroundColor?: string;
		textColor?: string;
	}[];
}
