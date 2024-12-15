# Reddit Based Glassdoor

Reddit Based Glassdoor aggregates and analyzes Reddit discussions to provide insights into the tech industry and companies.

- **Live Application:** [https://reddit-based-glassdoor.vercel.app/](https://reddit-based-glassdoor.vercel.app/)
- **Documentation:** [https://reddit-based-glassdoor.vercel.app/docs](https://reddit-based-glassdoor.vercel.app/docs)

## About the website

This website leverages Reddit API and OpenAI API to collect and analyze data from Reddit posts and comments about the tech industry and its companies. The website provides users with:

1. **Industry Overview**: A summary of the tech industry with sentiment analysis, frequently mentioned terms and a list of Reddit posts used for the analysis.

2. **Company Insights**:

   - Company-specific data such as founding year, number of employees, estimated revenue and website.
   - Sentiment analysis and summary tailored for each company.
   - A list of Reddit posts used for the analysis.

3. **Admin Panel**: Functionalities for adding, editing, and deleting company information.

## Built With

The application uses the following technologies and tools:

- **Frontend**: Next.js, TypeScript, Tailwind CSS, ShadCN.
- **Backend**: Firebase/Firestore.
- **Testing**: Jest, Cypress.
- **Form Handling**: React Hook Form, Zod.
- **APIs**: Reddit API, OpenAI API.
- **Documentation**: TypeDoc.

## Getting Started

1.  Clone the repository:
    `git clone https://github.com/ddzenan/reddit-based-glassdoor.git`
2.  Navigate to the project directory:
    `cd reddit-based-glassdoor`
3.  Install dependencies:
    `npm install`
4.  Configure your environment variables.
5.  Start the development server:
    `npm run dev`
6.  Open your browser and visit `http://localhost:3000` to view the website.
