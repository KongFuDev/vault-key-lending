import Header from "@/components/Header";
import NFTGallery from "@/components/NFTGallery";
import VaultFooter from "@/components/VaultFooter";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <Header />
      <div className="pt-20">
        <NFTGallery />
      </div>
      <VaultFooter />
    </div>
  );
};

export default Gallery;