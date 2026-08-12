import { StoreProvider, ThemeProvider } from '@/app/providers';
import { AppRouter } from '@/app/router';

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </StoreProvider>
  );
}
