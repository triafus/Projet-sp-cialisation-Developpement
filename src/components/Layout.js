import { Navbar } from './Navbar';
import { CartDrawer } from './CartDrawer';

export const Layout = (content) => `
  <div class="min-h-screen bg-slate-50 flex flex-col">
    ${Navbar()}
    ${CartDrawer()}
    <main class="flex-grow container mx-auto p-6">
      ${content}
    </main>
  </div>
`;
