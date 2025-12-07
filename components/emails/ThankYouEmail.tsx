import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';

interface ThankYouEmailProps {
	clientName: string;
}

export const ThankYouEmail = ({ clientName }: ThankYouEmailProps) => {
	return (
		<Html style={html}>
			<Head />
			<Preview>Dziękujemy za kontakt - {clientName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={content}>
						<Text style={greeting}>Witaj {clientName},</Text>

						<Text style={paragraph}>Dziękuję za wiadomość wysłaną przez formularz kontaktowy na mojej stronie internetowej. Przeanalizuję ją i postaram się odpowiedzieć jak najszybciej.</Text>

						<Text style={paragraph}>Zwykle odpowiadam w ciągu 24-48 godzin. Jeśli Twoja sprawa jest pilna, zachęcam do bezpośredniego kontaktu.</Text>

						
						<Section style={SignatureSection}>
							<Text>
								Z poważaniem,
								<br />
								Mateusz Sliwowski
								<br />
								mateo2314@msliwowski.net
							</Text>
						</Section>
					</Section>

					<Section style={footer}>
						<Text style={footerText}>Ta wiadomość została wysłana automatycznie. Proszę nie odpowiadać na ten e-mail.</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

// Styles

const html = {
	height: 'fit-content',
	width: 'fit-content',
	maxWidth: '1200px',
	display: 'flex',
	flexDirection: 'column' as const,
	alignItems: 'center' as const,
	justifyContent: 'center' as const,
	padding: '15px 30px',
};
const main = {
	backgroundColor: '#0c0c0c',
	fontFamily: 'Arial, sans-serif',
	height: 'fit-content',
};

const container = {
	backgroundColor: '##0c0c0c',
	margin: '0 auto',
	padding: '30px 0 0 30',
	maxWidth: '600px',
	borderRadius: '8px',
	boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const content = {
	padding: '0',
};

const greeting = {
	fontSize: '16px',
	fontWeight: 'bold',
	color: '#ffffff',
	marginBottom: '15px',
};

const paragraph = {
	fontSize: '16px',
	lineHeight: '1.6',
	color: 'oklch(96.8% 0.007 247.896)',
	marginBottom: '15px',
};

const footer = {
	marginTop: '30px',
	paddingTop: '20px',
	borderTop: '1px solid #e5e7eb',
};

const footerText = {
	fontSize: '12px',
	color: '#6b7280',
	textAlign: 'center' as const,
	margin: '5px 0',
};

const SignatureSection = {
	backgroundColor: '#0c0c0c',
	color: '#ffffff',
	padding: '20px',
	borderRadius: '8px 8px 0 0',
	margin: '-30px -30px 30px -30px',
}
