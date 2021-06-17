// @ts-check
import React from 'react';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import notFound from '../images/not-found.png';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <Image src={notFound} fluid style={{ maxWidth: 400 }} />
      <p className="fs-1">
        {t('notFoundPage')}
      </p>
    </div>
  );
};

export default NotFoundPage;
