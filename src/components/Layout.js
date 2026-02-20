import { Navbar } from './Navbar';
import { CartDrawer } from './CartDrawer';

export const Layout = (content) => `
  <div class="min-h-screen bg-white flex flex-col">
    ${Navbar()}
    ${CartDrawer()}
    <main class="flex-grow container mx-auto px-4 py-12">
      ${content}
    </main>
  </div>
`;
