import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ListChecks, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const isMobile = useIsMobile();

  const navLinks = (
    <>
      <Link to="/" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link to="/movements" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground">
        <ListChecks className="h-4 w-4" />
        <span>Movimenti</span>
      </Link>
      <Link to="/transfer" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground">
        <Send className="h-4 w-4" />
        <span>Bonifico</span>
      </Link>
    </>
  );

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Home Banking
        </Link>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <ListChecks className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[200px] sm:w-[240px] p-4 flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <div className="flex flex-col gap-2">
                {navLinks}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex space-x-4">
            {navLinks}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;