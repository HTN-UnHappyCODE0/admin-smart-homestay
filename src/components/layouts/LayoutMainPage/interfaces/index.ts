export interface PropsLayoutMainPage {
	title: string;
	actions?: React.ReactNode;
	tabs: {
		title: string;
		path: string;
		pathActive?: string;
		count?: number;
	}[];
	children: React.ReactNode;
	breadcrumb?: React.ReactNode;
}
