import { Card } from "@/components/ui/card";

interface EncryptedNFTCardProps {
  imageUrl: string;
  title: string;
  loanAmount: string;
  encrypted?: boolean;
}

const EncryptedNFTCard = ({ imageUrl, title, loanAmount, encrypted = true }: EncryptedNFTCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-card border-nft-frame hover:shadow-encrypt transition-all duration-300 group animate-float">
      {/* Main Image */}
      <div className="aspect-square relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Encryption Overlay */}
        {encrypted && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-encrypt-glow/20 animate-encrypt-glow">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iIzAwRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPC9zdmc+')] opacity-60"></div>
          </div>
        )}

        {/* Encrypted Badge */}
        {encrypted && (
          <div className="absolute top-3 right-3 bg-encrypt-glow/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-encrypt-glow border border-encrypt-glow/30">
            🔒 Encrypted
          </div>
        )}

        {/* Glow Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-lg transition-colors duration-300"></div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold truncate">{title}</h3>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Loan Available
          </div>
          <div className="text-lg font-bold text-accent animate-glow-pulse">
            {encrypted ? "●●●●" : loanAmount}
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-gradient-glow h-2 rounded-full animate-glow-pulse" style={{ width: '75%' }}></div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {encrypted ? "Appraisal encrypted for privacy" : "Appraisal visible"}
        </p>
      </div>
    </Card>
  );
};

export default EncryptedNFTCard;