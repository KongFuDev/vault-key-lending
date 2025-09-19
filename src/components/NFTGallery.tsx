import EncryptedNFTCard from "./EncryptedNFTCard";
import nft1 from "@/assets/nft-1.jpg";
import nft2 from "@/assets/nft-2.jpg";
import nft3 from "@/assets/nft-3.jpg";
import nft4 from "@/assets/nft-4.jpg";
import nft5 from "@/assets/nft-5.jpg";
import nft6 from "@/assets/nft-6.jpg";

const NFTGallery = () => {
  const nftCollection = [
    {
      id: 1,
      imageUrl: nft1,
      title: "Encrypted Abstract #001",
      loanAmount: "15.5 ETH",
      encrypted: true
    },
    {
      id: 2,
      imageUrl: nft2,
      title: "Cyberpunk Landscape",
      loanAmount: "22.1 ETH",
      encrypted: true
    },
    {
      id: 3,
      imageUrl: nft3,
      title: "Golden Geometry",
      loanAmount: "18.7 ETH",
      encrypted: true
    },
    {
      id: 4,
      imageUrl: nft4,
      title: "Digital Portrait #047",
      loanAmount: "31.2 ETH",
      encrypted: true
    },
    {
      id: 5,
      imageUrl: nft5,
      title: "3D Sculpture Series",
      loanAmount: "12.8 ETH",
      encrypted: true
    },
    {
      id: 6,
      imageUrl: nft6,
      title: "Minimalist Composition",
      loanAmount: "24.3 ETH",
      encrypted: true
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-gradient-main relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/6 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/6 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-6 animate-glow-pulse">
            <span className="text-sm text-primary">🔒 Encrypted Gallery</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Your NFTs,
            </span>
            <br />
            <span className="bg-gradient-glow bg-clip-text text-transparent animate-glow-pulse">
              Privately Valued
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse your collection with encrypted appraisals. Only you can see the true lending potential 
            of your digital assets, protected by military-grade encryption.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {nftCollection.map((nft, index) => (
            <div 
              key={nft.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EncryptedNFTCard
                imageUrl={nft.imageUrl}
                title={nft.title}
                loanAmount={nft.loanAmount}
                encrypted={nft.encrypted}
              />
            </div>
          ))}
        </div>

        {/* Gallery Actions */}
        <div className="text-center mt-16">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="text-2xl font-bold text-accent mb-2 animate-glow-pulse">
                {nftCollection.length} NFTs
              </div>
              <div className="text-sm text-muted-foreground">
                Ready for Collateralization
              </div>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="text-2xl font-bold text-primary mb-2 animate-encrypt-glow">
                124.6 ETH
              </div>
              <div className="text-sm text-muted-foreground">
                Total Lending Capacity
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTGallery;