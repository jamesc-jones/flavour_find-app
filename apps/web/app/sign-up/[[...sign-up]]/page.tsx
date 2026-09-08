import { SignUpClient } from '@/components/SignUpClient';

export async function generateStaticParams() {
  return [{ 'sign-up': [] }];
}

export default function SignUpPage() {
  return <SignUpClient />;
}
