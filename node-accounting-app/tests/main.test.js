// TC-4.1: Exit the Application
// This tests that choosing option 4 prints the exit message and terminates.

const { execSync } = require('child_process');
const path = require('path');

test('TC-4.1: selecting option 4 exits with goodbye message', () => {
  // Pipe "4\n" as stdin to main.js
  const result = execSync('echo "4" | node main.js', {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf-8',
    timeout: 5000,
  });
  expect(result).toContain('Exiting the program. Goodbye!');
});
