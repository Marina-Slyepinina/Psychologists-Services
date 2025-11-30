import { AuthProvider } from "./components/AuthProvider/AuthProvider"
import { ThemeProvider } from "./components/context/ThemeContext.tsx"
import { AppRouter } from "./routes/AppRouter"

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
