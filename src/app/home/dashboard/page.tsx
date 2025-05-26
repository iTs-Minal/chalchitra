import { Sidebar } from './components/sidebar';
import { StatsHeader } from './components/statsheader';
// import { MovieTable } from './components/movie-table';
// import { Charts } from './components/charts';
import Navbar from '@/components/homePage/navbar';
import TableChart from './components/table-chart';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-neutral-950 text-gray-900 dark:text-white">
     <div className='flex flex-col items-center justify-center w-full'>
        <Navbar/>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-zinc-800 border-r dark:border-zinc-700">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-4 space-y-6">
          <StatsHeader />
          <TableChart/>
        </section>
      </div>
    </main>
  );
}
