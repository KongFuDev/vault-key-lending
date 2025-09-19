import { Shield, Lock, Eye } from "lucide-react";

const VaultFooter = () => {
  return (
    <footer className="relative bg-gradient-card border-t border-border mt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-vault opacity-5 animate-vault-shimmer bg-[length:200%_200%]"></div>
      
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Vault Animation Column */}
          <div className="text-center">
            <div className="relative mb-6 mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-gradient-vault opacity-20 animate-glow-pulse"></div>
              <div className="relative w-full h-full rounded-full border-2 border-vault-gold/30 flex items-center justify-center animate-float">
                <Shield className="w-10 h-10 text-vault-gold" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Vault</h3>
            <p className="text-muted-foreground">
              Your NFTs are protected by military-grade encryption and stored in our secure digital vault.
            </p>
          </div>

          {/* Privacy Column */}
          <div className="text-center">
            <div className="relative mb-6 mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-gradient-glow opacity-20 animate-encrypt-glow"></div>
              <div className="relative w-full h-full rounded-full border-2 border-primary/30 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                <Lock className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Private Lending</h3>
            <p className="text-muted-foreground">
              Loan amounts and appraisals remain encrypted, ensuring complete privacy for all transactions.
            </p>
          </div>

          {/* Transparency Column */}
          <div className="text-center">
            <div className="relative mb-6 mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 animate-glow-pulse"></div>
              <div className="relative w-full h-full rounded-full border-2 border-accent/30 flex items-center justify-center animate-float" style={{ animationDelay: '4s' }}>
                <Eye className="w-10 h-10 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Transparent Process</h3>
            <p className="text-muted-foreground">
              While maintaining privacy, our lending process remains fully transparent and auditable.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-gradient-vault animate-glow-pulse"></div>
              <span className="text-sm text-muted-foreground">
                © 2024 NFT Vault. Confidential lending secured by encryption.
              </span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default VaultFooter;