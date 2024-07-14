import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../components/theme-provider';

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  console.log(`Current theme dssaa: ${theme}`);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log(`Current theme: ${theme}`);
    setTheme(newTheme);
  };

  useEffect(() => {
    console.log(`Theme updated: ${theme}`);
  }, [theme]);

  return (
        <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        style={{
            borderRadius: '50%',
            width: '2.2rem',
            height: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'light' ? 'rgb(30 58 138)' : '#1f2937',
        }}
        >
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all text-white" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
