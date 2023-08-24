import { useLocale } from '../../hooks/useLocale'
import * as S from './styles'

export function Footer() {
  const { t } = useLocale()

  return (
    <S.Footer isMainPage={window.location.pathname === '/'}>
      <S.FooterContent>
        <S.TopFooter>
          <S.FooterLogo src="https://static.alirok.io/collections/logos/original-gradient.svg" />
          <S.RightContentFooter>
            <S.SocialMedia>
              <a
                href="https://www.instagram.com/alirok.com_corp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <S.Instagram src="https://static.alirok.io/collections/icons/f-instagram.svg" />
              </a>
              <a
                href="https://www.linkedin.com/company/alirok/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <S.Linkedin src="https://static.alirok.io/collections/icons/f-linkedin.svg" />
              </a>
              <a
                href="https://www.facebook.com/Alirokcom-109788471282095/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <S.Facebook src="https://static.alirok.io/collections/icons/f-facebook.svg" />
              </a>
            </S.SocialMedia>
            <S.Copyright>
              © 2022 Alirok |{' '}
              <a
                href={`${process.env.NEXT_PUBLIC_V1_URL}/acceptable-use-policy`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.footer.policies}
              </a>{' '}
              |{' '}
              <a
                href={`${process.env.NEXT_PUBLIC_V1_URL}/customer-agreement`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.footer.terms}
              </a>
            </S.Copyright>
          </S.RightContentFooter>
        </S.TopFooter>
        <S.CopyrightMobile>
          © 2022 Alirok |{' '}
          <a
            href={`${process.env.NEXT_PUBLIC_V1_URL}/acceptable-use-policy`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.policies}
          </a>{' '}
          |{' '}
          <a
            href={`${process.env.NEXT_PUBLIC_V1_URL}/customer-agreement`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.terms}
          </a>
        </S.CopyrightMobile>
      </S.FooterContent>
    </S.Footer>
  )
}
