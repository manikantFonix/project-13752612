import { SelectionProvider } from '../../../components/consumer-catalog/SelectionProvider';

export default async function ConsumerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <SelectionProvider token={token}>{children}</SelectionProvider>
  );
}