import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text, Button } from '@react-email/components';
import { ContactObject } from '@/types/forms/contactFormTypes';

interface ContactMessageEmailProps {
	data: ContactObject;
}

export const ContactMessageEmail = ({ data }: ContactMessageEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Nowa wiadomość kontaktowa - {data.subject}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={header}>
						<Heading style={headerTitle}>Nowa wiadomość kontaktowa</Heading>
						<Text style={headerSubtitle}>Data wysłania: {new Date().toLocaleString('pl-PL')}</Text>
					</Section>

					<Section style={content}>
						<Section style={field}>
							<Text style={fieldLabel}>👤 Nadawca:</Text>
							<Text style={fieldValue}>{data.client}</Text>
						</Section>

						<Section style={field}>
							<Text style={fieldLabel}>📧 Adres e-mail:</Text>
							<Text style={fieldValue}>{data.email}</Text>
						</Section>

						<Section style={field}>
							<Text style={fieldLabel}>📝 Temat:</Text>
							<Text style={fieldValue}>{data.subject}</Text>
						</Section>

						<Section style={field}>
							<Text style={fieldLabel}>💬 Treść wiadomości:</Text>
							<Section style={contentField}>
								<Text style={contentText}>{data.content}</Text>
							</Section>
						</Section>
					</Section>

					<Hr style={hr} />

                    <Section style={footer}>
                    <Button href={`mailto:${data.email}`} style={replyButton}>Odpowiedz</Button>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

// Styles
const main = {
	backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
    height: 'fit-content',
    width: 'fit-content',
    maxWidth: '700px',
    maxHeight: '900px',
};

const container = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	maxWidth: '700px',
	borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    paddingBottom: '20px',
};

const header = {
	backgroundColor: '#0c0c0c',
	color: '#ffffff',
	padding: '20px',
	
};

const headerTitle = {
	margin: '0',
	fontSize: '24px',
    color: '#ffffff',
    textWrap: 'nowrap' as const,
};

const headerSubtitle = {
	margin: '5px 0 0 0',
	opacity: 0.9,
	color: '#ffffff',
};

const content = {
	padding: '0',
};

const field = {
    width: '100%',
	marginBottom: '20px',
    display: 'flex',
    flexDirection: 'row' as const,
};

const fieldLabel = {
	fontWeight: 'bold',
	color: '#555',
	marginBottom: '5px',
	display: 'block',
};

const fieldValue = {
	backgroundColor: '#f8f9fa',
	padding: '12px',
	borderRadius: '4px',
	margin: '5px 0 0 0',
};

const contentField = {
	backgroundColor: '#f8f9fa',
	padding: '15px',
	borderRadius: '4px',
	marginTop: '5px',
};

const contentText = {
	margin: '0',
	whiteSpace: 'pre-wrap' as const,
};

const hr = {
	borderColor: '#e5e7eb',
	margin: '15px 0',
};

const footer = {
	marginTop: '30px',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const replyButton = {
    backgroundColor: 'oklch(90.5% 0.182 98.111)',
    color: '#0f172b',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 10px',
}
