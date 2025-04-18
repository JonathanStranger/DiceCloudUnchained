// imports/@types/meteor-globals.d.ts
interface DDP {
    randomStream(seed: string): RandomStream;
  }
  
  interface RandomStream {
    fraction(): number;
    hexString(digits: number): string;
    id(): string;
    // Add other methods
  }
  