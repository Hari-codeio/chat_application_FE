import './App.css';
import { AppRouter } from './Router/appRouter';
export const App = () => {
  return (
    <>
      <div className="home">
        <AppRouter />
      </div>
    </>
  );
}