import { Button, ButtonText } from '@/components/ui/button';

export function ButtonExample() {
  return (
    <Button variant="outline" size="sm" action="positive" onPress={() => { console.log('Button pressed'); }}>
      <ButtonText>Click me twice</ButtonText>
    </Button>
  );
}
