import Header from "@/components/Header";
import VaultFooter from "@/components/VaultFooter";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Server, Key, FileText } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-6 animate-glow-pulse">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Military-Grade Privacy</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Your Privacy,
              </span>
              <br />
              <span className="bg-gradient-glow bg-clip-text text-transparent animate-glow-pulse">
                Our Priority
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              We believe financial privacy is a fundamental right. Our platform uses cutting-edge encryption 
              to ensure your NFT valuations, loan amounts, and personal data remain completely confidential.
            </p>
          </div>

          {/* Privacy Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8">
              <Lock className="w-12 h-12 text-primary mb-4 animate-encrypt-glow" />
              <h3 className="text-xl font-bold mb-3">End-to-End Encryption</h3>
              <p className="text-muted-foreground">
                All data is encrypted using AES-256 encryption before transmission and storage. 
                Only you have access to your private keys.
              </p>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8">
              <Eye className="w-12 h-12 text-accent mb-4 animate-glow-pulse" />
              <h3 className="text-xl font-bold mb-3">Zero-Knowledge Architecture</h3>
              <p className="text-muted-foreground">
                Our systems process your loan applications without ever seeing your actual NFT valuations 
                or personal financial information.
              </p>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8">
              <Server className="w-12 h-12 text-primary mb-4 animate-glow-pulse" />
              <h3 className="text-xl font-bold mb-3">Decentralized Storage</h3>
              <p className="text-muted-foreground">
                Your encrypted data is distributed across multiple secure nodes, ensuring no single point 
                of failure or unauthorized access.
              </p>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8">
              <Key className="w-12 h-12 text-accent mb-4 animate-encrypt-glow" />
              <h3 className="text-xl font-bold mb-3">Self-Custody Keys</h3>
              <p className="text-muted-foreground">
                You maintain complete control of your encryption keys. We cannot access your data 
                even if legally compelled to do so.
              </p>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8">
              <FileText className="w-12 h-12 text-primary mb-4 animate-glow-pulse" />
              <h3 className="text-xl font-bold mb-3">Minimal Data Collection</h3>
              <p className="text-muted-foreground">
                We collect only the absolute minimum data required for loan processing. 
                No tracking, no profiling, no data selling.
              </p>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-8">
              <Shield className="w-12 h-12 text-accent mb-4 animate-encrypt-glow" />
              <h3 className="text-xl font-bold mb-3">Regular Security Audits</h3>
              <p className="text-muted-foreground">
                Independent security firms regularly audit our systems to ensure the highest 
                standards of privacy and security are maintained.
              </p>
            </Card>
          </div>

          {/* Privacy Guarantees */}
          <div className="bg-card/20 backdrop-blur-sm border border-border/50 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-8">Our Privacy Guarantees</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-6xl font-bold text-primary mb-4 animate-glow-pulse">0</div>
                <div className="text-lg font-semibold mb-2">Data Breaches</div>
                <div className="text-sm text-muted-foreground">In our entire operating history</div>
              </div>
              <div>
                <div className="text-6xl font-bold text-accent mb-4 animate-glow-pulse">100%</div>
                <div className="text-lg font-semibold mb-2">Client Anonymity</div>
                <div className="text-sm text-muted-foreground">Your identity stays private</div>
              </div>
              <div>
                <div className="text-6xl font-bold text-primary mb-4 animate-encrypt-glow">24/7</div>
                <div className="text-lg font-semibold mb-2">Security Monitoring</div>
                <div className="text-sm text-muted-foreground">Continuous threat detection</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <VaultFooter />
    </div>
  );
};

export default Privacy;