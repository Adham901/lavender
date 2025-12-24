import LoginForm from './_components/login-form';

import { useTranslations } from 'next-intl';

export default function Page() {
  // Translations
  const t = useTranslations();

  return (
    <main>
      <div>
        {/* Login Form */}
        <LoginForm />
      </div>
    </main>
  );
}
