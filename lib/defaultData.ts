import { type ContactChannelItem } from '@/types/contactChannelTypes';
import { type FloatingContactData} from '@/types/floatingContactTypes';

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
		duration: 1.1,
		colors: ['#242424', '#f2d768', '#f0d360', '#ffda45', '#facc15'],
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
	defaultGA4Dimensions: [
		'eventName',
		'pagePath',
		'contentId',
		'deviceCategory',
		'operatingSystem',
		'pageReferrer',
		'date',
		'country',
		'fileExtension',
	],
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
			kind: 'email',
			label: 'mateo2314@gmail.com',
			pathName: 'mailto:mateo2314@gmail.com',
		},
		{
			kind: 'linkedin',
			label: 'mateusz-mateo2314-sliwowski',
			pathName: 'https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/',
		},
		{
			kind: 'github',
			label: 'matej2314',
			pathName: 'https://github.com/matej2314',
		},
	] satisfies ContactChannelItem[],
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
		content: ['Node.js', 'React', 'Next.js', 'WordPress'],
	},
	floatingBoxesData: {
		photoSrc: '/profilowe.jpg',
		fullName: 'Mateusz Śliwowski',
		contactRows: [
			{
				kind: 'email',
				icon: 'mdi:email-outline',
				href: 'mailto:mateo2314@gmail.com',
				value: 'mateo2314@gmail.com',
			},
			{
				kind: 'phone',
				icon: 'mdi:phone',
				href: 'tel:+48507365489',
				value: '+48 507 365 489',
			},
			{
				kind: 'location',
				icon: 'mdi:map-marker-radius-outline',
				value: 'Warsaw, Białystok, Wysokie Mazowieckie, Poland',
			},
		],
		socialLinks: [
			{
				kind: 'linkedin',
				icon: 'mdi:linkedin',
				href: 'https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/',
				value: 'mateusz-mateo2314-sliwowski',
			},
			{
				kind: 'github',
				icon: 'mdi:github',
				href: 'https://github.com/matej2314',
				value: 'matej2314',
			},
			{
				kind: 'facebook',
				icon: 'mdi:facebook',
				href: 'https://www.facebook.com/mateusz.mateo2314.sliwowski',
				value:'Facebook',
			}
		],
		config: {
			accent: '#ffdb70',
			cardBg: '#1e1e1f',
			border: '#383838',
			contactBoxWidth: 'w-[min(20rem,calc(100vw-3rem))]',
			chatBoxWidth: 'w-[min(25rem,calc(100vw-3rem))]',
			enterDurationBox: 0.72,
			showDelayContactBox: 2,
			showDelayChatBox: 2.5,
			calcTuckDuration: (reduced: boolean) => reduced ? 0 : 0.38,
			calcPanelDuration: (reduced: boolean) => reduced ? 0 : 0.5,
			calcRevealDuration: (reduced: boolean) => reduced ? 0 : 0.42,
		}
	} satisfies FloatingContactData,
};
