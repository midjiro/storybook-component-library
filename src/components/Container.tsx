import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      {children}
    </main>
  );
};
