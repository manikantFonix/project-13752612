import { SelectionProvider } from '../../../components/consumer-catalog/SelectionProvider';

export default function ConsumerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { token: string };
}) {
  return (
    <SelectionProvider token={params.token}>{children}</SelectionProvider>
  );
}