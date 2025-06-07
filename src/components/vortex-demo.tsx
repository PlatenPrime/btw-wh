import { Vortex } from "@/components/ui/vortex";

export function VortexDemoSecond() {
  return (
    <div className="w-full mx-auto rounded-md h-full overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={210}
        className="flex items-center flex-col justify-center px-2   py-4 w-full h-full"
      >
        <h1 className=" text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        BTrade Warehouse App
      </h1>
      </Vortex>
    </div>
  );
}
