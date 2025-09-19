import Header from "@/components/Header";
import VaultFooter from "@/components/VaultFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Clock, DollarSign } from "lucide-react";

const Lending = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-6 animate-glow-pulse">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">NFT Collateralized Lending</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Instant Liquidity
              </span>
              <br />
              <span className="bg-gradient-glow bg-clip-text text-transparent animate-glow-pulse">
                Zero Compromises
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Get instant loans against your NFT portfolio while maintaining complete privacy. 
              Our encrypted valuation system ensures your assets and loan details remain confidential.
            </p>
            
            <Button size="lg" className="bg-gradient-glow text-background font-semibold px-8 py-4 rounded-lg shadow-glow">
              Start Lending Process
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8 text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4 animate-glow-pulse" />
              <h3 className="text-xl font-bold mb-3">Competitive Rates</h3>
              <p className="text-muted-foreground">
                Get the best loan rates in the market with our AI-powered valuation system.
              </p>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8 text-center">
              <Clock className="w-12 h-12 text-accent mx-auto mb-4 animate-glow-pulse" />
              <h3 className="text-xl font-bold mb-3">Instant Approval</h3>
              <p className="text-muted-foreground">
                Automated loan approval process takes less than 5 minutes from start to finish.
              </p>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4 animate-encrypt-glow" />
              <h3 className="text-xl font-bold mb-3">Asset Protection</h3>
              <p className="text-muted-foreground">
                Your NFTs remain in your wallet throughout the entire loan process.
              </p>
            </Card>
          </div>

          {/* Loan Terms */}
          <div className="bg-card/20 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Lending Terms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2 animate-glow-pulse">50-70%</div>
                <div className="text-sm text-muted-foreground">Loan-to-Value Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2 animate-glow-pulse">5.9%</div>
                <div className="text-sm text-muted-foreground">Starting APR</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">30-365</div>
                <div className="text-sm text-muted-foreground">Days Term Length</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2 animate-encrypt-glow">0%</div>
                <div className="text-sm text-muted-foreground">Origination Fees</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <VaultFooter />
    </div>
  );
};

export default Lending;