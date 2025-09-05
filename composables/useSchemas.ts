interface ContactPoint {
  '@type': 'ContactPoint'
  telephone: string
  contactType: string
  availableLanguage: string
}

interface Address {
  '@type': 'PostalAddress'
  streetAddress?: string
  addressLocality: string
  postalCode?: string
  addressRegion: string
  addressCountry: string
}

interface GeoCoordinates {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
}

interface Place {
  '@type': 'Place'
  name: string
  address: Address
  geo?: GeoCoordinates
}

interface Service {
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'LocalBusiness'
    name: string
  }
  areaServed: Place[]
  serviceType: string
}

export const useSchemas = () => {
  // Informations de base de l'entreprise
  const businessInfo = {
    name: 'MaxiVitre',
    telephone: '+33778818583',
    email: 'contact@maxivitre.fr',
    description: 'Spécialiste nettoyage extérieur pour commerces à Castelnau-le-Lez',
    foundingDate: '2024',
    url: 'https://maxivitre.fr'
  }

  // Adresse principale
  const mainAddress: Address = {
    '@type': 'PostalAddress',
    addressLocality: 'Castelnau-le-Lez',
    addressRegion: 'Hérault',
    addressCountry: 'FR'
  }

  // Coordonnées géographiques (Castelnau-le-Lez)
  const mainGeo: GeoCoordinates = {
    '@type': 'GeoCoordinates',
    latitude: 43.6318,
    longitude: 3.8606
  }

  // Contact point
  const contactPoint: ContactPoint = {
    '@type': 'ContactPoint',
    telephone: businessInfo.telephone,
    contactType: 'customer service',
    availableLanguage: 'French'
  }

  // Zones d'intervention
  const serviceAreas: Place[] = [
    {
      '@type': 'Place',
      name: 'Castelnau-le-Lez',
      address: { ...mainAddress, addressLocality: 'Castelnau-le-Lez' }
    },
    {
      '@type': 'Place',
      name: 'Le Crès',
      address: { ...mainAddress, addressLocality: 'Le Crès' }
    },
    {
      '@type': 'Place',
      name: 'Jacou',
      address: { ...mainAddress, addressLocality: 'Jacou' }
    },
    {
      '@type': 'Place',
      name: 'Clapiers',
      address: { ...mainAddress, addressLocality: 'Clapiers' }
    },
    {
      '@type': 'Place',
      name: 'Vendargues',
      address: { ...mainAddress, addressLocality: 'Vendargues' }
    },
    {
      '@type': 'Place',
      name: 'Baillargues',
      address: { ...mainAddress, addressLocality: 'Baillargues' }
    },
    {
      '@type': 'Place',
      name: 'Montpellier',
      address: { ...mainAddress, addressLocality: 'Montpellier' }
    }
  ]

  // Schema Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    foundingDate: businessInfo.foundingDate,
    address: mainAddress,
    contactPoint: contactPoint,
    sameAs: [
      'https://instagram.com/maxivitre',
      'https://facebook.com/maxivitre'
    ]
  }

  // Schema LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${businessInfo.url}/#localbusiness`,
    name: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    address: mainAddress,
    geo: mainGeo,
    contactPoint: contactPoint,
    areaServed: serviceAreas,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Bank transfer',
    openingHours: 'Mo-Sa 08:00-19:00',
    serviceArea: serviceAreas
  }

  // Services schemas
  const servicesSchemas: Service[] = [
    {
      '@type': 'Service',
      name: 'Nettoyage vitres commerces',
      description: 'Nettoyage professionnel des vitrines de commerces et bureaux',
      provider: {
        '@type': 'LocalBusiness',
        name: businessInfo.name
      },
      areaServed: serviceAreas,
      serviceType: 'Window Cleaning Service'
    },
    {
      '@type': 'Service',
      name: 'Nettoyage vitres agences',
      description: 'Entretien régulier des vitres pour agences immobilières et syndics',
      provider: {
        '@type': 'LocalBusiness',
        name: businessInfo.name
      },
      areaServed: serviceAreas,
      serviceType: 'Commercial Window Cleaning'
    },
    {
      '@type': 'Service',
      name: 'Nettoyage vitres particuliers',
      description: 'Service de nettoyage de vitres pour maisons et appartements',
      provider: {
        '@type': 'LocalBusiness',
        name: businessInfo.name
      },
      areaServed: serviceAreas,
      serviceType: 'Residential Window Cleaning'
    }
  ]

  return {
    organizationSchema,
    localBusinessSchema,
    servicesSchemas,
    businessInfo
  }
}