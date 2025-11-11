export const defaultData = {
	auth: {
		authError: (error: string): { success: false; error: string } => {
			return {
				success: false,
				error,
			};
		},
	},
	contactInitState: {
		success: undefined,
		error: {
			client: [],
			email: [],
			subject: [],
			content: [],
		},
		values: {
			client: '',
			email: '',
			subject: '',
			content: '',
		},
	},
	defaultMLetter: {
		size: 110,
		duration: 1.5,
		colors: ['#38a169', '#facc15', '#38a169'],
		mode: 'animated',
	},
	switchElement: {
		sizes: {
			sm: {
				width: 'w-8',
				height: 'h-4',
				thumb: 'w-3 h-3',
			},
			md: {
				width: 'w-12',
				height: 'h-6',
				thumb: 'w-5 h-5',
			},
			lg: {
				width: 'w-16',
				height: 'h-8',
				thumb: 'w-7 h-7',
			},
		},
	},
	defaultSwipeHand: {
		width: 50,
		height: 50,
	},
	returnedTypeDefault: { success: false, error: '' },
	defaultGA4Metrics: ['eventCount', 'totalUsers', 'averageSessionDuration', 'engagementRate'],
	defaultGA4Dimensions: ['eventName', 'pagePath', 'contentId', 'deviceCategory', 'operatingSystem', 'pageReferrer', 'date', 'country', 'fileExtension'],
	manageImagesDefaultResult: {
		projectId: undefined,
		mainFileName: undefined,
		mainFilesSaved: 0,
		galleryFilesSaved: 0,
		mainFilesDeleted: 0,
		galleryFilesDeleted: 0,
	},
	contactItems: [
		{
			label: 'matej2314',
			pathName: 'https://github.com/matej2314',
			linkClass: 'w-full flex justify-center items-center gap-2',
			itemClass: 'w-fit h-fit flex justify-center gap-4 hover:scale-110 hover:tracking-wider',
			iconName: 'mdi:github',
		},
		{
			label: 'mateusz-mateo2314-sliwowski',
			pathName: 'https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/',
			linkClass: 'w-full flex justify-center gap-2',
			itemClass: 'w-fit h-fit flex justify-center gap-4 hover:scale-110 hover:tracking-wider',
			iconName: 'skill-icons:linkedin',
		},
		{
			label: 'mateo2314@gmail.com',
			pathName: 'mailto:mateo2314@gmail.com',
			linkClass: 'w-full flex justify-center gap-2',
			itemClass: 'w-fit h-fit flex justify-center gap-4 hover:scale-110 hover:tracking-wider',
			iconName: 'ic:outline-email',
		},
	],
	langOptions: [
		{ label: 'Polski', value: 'pl', ariaLabel: 'Polski' },
		{ label: 'English', value: 'en', ariaLabel: 'English' },
	],
	homeSubHeaderValues: {
		typingSpeed: 100,
		deletingSpeed: 60,
		pauseTime: 1000,
	},
	baseSectionSubHeader: {
		content: ['FullStack Web Developer', 'Security enthusiast', 'Ready to work!'],
		typingSpeed: 100,
		deletingSpeed: 60,
		pauseTime: 1000,
	},
};
