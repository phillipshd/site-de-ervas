import { HoverButton } from "@/components/ui/hover-glow-button";
import { RippleButton } from "@/components/ui/ripple-button";

const DemoOne = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center p-12 bg-zinc-950 min-h-screen text-white">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Component Showcase</h1>
        <p className="text-zinc-400">Interactive buttons with glow and ripple effects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Hover Glow Button</h2>
          <HoverButton
            glowColor="#00ffc3"
            backgroundColor="#000"
            textColor="#ffffff"
            hoverTextColor="#67e8f9"
            className="shadow-lg"
          >
            Hover Me!
          </HoverButton>
        </div>

        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Ripple Button (Hover Variant)</h2>
          <RippleButton 
            variant="hover" 
            hoverBaseColor="#6996e2"
            className="text-white font-medium"
          >
            Ripple Hover
          </RippleButton>
        </div>

        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Ripple Button (Border Variant)</h2>
          <RippleButton 
            variant="hoverborder" 
            hoverBorderEffectColor="#00ffc3"
            className="text-white font-medium"
          >
            Border Effect
          </RippleButton>
        </div>

        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Ripple Button (Ghost)</h2>
          <RippleButton 
            variant="ghost" 
            rippleColor="rgba(255, 255, 255, 0.2)"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Ghost Ripple
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export { DemoOne };
