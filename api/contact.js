const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WORK_ARRANGEMENTS = new Set([
    '',
    'fulltime-8h',
    'called-when-needed',
    'self-directed-results',
    'discuss'
]);
const SERVICES = new Set([
    '',
    'data-extraction',
    'setting-out',
    'as-built-measurements',
    'network-measurements',
    'control-measurements',
    'machine-control-modeling',
    'quantity-calculation',
    'drone-surveys',
    'documentation-payment-certificates',
    'other'
]);
const SERVICE_LABELS = {
    'data-extraction': 'Data Extraction from Designs and Models',
    'setting-out': 'Setting Out',
    'as-built-measurements': 'As-Built Measurements',
    'network-measurements': 'Network Measurements',
    'control-measurements': 'Control Measurements',
    'machine-control-modeling': '3D Modeling for Machine Control',
    'quantity-calculation': 'Quantity Calculation',
    'drone-surveys': 'Drone Surveys & Stockpile Volumes',
    'documentation-payment-certificates': 'Documentation & Payment Certificates',
    other: 'Other / not sure yet'
};
const SWEDISH_SERVICE_LABELS = {
    'data-extraction': 'Utsättningsdata från ritningar och modeller',
    'setting-out': 'Utsättning',
    'as-built-measurements': 'Relationsmätningar',
    'network-measurements': 'Nätverksmätningar',
    'control-measurements': 'Kontrollmätningar',
    'machine-control-modeling': '3D-modellering för maskinstyrning',
    'quantity-calculation': 'Mängdberäkning',
    'drone-surveys': 'Drönarmätning och volymberäkning av upplag',
    'documentation-payment-certificates': 'Dokumentation och betalningsunderlag',
    other: 'Annat / osäker ännu'
};

function sendJson(res, status, body) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(body));
}

function localizedMessage(lang, english, swedish) {
    return lang === 'sv' ? swedish : english;
}

function readField(value) {
    return typeof value === 'string' ? value.trim() : '';
}

module.exports = async function contactHandler(req, res) {
    const lang = req.body && req.body.lang === 'sv' ? 'sv' : 'en';

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return sendJson(res, 405, {
            message: localizedMessage(lang, 'Use the contact form to send an enquiry.', 'Använd kontaktformuläret för att skicka en förfrågan.')
        });
    }

    const origin = req.headers.origin;
    const requestHost = req.headers.host;
    if (origin && requestHost) {
        let originHost;
        try {
            originHost = new URL(origin).host;
        } catch {
            return sendJson(res, 403, { message: localizedMessage(lang, 'This request could not be verified.', 'Begäran kunde inte verifieras.') });
        }
        if (originHost.toLowerCase() !== requestHost.toLowerCase()) {
            return sendJson(res, 403, { message: localizedMessage(lang, 'This request could not be verified.', 'Begäran kunde inte verifieras.') });
        }
    }

    const data = req.body && typeof req.body === 'object' ? req.body : {};
    if (readField(data.website)) {
        return sendJson(res, 400, { message: localizedMessage(lang, 'Please leave the verification field empty.', 'Lämna verifieringsfältet tomt.') });
    }

    const name = readField(data.name);
    const email = readField(data.email);
    const phone = readField(data.phone);
    const company = readField(data.company);
    const workArrangement = readField(data.work_arrangement);
    const service = readField(data.service);
    const message = readField(data.message);

    if (
        name.length < 2 || name.length > 120 ||
        email.length > 254 || !EMAIL_PATTERN.test(email) ||
        phone.length > 50 || company.length > 150 ||
        workArrangement.length > 50 || service.length > 80 ||
        message.length < 10 || message.length > 4000 ||
        /[\r\n]/.test(email)
    ) {
        return sendJson(res, 400, {
            message: localizedMessage(lang, 'Please check your name, email address and project details, then try again.', 'Kontrollera namn, e-postadress och projektbeskrivning och försök igen.')
        });
    }
    if (!WORK_ARRANGEMENTS.has(workArrangement) || !SERVICES.has(service)) {
        return sendJson(res, 400, {
            message: localizedMessage(lang, 'Please select a valid option and try again.', 'Välj ett giltigt alternativ och försök igen.')
        });
    }
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !from) {
        console.error('Contact email delivery is not configured.');
        return sendJson(res, 503, {
            message: localizedMessage(
                lang,
                'The contact form is temporarily unavailable. Please email info@infinitymk.se.',
                'Kontaktformuläret är tillfälligt otillgängligt. Mejla info@infinitymk.se.'
            )
        });
    }

    const workLabels = {
        '': 'Not specified',
        'fulltime-8h': 'Full-time (8h/day)',
        'called-when-needed': 'On call / as needed',
        'self-directed-results': 'Self-directed, delivery of results',
        discuss: 'Not sure yet / Let’s discuss'
    };
    const workLabelsSv = {
        '': 'Ej angivet',
        'fulltime-8h': 'Heltid (8 h/dag)',
        'called-when-needed': 'Vid behov',
        'self-directed-results': 'Egen planering med leverans av resultat',
        discuss: 'Osäker ännu / Låt oss prata'
    };
    const serviceLabels = lang === 'sv' ? SWEDISH_SERVICE_LABELS : SERVICE_LABELS;
    const emailText = [
        localizedMessage(lang, 'New website enquiry', 'Ny förfrågan via webbplatsen'),
        '',
        `${localizedMessage(lang, 'Name', 'Namn')}: ${name}`,
        `${localizedMessage(lang, 'Email', 'E-post')}: ${email}`,
        `${localizedMessage(lang, 'Phone', 'Telefon')}: ${phone || localizedMessage(lang, 'Not provided', 'Ej angivet')}`,
        `${localizedMessage(lang, 'Company', 'Företag')}: ${company || localizedMessage(lang, 'Not provided', 'Ej angivet')}`,
        `${localizedMessage(lang, 'Desired working arrangement', 'Önskat arbetssätt')}: ${lang === 'sv' ? workLabelsSv[workArrangement] : workLabels[workArrangement]}`,
        `${localizedMessage(lang, 'Service', 'Tjänst')}: ${serviceLabels[service] || localizedMessage(lang, 'Not specified', 'Ej angivet')}`,
        '',
        localizedMessage(lang, 'Project details:', 'Projektbeskrivning:'),
        message
    ].join('\n');

    try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from,
                to: ['info@infinitymk.se'],
                reply_to: email,
                subject: `${localizedMessage(lang, 'Website enquiry', 'Webbförfrågan')}: ${serviceLabels[service] || localizedMessage(lang, 'General enquiry', 'Allmän förfrågan')}`,
                text: emailText
            })
        });

        if (!resendResponse.ok) {
            console.error('Resend rejected contact email with status:', resendResponse.status);
            return sendJson(res, 502, {
                message: localizedMessage(
                    lang,
                    'We could not send your enquiry right now. Please email info@infinitymk.se.',
                    'Det gick inte att skicka förfrågan just nu. Mejla info@infinitymk.se.'
                )
            });
        }

        return sendJson(res, 200, { ok: true });
    } catch (error) {
        console.error('Contact email delivery request failed:', error);
        return sendJson(res, 502, {
            message: localizedMessage(
                lang,
                'We could not send your enquiry right now. Please email info@infinitymk.se.',
                'Det gick inte att skicka förfrågan just nu. Mejla info@infinitymk.se.'
            )
        });
    }
};
