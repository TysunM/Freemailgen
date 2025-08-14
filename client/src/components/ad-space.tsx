import { Card } from "@/components/ui/card";

interface AdSpaceProps {
  type: "banner-top" | "banner-bottom" | "sidebar-left-1" | "sidebar-left-2" | "sidebar-right-1" | "sidebar-right-2";
}

export default function AdSpace({ type }: AdSpaceProps) {
  const getBannerClasses = () => {
    if (type.includes("banner")) {
      return "w-full bg-[var(--dark-secondary)] border-b border-[var(--dark-tertiary)] px-2 sm:px-4 py-2";
    }
    return "";
  };

  const getAdClasses = () => {
    if (type.includes("banner")) {
      return "bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg h-16 sm:h-20 flex items-center justify-center text-gray-400 text-xs sm:text-sm border border-[var(--dark-tertiary)] mx-auto max-w-full";
    }
    return "bg-gradient-to-b from-gray-800 to-gray-700 rounded-lg h-64 flex items-center justify-center text-gray-400 text-sm border border-[var(--dark-tertiary)]";
  };

  const getAdContent = () => {
    if (type.includes("banner")) {
      return (
        <>
          <i className="fas fa-ad mr-2"></i>
          Advertisement Space (728x90)
        </>
      );
    }
    return (
      <div className="text-center">
        <i className="fas fa-ad text-2xl mb-2"></i>
        <div>Advertisement Space (300x250)</div>
      </div>
    );
  };

  if (type.includes("banner")) {
    return (
      <div className={getBannerClasses()}>
        <div className={getAdClasses()}>
          {getAdContent()}
        </div>
      </div>
    );
  }

  return (
    <Card className={getAdClasses()}>
      {getAdContent()}
    </Card>
  );
}
