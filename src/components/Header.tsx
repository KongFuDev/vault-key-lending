import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Vault Key Lending" className="w-10 h-10 rounded-lg" />
          <div>
            <h1 className="text-xl font-bold">Vault Key Lending</h1>
            <p className="text-xs text-muted-foreground">FHE-Powered NFT Lending</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/gallery" 
            className={`transition-colors ${isActive('/gallery') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Gallery
          </Link>
          <Link 
            to="/lending" 
            className={`transition-colors ${isActive('/lending') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Lending
          </Link>
          <Link 
            to="/privacy" 
            className={`transition-colors ${isActive('/privacy') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Privacy
          </Link>
        </nav>

        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;