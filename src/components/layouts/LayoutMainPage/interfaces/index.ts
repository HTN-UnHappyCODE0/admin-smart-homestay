export interface PropsLayoutMainPage {
	title: string;
	actions: React.ReactNode;
	tabs: {
		title: string;
		path: string;
	}[];
	children: React.ReactNode;
}
