import { LegalContent } from "../interfaces/legal-content/legal-content.interface";

export const COOKIE_POLICY: LegalContent = {
  title: 'Cookie Policy',
  lastUpdated: 'July 17, 2025',
  sections: [
    {
      content: 'This Cookie Policy explains what cookies are and how ExpediNap uses them to provide a better experience on our website.'
    },
    {
      title: '1.1 What are Cookies?',
      content: 'Cookies are small text files that websites you visit place on your web browser. They contain information that can be read by the web server that placed them or by third parties in a subsequent visit. They serve to make websites work more efficiently, remember your preferences, or provide information to the site owners.'
    },
    {
      title: '1.2 Types of Cookies We Use and Their Purpose',
      content: 'Although the precise information about all cookies used is constantly updated with our technical team, at ExpediNap we use or plan to use our own and third-party cookies for the following purposes:',
      items: [
        'Technical or Essential Cookies: Necessary for the basic operation of our website, allowing you to browse and use its functions, such as remembering your service selections during a booking session.',
        'Analysis or Performance Cookies: Collect anonymous information about how visitors use our website (e.g., most visited pages, time spent). We use Google Analytics for this purpose to understand user behavior and improve functionality.',
        'Functionality Cookies: Allow the website to remember choices you make (e.g., language) to provide improved and more personal features.',
        'Possible Marketing or Advertising Cookies (Future): In the case of implementing advertising campaigns, we might use cookies to show relevant ads on other websites or measure campaign effectiveness. This will always be done with your consent.'
      ]
    },
    {
      title: '1.3 Duration of Cookies',
      content: 'Cookies can be categorized based on their lifespan:',
      items: [
        'Session Cookies: Remain on your device only while your browser is open and are automatically deleted when you close it.',
        'Persistent Cookies: Remain on your device for a set period, even after closing the browser, to remember your preferences for future visits.'
      ]
    },
    {
      title: '1.4 Consent and Cookie Management',
      content: 'When you visit our website for the first time, we will inform you about the use of cookies through a consent banner. You can manage and change your preferences at any time through your web browser settings, which allow you to:',
      items: [
        'See which cookies you have.',
        'Delete cookies individually or all at once.',
        'Block third-party cookies.',
        'Block cookies from specific sites.',
        'Block all cookies.'
      ]
    },
    {
      title: '1.5 Links to Third-Party Policies',
      content: 'Since we use third-party services that may install cookies, we recommend reviewing their own privacy and cookie policies. This includes:',
      items: [
        'Google (Google Analytics): Google Privacy Policy'
      ]
    }
  ]
};

export const PRIVACY_POLICY: LegalContent = {
  title: 'Privacy Policy',
  lastUpdated: 'July 17, 2025',
  sections: [
    {
      content: 'At ExpediNap, we take our users\' privacy very seriously. This policy describes how we collect, use, protect, and share your personal information and how you can exercise your rights. By using our services, you agree to the practices described in this policy.'
    },
    {
      title: '1.1 Information We Collect',
      content: 'At ExpediNap, we collect different types of information to provide our excursion booking, transportation, and yacht rental services:',
      items: [
        'Direct Information: When you make a reservation or contact us, we collect: Full name, email address, phone number, and country of residence.',
        'Booking Data: Travel dates, hotel name, room number (to coordinate pickups and avoid errors), arrival/departure airport, and pickup/drop-off destination.',
        'Reviews and Comments: If you choose to share them with us after your excursion or service.',
        'Payment Information: Details needed to process transactions through external platforms (currently PayPal or direct bank transfers). We do not directly store sensitive credit card data on our platform.',
        'Automatic Information: While browsing, we collect your IP address, device type, operating system, browser type, pages visited, and time spent on the site through tools like Google Analytics.'
      ]
    },
    {
      title: '1.2 Purposes of Data Usage',
      content: 'We use the collected information for the following purposes:',
      items: [
        'Process and manage your bookings: Confirm services and coordinate with excursion and transport providers.',
        'Communication and customer support: Send confirmations, updates, and respond to your requests.',
        'Improvement of user experience: Analyze site usage to optimize navigation and personalize service recommendations.',
        'Security and fraud prevention: Protect the integrity of our website and our users.',
        'Accounting and legal purposes: Maintain records to comply with tax and legal obligations.'
      ]
    },
    {
      title: '1.3 Data Protection',
      content: 'Security is a priority at ExpediNap. We implement measures such as:',
      items: [
        'SSL Encryption (Secure Sockets Layer): Our website uses an SSL certificate to encrypt communication between your browser and our server.',
        'Secure Payment Platforms: We redirect to reputable external platforms (like PayPal) or use direct bank transfers. We do not store sensitive banking data.',
        'Restricted Access: Personal information is limited only to authorized ExpediNap personnel who need it to provide the service.'
      ]
    },
    {
      title: '1.4 User Rights',
      content: 'You have the right to access, rectify, delete (under certain conditions), limit, or oppose the processing of your data. You can also request data portability.',
      items: [
        'To exercise these rights, contact us at info@expedinap.com.',
        'Data Deletion Process: Send an email to info@expedinap.com with the subject "Data Deletion Request". We will process it promptly, keeping only what is legally or accounting-wise required.'
      ]
    },
    {
      title: '1.5 Data Retention',
      content: 'We retain your data for as long as necessary to provide the service and support. Additionally, we may keep it longer for accounting, legal, and tax purposes. Client lists are managed in internal files and kept indefinitely for historical and legal records, with access restricted to authorized personnel only.'
    },
    {
      title: '1.6 Involved Third Parties',
      content: 'To provide our services, we share necessary information with trusted third parties:',
      items: [
        'Web Analysis Services: We use Google Analytics to understand user interaction (collected anonymously).',
        'Service Providers: We share essential data (name, dates, hotel/location) with direct providers of excursions, transport, and yacht services exclusively to coordinate and provide the booked service.'
      ]
    },
    {
      title: '1.7 Contact for Privacy Policy',
      content: 'For any questions or requests regarding this policy or your data handling, please contact us at:',
      items: [
        'Email: info@expedinap.com'
      ]
    },
    {
      title: '1.8 Policy Updates',
      content: 'ExpediNap reserves the right to update or modify this policy at any time. We will notify you of substantial changes by posting the updated policy on our website with a new "Last updated" date.'
    }
  ]
};

export const CANCELLATION_POLICY: LegalContent = {
  title: 'Cancellation & Refund Policy',
  lastUpdated: 'July 17, 2025',
  sections: [
    {
      title: '1.1 Customer Cancellations',
      content: 'We understand that plans can change. Our refund policy is based on how far in advance you notify us:',
      items: [
        'Cancellations more than 48 hours before the service: 100% refund.',
        'Cancellations between 24 and 48 hours before the service: 50% refund.',
        'Cancellations less than 24 hours before the service or "No Show": No refund will be provided.',
        'Private Yacht Charters: Due to the nature of these services, cancellations must be made 72 hours in advance for a full refund.'
      ]
    },
    {
      title: '1.2 Weather Conditions',
      content: 'Safety is our priority. In case of bad weather (officially declared by the Coast Guard or local authorities):',
      items: [
        'We will first attempt to reschedule the activity for another date during your stay.',
        'If rescheduling is not possible, a 100% refund will be issued.'
      ]
    },
    {
      title: '1.3 Changes and Modifications',
      content: 'If you need to change the date or time of your booking, please contact us at least 24 hours in advance. Changes are subject to availability.'
    }
  ]
};

export const TERMS_CONDITIONS: LegalContent = {
  title: 'Terms and Conditions',
  lastUpdated: 'July 17, 2025',
  sections: [
    {
      title: '1.1 Acceptance of Terms',
      content: 'By accessing our website and booking our services, you agree to comply with these terms and conditions. These terms apply to all excursions, private yacht rentals, and transportation services provided by ExpediNap.'
    },
    {
      title: '1.2 Booking and Payments',
      content: 'Reservations are confirmed only after payment is processed or a deposit is made (as agreed). Prices are in USD and include local taxes unless otherwise stated.'
    },
    {
      title: '1.3 User Responsibilities',
      content: 'When booking with us, the user agrees to:',
      items: [
        'Provide accurate contact and hotel information for pickups.',
        'Be present at the designated pickup location at the scheduled time (maximum wait time is 10-15 minutes).',
        'Follow the safety instructions of the guides and captains during the activities.',
        'Respect the environment and local regulations (e.g., no littering or touching coral reefs).'
      ]
    },
    {
      title: '1.4 Limitation of Liability',
      content: 'ExpediNap acts as an agent for specialized service providers. While we only work with reputable partners, we are not responsible for personal injuries, property loss, or delays caused by third-party providers or force majeure.'
    },
    {
      title: '1.5 Conduct and Safety',
      content: 'We reserve the right to refuse service to any person under the influence of alcohol or drugs, or whose conduct poses a risk to themselves or others. In such cases, no refund will be issued.'
    }
  ]
};