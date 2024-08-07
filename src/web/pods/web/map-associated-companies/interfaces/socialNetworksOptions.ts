export interface SocialNetworksInterface {
  icon: string;
  code: string;
  social?: string;
  url?: string;
}

const socialNetworksOptions: Record<string, SocialNetworksInterface> = {
  defaultSocialMedia: {
    icon: '/assets/common/icons/social-various-icon.svg',
    code: 'DSM'
  },
  facebook: {
    icon: '/assets/common/icons/social-facebook-icon.svg',
    code: 'FAC'
  },
  twitter: {
    icon: '/assets/common/icons/social-x-icon.svg',
    code: 'TWI'
  },
  // youtube: {
  //   icon: VentajonIcons.target,
  //   code: 'YOU'
  // },
  instagram: {
    icon: '/assets/common/icons/social-instagram-icon.svg',
    code: 'INS'
  },
  // lin: {
  //   icon: VentajonIcons.target,
  //   code: 'LIN'
  // },
  // goo: {
  //   icon: VentajonIcons.target,
  //   code: 'GOO'
  // },
  // sna: {
  //   icon: VentajonIcons.target,
  //   code: 'SNA'
  // },
  // pin: {
  //   icon: VentajonIcons.target,
  //   code: 'PIN'
  // },
  // tri: {
  //   icon: VentajonIcons.target,
  //   code: 'TRI'
  // },
  // whatsapp: {
  //   icon: VentajonIcons.target,
  //   code: 'WHA'
  // }
};

export default socialNetworksOptions;