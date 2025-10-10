export interface PropsLayoutMainPage {
	title: string;
	actions?: React.ReactNode;
	tabs: {
		title: string;
		path: string;
		pathActive?: string;
	}[];
	children: React.ReactNode;
	breadcrumb?: React.ReactNode;
}
