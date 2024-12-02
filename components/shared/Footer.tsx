/**
 * A footer component displaying a brief description of the application.
 *
 * @returns {JSX.Element} A simple footer with application information.
 */
export default function Footer() {
  return (
    <footer className="text-foreground py-8 border-t border-gray-800">
      <div className="max-w-screen-sm mx-auto">
        <p>
          This application analyzes data from Reddit to provide insights into
          tech companies from the perspective of employees and candidates, using
          AI for data processing.
        </p>
        <p>Built with love and technology. ❤️</p>
      </div>
    </footer>
  );
}
