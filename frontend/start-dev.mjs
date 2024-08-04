import { execSync } from 'child_process';
import getPort from 'get-port';

(async () => {
  try {
    // Get the network IP address of the machine
    const ip = execSync('ipconfig getifaddr en0').toString().trim();

    // Function to find an available port within a range
    const getAvailablePort = async (start, end) => {
      const portsInUse = [];
      for (let port = start; port <= end; port++) {
        try {
          const availablePort = await getPort({ port });
          if (availablePort === port) {
            return { port, portsInUse };
          } else {
portsInUse.push(port);
}
        } catch (error) {
         console.log(error)
        }
      }
      throw new Error(`No available ports found in range ${start}-${end}`);
    };

    // Get an available port in the range 3000-3100
    const { port, portsInUse } = await getAvailablePort(3000, 3100);

    if (portsInUse.length > 0) {
      console.log(`🚧 Ports in use: ${portsInUse.join(', ')}`);
    }
    console.log(`Starting server at http://${ip}:${port}`);

    // Set environment variables
    process.env.HOST = ip;
    process.env.PORT = port;

    // Start the Next.js development server
    execSync(`next dev -H ${ip} -p ${port}`, { stdio: 'inherit', env: { ...process.env, HOST: ip, PORT: port } });
  } catch (error) {
    console.error('Failed to start development server:', error.message);
  }
})();