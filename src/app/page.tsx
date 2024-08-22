// app/page.tsx or app/home/page.tsx
import dynamic from 'next/dynamic';

// Dynamically import TaskList with SSR disabled
const TaskList = dynamic(() => import('@/components/TaskList'), { ssr: false });

const Home = () => {
  return (
    <div className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
      </h1>

      <div className="grid place-items-center">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
